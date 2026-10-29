import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { registerHooks } from 'node:module';
import test from 'node:test';
import { isValidElement } from 'react';
import { Callout } from '@nh-kng/react-native-heroui/markdown';
import { calloutIcons } from '../build/web/components/markdown/callout-icons.js';
import { calloutLabels } from '../build/web/components/markdown/callout.types.js';
import { markdownWebTheme } from '../build/web/components/markdown/markdown-presentation.js';
import {
  parseMarkdownWeb,
  createMarkdownProcessor,
} from '../build/web/primitives/web/components/markdown/parser.js';
import { parseMarkdownNative } from '../build/native/primitives/native/components/markdown/lib/parser.js';
import { nativeMarkdownRule } from '../build/native/primitives/native/components/markdown/lib/render-rules.js';
import { calloutTypes, richCallout, ordinaryQuotes } from './helpers/markdown-callout-cases.mjs';

const flatten = (nodes) => nodes.flatMap((node) => [node, ...flatten(node.children ?? [])]);
const webCallouts = (document) =>
  flatten(document.tree.children).filter((node) => document.callouts.has(node));
const nativeCallouts = (source) =>
  flatten(parseMarkdownNative(source)).filter((node) => node.type === 'callout');
const webText = (node) =>
  node.type === 'text' ? node.value : (node.children ?? []).map(webText).join('');
const nativeText = (node) =>
  node.type === 'text' || node.type === 'code_inline'
    ? node.content
    : (node.children ?? []).map(nativeText).join('');

test('the Markdown conditional subpath exposes Callout without mounting', () => {
  assert.equal(typeof Callout, 'function');
});

for (const type of calloutTypes) {
  for (const title of [undefined, 'Custom **plain** title']) {
    test(`${type} callout preserves ${title ? 'a custom' : 'the default'} title on both parsers`, () => {
      const source = `> [!${type.toUpperCase()}]${title ? ` ${title}` : ''}\n> First line\n> second **line**.\n>\n> Another paragraph.`;
      const web = parseMarkdownWeb(source);
      const webNode = webCallouts(web)[0];
      const native = nativeCallouts(source)[0];
      const expected = { type, ...(title ? { title } : {}) };
      assert.deepEqual(web.callouts.get(webNode), expected);
      assert.deepEqual(native.callout, expected);
      assert.equal(nativeMarkdownRule(native.type), 'block');
      assert.equal(webNode.children.filter((node) => node.tagName === 'p').length, 2);
      assert.equal(native.children.filter((node) => node.type === 'paragraph').length, 2);
      assert.ok(webText(webNode).includes('First line\nsecond line.'));
      assert.ok(nativeText(native).includes('First linesecond line.'));
      assert.ok(!webText(webNode).includes('[!'));
      assert.ok(!nativeText(native).includes('[!'));
    });
  }
}

test('rich bodies preserve blocks, inline formatting, links, and code metadata', () => {
  const web = parseMarkdownWeb(richCallout, true);
  const webNode = webCallouts(web)[0];
  const native = nativeCallouts(richCallout)[0];
  const webNodes = flatten(webNode.children);
  const nativeNodes = flatten(native.children);
  for (const tag of ['p', 'strong', 'em', 'a', 'ul', 'li', 'pre', 'code'])
    assert.ok(
      webNodes.some((node) => node.tagName === tag),
      tag
    );
  for (const type of [
    'paragraph',
    'strong',
    'em',
    'link',
    'bullet_list',
    'list_item',
    'fence',
    'code_inline',
  ])
    assert.ok(
      nativeNodes.some((node) => node.type === type),
      type
    );
  const code = [...web.metadata.values()].find((info) => info.kind === 'code').context;
  assert.equal(code.source, "const token = 'secret';");
  assert.equal(code.language, 'ts');
  assert.equal(code.isComplete, true);
  const nativeCode = nativeNodes.find((node) => node.type === 'fence');
  assert.equal(nativeCode.content.trimEnd(), code.source);
  assert.equal(nativeCode.isComplete, true);
  assert.equal(nativeCode.sourceInfo, code.language);
});

for (const source of ordinaryQuotes) {
  test(`ordinary blockquote remains unchanged: ${JSON.stringify(source)}`, () => {
    const web = parseMarkdownWeb(source);
    assert.equal(webCallouts(web).length, 0);
    assert.ok(flatten(web.tree.children).some((node) => node.tagName === 'blockquote'));
    assert.equal(nativeCallouts(source).length, 0);
    assert.equal(parseMarkdownNative(source)[0].type, 'blockquote');
  });
}

test('nested, consecutive, empty, and CRLF callouts retain their boundaries', () => {
  for (const source of ['> [!NOTE]', '> [!NOTE]\n>', '> [!NOTE]\r\n>']) {
    const web = parseMarkdownWeb(source);
    assert.equal(webCallouts(web)[0].children.length, 0);
    assert.equal(nativeCallouts(source)[0].children.length, 0);
  }
  const consecutive = '> [!NOTE]\n> One\n\n> [!TIP]\n> Two';
  assert.equal(webCallouts(parseMarkdownWeb(consecutive)).length, 2);
  assert.equal(nativeCallouts(consecutive).length, 2);
  const joined = '> [!NOTE]\n> One\n> [!TIP]\n> Two';
  assert.equal(webCallouts(parseMarkdownWeb(joined)).length, 1);
  assert.equal(nativeCallouts(joined).length, 1);
  for (const source of [
    '> [!NOTE]\n> Outer\n>\n> > [!TIP]\n> > Inner',
    '- Item\n\n  > [!TIP]\n  > Inner',
    '> Ordinary quote\n>\n> > [!TIP]\n> > Inner',
  ]) {
    const expected = source.startsWith('> [!NOTE]') ? 2 : 1;
    assert.equal(webCallouts(parseMarkdownWeb(source)).length, expected);
    assert.equal(nativeCallouts(source).length, expected);
  }
  const source = '> [!NOTE] Authentication\r\n> First\r\n>\r\n> Second';
  const document = parseMarkdownWeb(source);
  assert.equal(document.callouts.get(webCallouts(document)[0]).title, 'Authentication');
  assert.equal(nativeCallouts(source)[0].callout.title, 'Authentication');
});

test('sanitization preserves generated callouts but HTML attributes cannot forge them', () => {
  const source = `${richCallout}\n\n<div data-callout="note" class="markdown__callout" onclick="evil()">HTML</div>`;
  const document = parseMarkdownWeb(source, false, createMarkdownProcessor(true));
  assert.equal(webCallouts(document).length, 1);
  assert.equal(document.callouts.get(webCallouts(document)[0]).title, 'Authentication');
  const raw = flatten(document.tree.children).find(
    (node) => node.tagName === 'div' && webText(node) === 'HTML'
  );
  assert.ok(raw);
  assert.ok(!document.callouts.has(raw));
  assert.ok(!Object.hasOwn(raw.properties, 'onClick'));
});

// Inspect React element composition without mounting either platform.
const boundaries = {
  'alert.native.js': `export const Alert = Object.assign(function Alert(){}, { Content: 'Alert.Content', Indicator: 'Alert.Indicator', Title: 'Alert.Title' });`,
  'alert.web.js': `export const Alert = Object.assign(function Alert(){}, { Content: 'Alert.Content', Indicator: 'Alert.Indicator', Title: 'Alert.Title' });`,
  'button.native.js': `export const Button = Object.assign(function Button(){}, { Label: 'Button.Label' });`,
  'typography.native.js': `export const Typography = { Heading: 'Typography.Heading', Paragraph: 'Typography.Paragraph' };`,
  'separator.native.js': `export const Separator = 'Separator';`,
  './image.js': `export const MarkdownImage = 'MarkdownImage';`,
  './table.js': `export const MarkdownTable = 'MarkdownTable';`,
};
const hooks = registerHooks({
  resolve(specifier, context, next) {
    const presentation = /\/callout\.(native|web)\.js(?:\?|$)/.test(context.parentURL ?? '');
    let code;
    if (presentation && specifier === 'react')
      code = `export const useId = () => 'test-callout'; export const Children = { toArray: (value) => [value].flat(Infinity).filter(x => x !== null && x !== undefined && typeof x !== 'boolean') };`;
    else if (specifier === 'react-native')
      code = `export const View = 'View', Text = 'Text', ScrollView = 'ScrollView', Pressable = 'Pressable'; export const Platform = { OS: 'ios' }; export const Linking = { openURL: async () => {} };`;
    else if (presentation && specifier === 'react-native-svg')
      code = `export default 'Svg'; export const Path = 'Path';`;
    else if (presentation && specifier === 'uniwind')
      code = `export const useCSSVariable = (name) => name;`;
    else {
      const key = Object.keys(boundaries).find(
        (key) => specifier === key || specifier.endsWith('/' + key)
      );
      if (key && (presentation || context.parentURL?.endsWith('/markdown/lib/ast-renderer.js')))
        code = boundaries[key];
    }
    return code
      ? { url: 'data:text/javascript,' + encodeURIComponent(code), shortCircuit: true }
      : next(specifier, context);
  },
});
const { MarkdownCallout: NativeCallout } =
  await import('../build/native/components/markdown/callout.native.js');
// A query keeps this module separate from the root export's cached dependency.
const { MarkdownCallout: WebCallout } =
  await import('../build/web/components/markdown/callout.web.js?composition');
const { renderMarkdownNative } =
  await import('../build/native/primitives/native/components/markdown/lib/ast-renderer.js');
hooks.deregister();
const elements = (nodes) =>
  [nodes]
    .flat(Infinity)
    .flatMap((node) => (isValidElement(node) ? [node, ...elements(node.props.children)] : []));

for (const [platform, Present] of [
  ['native', NativeCallout],
  ['web', WebCallout],
]) {
  test(`${platform} presentation composes Alert, decorative Lucide icons, title, and a block body`, () => {
    for (const type of calloutTypes) {
      const output = Present({
        type,
        children: 'Body',
        classNames: { calloutTitle: 'text-lg', calloutBody: 'mt-4' },
      });
      const nodes = elements(output);
      assert.equal(output.props[platform === 'web' ? 'webProps' : 'nativeProps'].role, 'group');
      assert.equal(
        nodes.find((node) => node.type === 'Alert.Title').props.children,
        calloutLabels[type]
      );
      const body = nodes.find((node) => node.props.className === 'markdown__callout-body mt-4');
      assert.ok(body);
      assert.equal(body.type, platform === 'web' ? 'div' : 'View');
      const paths = nodes.filter((node) => node.type === (platform === 'web' ? 'path' : 'Path'));
      assert.deepEqual(
        paths.map((node) => node.props.d),
        [...calloutIcons[type]]
      );
      assert.ok(!nodes.some((node) => node.type === 'Alert.Description'));
    }
    const custom = elements(Present({ type: 'note', title: '**Plain** title', children: null }));
    assert.equal(
      custom.find((node) => node.type === 'Alert.Title').props.children,
      '**Plain** title'
    );
    assert.ok(!custom.some((node) => node.props.className === 'markdown__callout-body'));
  });
}

test('native renders callouts with ordinary block children and existing code replacements', () => {
  let code;
  const output = elements(
    renderMarkdownNative(
      parseMarkdownNative(richCallout),
      {
        children: richCallout,
        renderCodeBlock: (context) => {
          code = context;
          return 'replacement';
        },
      },
      markdownWebTheme
    )
  );
  assert.ok(output.some((node) => node.type === NativeCallout));
  assert.equal(code.source, "const token = 'secret';");
  assert.equal(code.language, 'ts');
  assert.ok(output.some((node) => node.type === 'Typography.Paragraph'));
  assert.ok(
    output
      .filter((node) => node.type === 'Text')
      .every(
        (node) =>
          !elements(node.props.children).some(
            (child) => child.type === 'View' || child.type === NativeCallout
          )
      )
  );
});

test('callout themes wire both light and dark palettes and both stylesheet entrypoints', () => {
  const shared = readFileSync(new URL('../styles/shared/variables.css', import.meta.url), 'utf8');
  const web = readFileSync(
    new URL('../styles/web-only.css', import.meta.url),
    'utf8'
  );
  for (const kind of ['note', 'important']) {
    assert.equal(shared.match(new RegExp(`--callout-${kind}:`, 'g')).length, 2);
    assert.equal(web.match(new RegExp(`--callout-${kind}:`, 'g')).length, 2);
    for (const path of ['styles/shared/theme.css', 'styles/web-only.css']) {
      const css = readFileSync(new URL('../' + path, import.meta.url), 'utf8');
      assert.ok(css.includes(`--color-callout-${kind}-foreground:`));
      assert.ok(css.includes(`--color-callout-${kind}-soft:`));
    }
  }
});

test('removing the marker line preserves body syntax and original code offsets', () => {
  for (const [source, expected] of [
    ['> [!NOTE] `Title\n> body`', 'body`'],
    ['> [!NOTE] **Title\n> body**', 'body**'],
  ]) {
    const document = parseMarkdownWeb(source);
    assert.equal(webText(webCallouts(document)[0]).trim(), expected);
    assert.equal(nativeText(nativeCallouts(source)[0]).trim(), expected);
  }
  for (const source of ['> [!NOTE]\n> ---', '> [!NOTE]\n> ===', '> [!NOTE] Custom |\n> --- |']) {
    assert.equal(webCallouts(parseMarkdownWeb(source)).length, 1);
    assert.equal(nativeCallouts(source).length, 1);
  }
  const document = parseMarkdownWeb(richCallout);
  const code = flatten(document.tree.children).find((node) => node.tagName === 'pre');
  assert.equal(
    richCallout.slice(code.position.start.offset, code.position.start.offset + 3),
    '```'
  );
});

test('lazy paragraph continuations remain inside their callout', () => {
  for (const source of [
    '> [!NOTE]\nLazy **body**',
    '> [!TIP] Title\nLazy body\nnext line',
    '> Outer\n>\n> > [!NOTE]\nLazy body',
  ]) {
    const document = parseMarkdownWeb(source);
    assert.ok(webText(webCallouts(document)[0]).includes('Lazy body'));
    assert.ok(nativeText(nativeCallouts(source)[0]).includes('Lazy body'));
  }
});
