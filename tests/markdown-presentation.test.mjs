import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import test from 'node:test';
import { isValidElement } from 'react';

import { copyMarkdownCode } from '../build/web/components/markdown/markdown-copy.js';
import {
  markdownContext,
  isClosedMarkdownBlock,
} from '../build/web/components/markdown/markdown-policy.js';
import {
  markdownClass,
  markdownWebTheme,
} from '../build/web/components/markdown/markdown-presentation.js';
import { resolveMarkdownReplacement } from '../build/web/components/markdown/markdown-renderers.js';
import { parseMarkdownWeb } from '../build/web/primitives/web/components/markdown/parser.js';
import { parseMarkdownNative } from '../build/native/primitives/native/components/markdown/lib/parser.js';
import {
  markdownColumnWidths,
  markdownTableMeasurementKey,
} from '../build/native/primitives/native/components/markdown/lib/table-layout.js';

const flatten = (nodes) => nodes.flatMap((node) => [node, ...flatten(node.children ?? [])]);
const code = { ...markdownContext('  a\n\tb\n', 'code:0', true), language: 'ts' };

test('slot classes preserve owned selectors and consumer utility precedence', () => {
  assert.equal(
    markdownClass('codeBlock', { codeBlock: 'bg-surface p-2' }, 'p-4'),
    'markdown__code-block bg-surface p-4'
  );
  assert.equal(
    markdownClass('root', { root: 'max-w-xl p-2' }, 'max-w-full p-6'),
    'markdown__root max-w-full p-6'
  );
  assert.equal(markdownClass('quote'), 'markdown__quote');
});

test('copy service preserves exact source and awaits host completion before success', async () => {
  const calls = [];
  let complete;
  const result = copyMarkdownCode(
    code,
    {
      onCopyCode: (context) => {
        calls.push(context);
        return new Promise((resolve) => {
          complete = resolve;
        });
      },
      onCopySuccess: (context) => calls.push(['success', context]),
    },
    async () => {
      throw new Error('host service must override browser');
    }
  );
  assert.deepEqual(calls, [code]);
  complete();
  assert.equal(await result, true);
  assert.deepEqual(calls, [code, ['success', code]]);
  let source;
  assert.equal(
    await copyMarkdownCode(code, {}, async (value) => {
      source = value;
    }),
    true
  );
  assert.equal(source, '  a\n\tb\n');
});

test('copy failures, unavailable services and incomplete blocks do not report success', async () => {
  const error = new Error('denied');
  const errors = [];
  const options = {
    onCopyCode: () => {
      throw error;
    },
    onCopySuccess: () => assert.fail('unexpected success'),
    onCopyError: (...args) => errors.push(args),
  };
  assert.equal(await copyMarkdownCode(code, options), false);
  assert.deepEqual(errors, [[error, code]]);
  assert.equal(
    await copyMarkdownCode(code, {
      ...options,
      onCopyCode: async () => {
        throw error;
      },
    }),
    false
  );
  assert.equal(
    await copyMarkdownCode(
      { ...code, isComplete: false },
      { ...options, onCopyCode: () => assert.fail('incomplete copy') }
    ),
    false
  );
  assert.equal(await copyMarkdownCode(code, {}), false);
});

test('renderer presentation supplies semantic colors, slots and fallback precedence', () => {
  const theme = Object.fromEntries(
    Object.keys(markdownWebTheme).map((key) => [key, `resolved-${key}`])
  );
  let received;
  const options = {
    classNames: { math: 'text-accent', mermaid: 'p-3', codeBlock: 'p-2' },
    renderMath: (context, presentation) => {
      received = { context, presentation };
      return 'math';
    },
  };
  const math = { ...markdownContext('x', 'math:0', true), mode: 'inline' };
  assert.equal(resolveMarkdownReplacement(math, options, theme), 'math');
  assert.deepEqual(received, {
    context: math,
    presentation: { theme, className: 'markdown__math text-accent' },
  });
  const mermaid = { ...code, language: 'MERMAID' };
  assert.equal(
    resolveMarkdownReplacement(
      mermaid,
      {
        ...options,
        renderMermaid: (_, presentation) => {
          assert.equal(presentation.className, 'markdown__mermaid p-3');
          return undefined;
        },
        renderCodeBlock: (_, presentation) => presentation.className,
      },
      theme
    ),
    'markdown__code-block p-2'
  );
  assert.equal(
    resolveMarkdownReplacement(mermaid, {
      renderMermaid: () => null,
      renderCodeBlock: () => assert.fail('null is intentional'),
    }),
    null
  );
  assert.equal(
    resolveMarkdownReplacement(
      { ...math, isComplete: false },
      { renderMath: () => assert.fail('must defer') }
    ),
    undefined
  );
});

test('backslash math is parser-aware, preserves TeX and excludes escaped/currency/code text', () => {
  const source =
    String.raw`Inline \(x_1 + \alpha\) costs $5 and $x$.

\[
x^2 + y^2
\]

\[z^2\]

\\(literal\\)` +
    ' and `\\(code\\)`' +
    '\n\n```tex\n\\(fenced\\)\n```';
  const web = [...parseMarkdownWeb(source).metadata.values()]
    .filter(({ context }) => 'mode' in context)
    .map(({ context }) => [context.mode, context.source]);
  const native = flatten(parseMarkdownNative(source))
    .filter(({ type }) => type.startsWith('math_'))
    .map(({ type, content }) => [
      type === 'math_block' ? 'display' : 'inline',
      content.replace(/\n$/, ''),
    ]);
  const expected = [
    ['inline', String.raw`x_1 + \alpha`],
    ['display', 'x^2 + y^2'],
    ['display', 'z^2'],
  ];
  assert.deepEqual(web, expected);
  assert.deepEqual(native, expected);
  for (const input of ['\\(unfinished', '\\(first\nsecond\\)', '\\[\nx']) {
    assert.doesNotThrow(() => parseMarkdownWeb(input, true));
    assert.doesNotThrow(() => parseMarkdownNative(input, true));
  }
  assert.equal(isClosedMarkdownBlock('> \\[\n> x\n> \\]', 'math'), true);
  assert.equal(isClosedMarkdownBlock('- \\[\n  x', 'math'), false);
  assert.equal(parseMarkdownNative('\\[\nx', true)[0].isComplete, false);
});

test('native tasks preserve starts, nested states and loose paragraph structure', () => {
  const source =
    '3. [x] done\n4. [ ] next\n   - [X] nested\n\n- loose paragraph\n\n  another paragraph\n\nText [x] stays literal';
  const nodes = flatten(parseMarkdownNative(source));
  assert.equal(nodes.find(({ type }) => type === 'ordered_list').attributes.start, '3');
  assert.deepEqual(
    nodes
      .filter(({ attributes }) => attributes['data-task-checked'] !== undefined)
      .map(({ attributes }) => attributes['data-task-checked']),
    ['true', 'false', 'true']
  );
  assert.ok(nodes.some(({ content }) => content === 'Text [x] stays literal'));
  const loose = nodes.find(
    ({ type, children }) =>
      type === 'list_item' && flatten(children).some(({ content }) => content === 'loose paragraph')
  );
  assert.equal(loose.children.filter(({ type }) => type === 'paragraph').length, 2);
  const tight = flatten(parseMarkdownNative('- one\n- two')).filter(
    ({ type }) => type === 'list_item'
  );
  assert.ok(tight.every(({ children }) => children.every(({ type }) => type !== 'paragraph')));
});

test('table columns follow measured maxima, distribute spare width and cap long cells', () => {
  assert.deepEqual(
    markdownColumnWidths(
      [
        [90, 140],
        [100, 80],
      ],
      300
    ),
    [130, 170]
  );
  assert.deepEqual(markdownColumnWidths([[900, 80]], 200), [480, 80]);
  assert.deepEqual(markdownColumnWidths([[0, 0]], 100), [64, 64]);
  assert.deepEqual(markdownColumnWidths([], 300), []);
  const initial = markdownTableMeasurementKey('r1', 300, 1, 'font-a');
  for (const args of [
    ['r2', 300, 1, 'font-a'],
    ['r1', 400, 1, 'font-a'],
    ['r1', 300, 1.5, 'font-a'],
    ['r1', 300, 1, 'font-b'],
  ])
    assert.notEqual(markdownTableMeasurementKey(...args), initial);
});

// Inspect created elements without mounting React, React Native, or a renderer.
const boundaryModules = {
  'react-native': `export const Linking = { calls: [], openURL(url) { this.calls.push(url); return Promise.resolve(); } }; export const Text = 'Text', View = 'View', Pressable = 'Pressable', ScrollView = 'ScrollView'; export const Platform = { OS: 'ios' };`,
  'button.native.js': `export const Button = Object.assign(function Button(){}, { Label: 'Button.Label' });`,
  'typography.native.js': `export const Typography = { Heading: 'Typography.Heading', Paragraph: 'Typography.Paragraph' };`,
  'separator.native.js': `export const Separator = 'Separator';`,
  './image.js': `export const MarkdownImage = 'MarkdownImage';`,
  './table.js': `export const MarkdownTable = 'MarkdownTable';`,
};
const hooks = registerHooks({
  resolve(specifier, context, next) {
    const key = Object.keys(boundaryModules).find(
      (key) => specifier === key || specifier.endsWith('/' + key)
    );
    if (
      key &&
      (specifier === 'react-native' || context.parentURL?.endsWith('/markdown/lib/ast-renderer.js'))
    )
      return {
        url: 'data:text/javascript,' + encodeURIComponent(boundaryModules[key]),
        shortCircuit: true,
      };
    return next(specifier, context);
  },
});
const { renderMarkdownNative } =
  await import('../build/native/primitives/native/components/markdown/lib/ast-renderer.js');
hooks.deregister();
function elements(nodes) {
  return [nodes]
    .flat(Infinity)
    .flatMap((node) => (isValidElement(node) ? [node, ...elements(node.props.children)] : []));
}
test('native composition maps heading, inline typography, separators, tasks and links without mounting', () => {
  const options = {
    children: '',
    classNames: { heading: 'text-accent', inlineCode: 'bg-surface', taskMarker: 'text-success' },
    onLinkPress: () => false,
  };
  const tree = parseMarkdownNative(
    '# Title\n\nText **bold** and `code` [link](https://example.com)\n\n- [x] done\n\n---'
  );
  const output = elements(renderMarkdownNative(tree, options, markdownWebTheme));
  const heading = output.find(({ type }) => type === 'Typography.Heading');
  assert.equal(heading.props.type, 'h1');
  assert.equal(heading.props.className, 'markdown__heading text-accent');
  assert.ok(output.some(({ type }) => type === 'Typography.Paragraph'));
  assert.ok(output.some(({ type }) => type === 'Separator'));
  assert.ok(
    output.some(
      ({ props }) =>
        props.className === 'markdown__inline-code bg-surface' && props.children === 'code'
    )
  );
  assert.deepEqual(
    output.find(({ props }) => props.accessibilityRole === 'checkbox').props.accessibilityState,
    { checked: true, disabled: true }
  );
  const link = output.find(({ props }) => props.accessibilityRole === 'link');
  assert.equal(link.props.className, 'markdown__link');
  assert.doesNotThrow(() => link.props.onPress());
  assert.ok(
    output
      .filter(({ type }) => type === 'Text')
      .every(({ props }) => !elements(props.children).some(({ type }) => type === 'View'))
  );
});

test('escaped math closing delimiters stay inside source on both platforms', () => {
  for (const [source, expected] of [
    [String.raw`\[a \\] b\]`, String.raw`a \\] b`],
    [String.raw`\(a \\) b\)`, String.raw`a \\) b`],
  ]) {
    const web = [...parseMarkdownWeb(source).metadata.values()].find(
      ({ kind }) => kind === 'math'
    ).context;
    const native = flatten(parseMarkdownNative(source)).find(({ type }) =>
      type.startsWith('math_')
    );
    assert.equal(web.source, expected);
    assert.equal(native.content, expected);
  }
});

test('duplicate streaming block identities remain structural around edits and insertions', () => {
  const fence = '```mermaid\ngraph LR; A-->B\n```';
  const original = `${fence}\n\n${fence}`;
  const metadata = (source) =>
    [...parseMarkdownWeb(source, true).metadata.values()].map(({ context }) => context);
  const before = metadata(original);
  const middleEdit = metadata(original.replace('A-->B', 'A-->C'));
  assert.deepEqual(
    middleEdit.map(({ id }) => id),
    before.map(({ id }) => id)
  );
  assert.notEqual(middleEdit[0].revision, before[0].revision);
  assert.equal(middleEdit[1].revision, before[1].revision);
  for (const source of [
    `intro\n\n${original}`,
    `${fence}\n\ntext\n\n${fence}`,
    `${original}\n\nafter`,
  ]) {
    assert.deepEqual(
      metadata(source).map(({ id }) => id),
      before.map(({ id }) => id)
    );
  }
  const inserted = metadata(`${fence}\n\n${original}`);
  assert.equal(new Set(inserted.map(({ id }) => id)).size, 3);
  assert.notEqual(
    inserted[2].id,
    before[1].id,
    'A preceding same-type insertion may reassign later identities'
  );
});

test('native text split around block images retains body typography and emphasis', () => {
  const output = elements(
    renderMarkdownNative(
      parseMarkdownNative('**before ![alt](https://example.com/a.png) after**'),
      { children: '' },
      markdownWebTheme
    )
  );
  const after = output.find(
    ({ type, props }) =>
      type === 'Typography.Paragraph' &&
      elements(props.children).some(({ props }) => props.children === ' after')
  );
  assert.ok(after, 'Text after a block image receives a body typography container');
  assert.equal(after.props.nativeProps.style.fontWeight, 'bold');
  assert.ok(
    output
      .filter(({ type }) => type === 'Text')
      .every(
        ({ props }) =>
          !elements(props.children).some(({ type }) => type === 'MarkdownImage' || type === 'View')
      )
  );
});
