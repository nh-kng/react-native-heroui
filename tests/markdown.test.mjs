import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import ts from 'typescript';
import { Markdown } from '@nh-kng/react-native-heroui/markdown';
import { Markdown as MarkdownSubpath } from '../build/web/components/markdown/index.web.js';
import { isClosedMarkdownBlock, isNativeMarkdownUrl, markdownContext, safeMarkdownUrl, shouldOpenMarkdownLink } from '../build/web/components/markdown/markdown-policy.js';
import { resolveMarkdownReplacement } from '../build/web/components/markdown/markdown-renderers.js';
import { createMarkdownProcessor, parseMarkdownWeb } from '../build/web/primitives/web/components/markdown/parser.js';
import { createNativeMarkdownParser, parseMarkdownNative } from '../build/native/primitives/native/components/markdown/lib/parser.js';
import { nativeMarkdownRule } from '../build/native/primitives/native/components/markdown/lib/render-rules.js';
import { readMarkdownMap, verifyMarkdown, writeMarkdownReference } from '../scripts/markdown-upstream.mjs';
import { readMarkdownOwnedMap, verifyMarkdownOwned } from '../scripts/verify-markdown-owned.mjs';
import { verifyFile } from '../scripts/verify-upstream.mjs';

function flatten(nodes) {
  return nodes.flatMap((node) => [node, ...flatten(node.children ?? [])]);
}
function elements(document) {
  return flatten(document.tree.children).filter((node) => node.type === 'element');
}
function webContexts(source, streaming = false, processor) {
  return [...parseMarkdownWeb(source, streaming, processor).metadata.values()].map(({ context }) => context);
}

test('Markdown conditional subpath exposes the owned component without rendering', () => {
  assert.equal(Markdown, MarkdownSubpath);
});

test('web parsing preserves CommonMark and GFM structures', () => {
  const document = parseMarkdownWeb('# Title\n\n**bold** *em* ~~strike~~ `code`\n\n> quote\n\n3. three\n4. four\n\n- [x] done\n- [ ] todo\n\n| A | B |\n| - | - |\n| c | d |\n\n---\n\nhttps://example.com\n\n![alt](https://example.com/a.png)\n\na[^x]\n\n[^x]: footnote');
  const nodes = elements(document);
  for (const tag of ['h1', 'strong', 'em', 'del', 'code', 'blockquote', 'ol', 'input', 'table', 'th', 'td', 'hr', 'a', 'img', 'sup']) assert.ok(nodes.some(({ tagName }) => tagName === tag), tag);
  assert.equal(nodes.find(({ tagName }) => tagName === 'ol').properties.start, 3);
  assert.equal(nodes.find(({ tagName }) => tagName === 'input').properties.disabled, true);
});

test('raw HTML is literal by default and opt-in HTML is parsed then sanitized', () => {
  const html = '<div id="safe" class="arbitrary" onclick="evil()"><script>evil()</script><a href="javascript:evil()">x</a><img src="data:image/svg+xml,evil" onerror="evil()"><span style="color:red">ok</span></div>\n\n<a href="#safe">jump</a>';
  const literal = parseMarkdownWeb(html);
  assert.ok(flatten(literal.tree.children).some((node) => node.type === 'text' && node.value.includes('<div')));
  assert.ok(!elements(literal).some(({ tagName }) => tagName === 'div'));
  const nodes = elements(parseMarkdownWeb(html, false, createMarkdownProcessor(true)));
  assert.ok(nodes.some(({ tagName }) => tagName === 'div'));
  assert.ok(!nodes.some(({ tagName }) => tagName === 'script'));
  for (const node of nodes) {
    assert.ok(!Object.keys(node.properties).some((key) => /^on|^style$/.test(key)));
    assert.ok(!String(node.properties.href ?? '').startsWith('javascript:'));
    assert.ok(!String(node.properties.src ?? '').startsWith('data:'));
  }
  const target = nodes.find(({ tagName }) => tagName === 'div').properties.id;
  assert.notEqual(target, 'safe');
  assert.ok(nodes.some(({ properties }) => properties.href === `#${target}`));
  assert.equal((nodes.find(({ tagName }) => tagName === 'div').properties.className ?? []).length, 0);
});

test('sanitization preserves generated GFM associations and only required math classes', () => {
  const document = parseMarkdownWeb('a[^x]\n\n[^x]: footnote\n\n$$x$$\n\n$$\ny\n$$\n\n<code class="math-inline arbitrary language-js">code</code>', false, createMarkdownProcessor(true));
  const nodes = elements(document);
  const ids = new Set(nodes.map(({ properties }) => properties.id).filter(Boolean));
  for (const node of nodes) {
    if (typeof node.properties.href === 'string' && node.properties.href.startsWith('#')) assert.ok(ids.has(node.properties.href.slice(1)));
    for (const id of node.properties.ariaDescribedBy ?? []) assert.ok(ids.has(id));
  }
  const classes = nodes.flatMap(({ properties }) => properties.className ?? []);
  assert.ok(classes.includes('math-inline'));
  assert.ok(classes.includes('math-display'));
  assert.ok(!classes.includes('arbitrary'));
  assert.equal(nodes.filter((node) => document.elements.has(node) && node.tagName === 'pre').length, 1);
});

test('shared URL policy rejects unsafe schemes before link interception', () => {
  for (const url of ['https://example.com', 'http://example.com', 'mailto:a@example.com', '/relative', '#anchor', '?q=x', '//example.com/a']) assert.equal(safeMarkdownUrl(url), url);
  for (const url of ['javascript:evil()', 'data:text/html,x', 'file:///tmp/x', 'java\nscript:evil()', ' javascript:evil()', '\\evil.com']) assert.equal(safeMarkdownUrl(url), '');
  assert.equal(safeMarkdownUrl('mailto:x@y', true), '');
  assert.equal(isNativeMarkdownUrl('/relative'), false);
  assert.equal(isNativeMarkdownUrl('mailto:a@example.com'), true);
  assert.equal(isNativeMarkdownUrl('mailto:a@example.com', true), false);
  let calls = 0;
  assert.equal(shouldOpenMarkdownLink('javascript:evil()', () => { calls++; }), false);
  assert.equal(calls, 0);
  assert.equal(shouldOpenMarkdownLink('https://example.com', () => false), false);
  assert.equal(shouldOpenMarkdownLink('https://example.com', () => undefined), true);
  assert.equal(shouldOpenMarkdownLink('https://example.com', () => true), true);
});

test('native parsing preserves nested lists, numeric starts, tables and safe text flow', () => {
  const nodes = flatten(parseMarkdownNative('# Title\n\n**bold ![alt](https://example.com/a.png) tail** and [![link](https://example.com/b.png)](https://example.com)\n\n- one\n  - nested\n\n3. three\n4. four\n\n| A | B |\n| - | - |\n| c | d |\n\n~~strike~~\n\n---'));
  for (const type of ['heading1', 'strong', 'image', 'blocklink', 'bullet_list', 'ordered_list', 'table', 'th', 'td', 's', 'hr']) assert.ok(nodes.some((node) => node.type === type), type);
  assert.equal(nodes.find(({ type }) => type === 'ordered_list').attributes.start, '3');
  for (const node of nodes) {
    assert.notEqual(nativeMarkdownRule(node.type, node.block), 'unknown');
    if (nativeMarkdownRule(node.type, node.block) === 'text') assert.ok(node.children.every((child) => !child.block), node.type);
  }
  assert.ok(nodes.some(({ type, content }) => type === 'text' && content.includes(' tail')));
});

test('native preserves literal HTML/task markers, has no footnote semantics and rejects relative images', () => {
  const nodes = flatten(parseMarkdownNative('<b>literal</b>\n\n- [x] task\n\na[^x]\n\n[^x]: note\n\n![alt](/relative.png)'));
  assert.ok(nodes.some(({ content }) => content.includes('<b>literal</b>')));
  assert.ok(nodes.some(({ content }) => content.includes('[x] task')));
  assert.ok(!nodes.some(({ type }) => type.includes('footnote')));
  assert.ok(nodes.some(({ type, content }) => type === 'text' && content.includes('^x')));
  assert.equal(nodes.find(({ type }) => type === 'image').attributes.src, '');
  assert.equal(nodes.find(({ type }) => type === 'image').attributes.alt, 'alt');
});

test('math and code stay distinct; custom delimiters and currency remain literal', () => {
  const source = '$$x$$\n\n$$\ny^2\n$$\n\nPrice $5, $x$, \\(z\\) and `$$literal$$`\n\n```math\n$$code$$\n```';
  const contexts = webContexts(source);
  assert.deepEqual(contexts.filter((context) => 'mode' in context).map(({ source, mode }) => [source, mode]), [['x', 'inline'], ['y^2', 'display']]);
  const native = flatten(parseMarkdownNative(source));
  assert.deepEqual(native.filter(({ type }) => type.startsWith('math_')).map(({ type, content }) => [type, content]), [['math_inline', 'x'], ['math_block', 'y^2']]);
  assert.ok(native.some(({ type, content }) => type === 'code_inline' && content === '$$literal$$'));
  for (const input of ['$$ a  b $$', '$$  $$']) {
    const web = webContexts(input)[0].source;
    assert.equal(flatten(parseMarkdownNative(input)).find(({ type }) => type === 'math_inline').content, web);
  }
  assert.ok(!flatten(parseMarkdownNative('text $$$x$$$')).some(({ type }) => type === 'math_inline'));
});

test('streaming completion handles nested, duplicate and unterminated fences/math', () => {
  for (const prefix of ['', '> ', '- ']) {
    const continuation = prefix === '- ' ? '  ' : prefix;
    const source = `${prefix}\`\`\`js\n${continuation}a`;
    assert.equal(webContexts(source, true)[0].isComplete, false);
    assert.equal(flatten(parseMarkdownNative(source, true)).find(({ type }) => type === 'fence').isComplete, false);
    const closed = `${source}\n${continuation}\`\`\``;
    assert.equal(webContexts(closed, true)[0].isComplete, true);
    assert.equal(flatten(parseMarkdownNative(closed, true)).find(({ type }) => type === 'fence').isComplete, true);
  }
  assert.equal(webContexts('$$\nx', true)[0].isComplete, false);
  assert.equal(parseMarkdownNative('$$\nx', true)[0].isComplete, false);
  assert.equal(webContexts('```js\na', false)[0].isComplete, true);
  assert.equal(isClosedMarkdownBlock('~~~~js\na\n~~~', 'code'), false);
});

test('structural identities distinguish duplicates and survive append/edits while revisions change', () => {
  const source = '```mermaid\na\n```\n\n```mermaid\na\n```';
  const web = webContexts(source, true);
  assert.notEqual(web[0].id, web[1].id);
  const append = webContexts(`${source}\n\nparagraph`, true);
  assert.deepEqual(web.map(({ id }) => id), append.map(({ id }) => id));
  const edit = webContexts(source.replace('\na\n', '\nb\n'), true);
  assert.equal(web[0].id, edit[0].id);
  assert.notEqual(web[0].revision, edit[0].revision);
  const native = parseMarkdownNative(source, true);
  assert.notEqual(native[0].key, native[1].key);
  const changed = parseMarkdownNative(source.replace('\na\n', '\nb\n'), true);
  assert.equal(changed[0].key, native[0].key);
  assert.notEqual(changed[0].revision, native[0].revision);
  assert.deepEqual(parseMarkdownNative(`${source}\n\nafter`, true).slice(0, 2).map(({ key }) => key), native.map(({ key }) => key));
  const tables = '| A |\n| - |\n| x |';
  assert.notEqual(parseMarkdownNative(tables)[0].revision, parseMarkdownNative(tables.replace('x', 'y'))[0].revision);
  assert.equal(createNativeMarkdownParser().options.html, false);
});

test('renderer selection preserves contexts, fallback and intentional null; incomplete blocks skip engines', () => {
  const context = { ...markdownContext('a\n b', 'markdown/code:0', true), language: 'mermaid' };
  let received;
  const options = { renderCodeBlock: (value) => { received = value; return 'code'; } };
  assert.equal(resolveMarkdownReplacement(context, options), 'code');
  assert.equal(received, context);
  assert.equal(resolveMarkdownReplacement(context, { ...options, renderMermaid: () => null }), null);
  assert.equal(resolveMarkdownReplacement(context, { ...options, renderMermaid: () => 'diagram' }), 'diagram');
  assert.equal(resolveMarkdownReplacement({ ...context, isComplete: false }, { renderMermaid: () => { throw new Error('must defer'); } }), undefined);
  assert.equal(resolveMarkdownReplacement({ ...markdownContext('x', 'math:0', true), mode: 'inline' }, { renderMath: ({ mode, source }) => `${mode}:${source}` }), 'inline:x');
  assert.equal(resolveMarkdownReplacement(context, {}), undefined);
});

test('Markdown provenance rejects missing baselines, altered bytes and missing owned records', () => {
  const map = readMarkdownMap();
  const file = map.repositories[0].files[0];
  const contents = readFileSync(file.local);
  assert.throws(() => verifyFile(file, Buffer.concat([contents, Buffer.from('\n')]), file.upstreamBlob), /Modified upstream/);
  map.repositories[0].files.pop();
  assert.throws(() => verifyMarkdown(map), /Incomplete Markdown inventory/);
  const owned = readMarkdownOwnedMap();
  owned.files.pop();
  assert.throws(() => verifyMarkdownOwned(owned), /Unmapped Markdown owned file/);
  const untraceable = readMarkdownOwnedMap();
  const derived = untraceable.files.find(({ sources }) => sources.length);
  derived.sources = ['baselines/fabricated/source.ts'];
  assert.throws(() => verifyMarkdownOwned(untraceable), /Untraceable Markdown origin/);
});

test('the Markdown importer is reproducible and refuses changed reference bytes', () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'heroui-markdown-baseline-'));
  const file = path.relative(process.cwd(), path.join(directory, 'reference.js'));
  try {
    writeMarkdownReference(file, 'original');
    writeMarkdownReference(file, 'original');
    assert.throws(() => writeMarkdownReference(file, 'changed'), /Refusing to overwrite/);
    assert.equal(readFileSync(path.join(directory, 'reference.js'), 'utf8'), 'original');
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test('native Markdown runtime graph contains no web pipeline and package excludes reference trees', () => {
  function externals(entry, seen = new Set()) {
    if (seen.has(entry)) return new Set();
    seen.add(entry);
    const result = new Set();
    for (const { fileName } of ts.preProcessFile(readFileSync(entry, 'utf8')).importedFiles) {
      if (fileName.startsWith('.')) {
        for (const item of externals(path.resolve(path.dirname(entry), fileName), seen)) result.add(item);
      } else result.add(fileName);
    }
    return result;
  }
  const native = externals(path.resolve('build/native/components/markdown/index.native.js'));
  assert.ok(native.has('markdown-it'));
  assert.ok(native.has('react-native'));
  assert.ok(![...native].some((name) => /hast|mdast|unified|remark|rehype|react-dom/.test(name)));
  const web = externals(path.resolve('build/web/components/markdown/index.web.js'));
  assert.ok(!web.has('react-native'));
  assert.ok(!web.has('markdown-it'));
  const pkg = JSON.parse(readFileSync('package.json'));
  assert.ok(!pkg.files.some((file) => /^(upstream|baselines)(\/|$)/.test(file)));
  for (const name of ['react-markdown', 'react-native-markdown-display', 'remark-gfm', 'remark-math', 'rehype-raw', 'rehype-sanitize', 'react-native-fit-image']) assert.ok(!pkg.dependencies[name]);
});
