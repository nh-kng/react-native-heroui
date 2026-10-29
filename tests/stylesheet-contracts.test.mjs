import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { after, before, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
let directory;
let css;

before(() => {
  directory = mkdtempSync(path.join(tmpdir(), 'heroui-styles-'));
  const output = path.join(directory, 'compiled.css');
  execFileSync(path.join(root, 'node_modules/.bin/tailwindcss'), [
    '-i', path.join(root, 'styles/web.css'), '-o', output, '--optimize', '--silent',
  ], { cwd: root });
  css = readFileSync(output, 'utf8');
});

after(() => {
  if (directory) rmSync(directory, { recursive: true, force: true });
});

test('the compiled stylesheet uses the default blue accent without purple brand overrides', () => {
  const accents = [...css.matchAll(/--accent:\s*([^;]+);/g)].map((match) => match[1]);
  assert.ok(accents.length >= 1);
  for (const accent of accents) {
    assert.match(accent, /^oklch\((?:0\.6204|62\.04%)\s+0?\.195\s+253\.83\)$/);
  }
});

test('web variant generators retain the pinned React classes and utilities', () => {
  const map = JSON.parse(readFileSync(path.join(root, 'docs/upstream/owned-source-map.json'), 'utf8'));
  for (const entry of map.files.filter(({local}) => local.startsWith('src/styles/web/components/') && local.endsWith('.styles.ts'))) {
    const body = readFileSync(path.join(root, entry.local), 'utf8').replace(/^\/\*[\s\S]*?\*\//, '').replace(/\s/g, '');
    const upstream = readFileSync(path.join(root, entry.baseline), 'utf8').replace(/\s/g, '');
    assert.equal(body, upstream, entry.local);
  }
});

test('published React CSS includes every pinned component and support stylesheet unchanged', () => {
  const map = JSON.parse(readFileSync(path.join(root, 'docs/upstream/owned-source-map.json'), 'utf8'));
  const entries = map.files.filter(({local}) => local.startsWith('styles/react/') && !['styles/react/motion.css', 'styles/react/index.css'].includes(local));
  const files = (directory) => readdirSync(directory, {withFileTypes:true}).flatMap((entry) => entry.isDirectory() ? files(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
  const baseline = path.join(root, 'baselines/heroui-react/packages/styles');
  const expected = ['base', 'components', 'themes', 'utilities', 'variants'].flatMap((directory) => files(path.join(baseline, directory))).filter((file) => file.endsWith('.css')).map((file) => path.relative(root, file));
  assert.deepEqual(entries.map(({baseline}) => baseline).sort(), expected.sort());
  for (const entry of entries) assert.equal(readFileSync(path.join(root, entry.local), 'utf8'), readFileSync(path.join(root, entry.baseline), 'utf8'), entry.local);
});

test('compiled button feedback includes upstream sizing, variants, state and motion rules', () => {
  for (const selector of ['.button', '.button--sm', '.button--lg', '.button--danger', '.button--danger-soft', '.button--icon-only', '.button--full-width']) assert.ok(css.includes(selector), selector);
  assert.ok(css.includes('[data-pressed="true"]'));
  assert.ok(css.includes('[data-hovered="true"]'));
  for (const scale of ['.97', '.98', '.96']) assert.ok(css.includes('transform: scale(' + scale + ')'));
  assert.ok(css.includes('[data-reduce-motion="true"]'));
  assert.ok(css.includes('(prefers-reduced-motion: reduce)'));
});

test('feedback CSS keeps scaling and ripple expansion behind reduced-motion preferences', () => {
  assert.match(css, /\.pressable-feedback__web-root\[data-scale="true"\]\[data-pressed="true"\]:not\(\[data-disabled\]\)/);
  assert.match(css, /@media \(prefers-reduced-motion: no-preference\)\s*\{\s*\.pressable-feedback__web-scale\[data-active="true"\]\s*\{\s*transform: scale\(\.985\)/);
  assert.ok(/@media \(prefers-reduced-motion: no-preference\)\s*\{\s*\.pressable-feedback__web-ripple\[data-active="true"\]\s*\{\s*animation: [^;]*pressable-feedback-ripple/.test(css), "Ripple expansion respects reduced motion");
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)\s*\{\s*\.pressable-feedback__web-root[^{}]+\{\s*transition: none/);
});

test('feedback overlays are decorative and feedback roots expose a visible keyboard focus style', () => {
  assert.match(css, /\.pressable-feedback__web-highlight,\s*\.pressable-feedback__web-ripple\s*\{\s*pointer-events: none/);
  assert.match(css, /\.pressable-feedback__web-root\[data-focus-visible\]\s*\{\s*outline: 2px solid var\(--focus\)/);
  assert.ok(/\.pressable-feedback__web-ripple\[data-active="true"\]\s*\{\s*opacity: \.1/.test(css), 'Active ripple overlays are visible');
  assert.ok(/\.pressable-feedback__web-highlight\[data-active="true"\]\s*\{\s*background-color: var\(--color-default\)/.test(css), 'Press uses the ghost Button background');
});

test('feedback hover uses the ghost Button color only on enabled highlight overlays with hover-capable pointers', () => {
  const rule = css.match(/@media \(hover: hover\)\s*\{\s*(\.pressable-feedback__web-root[^{}]+)\{([^{}]+)\}/);
  assert.ok(rule, 'Highlight hover rule is scoped to hover-capable pointers');
  assert.equal(rule[1].trim(), '.pressable-feedback__web-root:not(:disabled):not([aria-disabled="true"]):not([data-disabled]) .pressable-feedback__web-highlight[data-hovered="true"]');
  assert.ok(rule[2].includes('background-color: var(--color-default)'), 'Hover matches the ghost Button token');
  const overlay = css.match(/\.pressable-feedback__web-highlight,\s*\.pressable-feedback__web-ripple\s*\{([^{}]+)\}/);
  assert.ok(overlay?.[1].includes('z-index: -1'), 'Opaque feedback stays behind content');
  const rootRule = css.match(/\.pressable-feedback__web-root\s*\{([^{}]+)\}/);
  assert.ok(rootRule?.[1].includes('isolation: isolate'), 'Feedback stays above the root background');
  assert.ok(!css.includes('.pressable-feedback__web-scale[data-hovered'), 'Scale remains press-only');
  assert.ok(!css.includes('.pressable-feedback__web-ripple[data-hovered'), 'Ripple remains press-only');
});

test('highlight enters and exits through the ghost Button background transition without a foreground flash', () => {
  const rule = css.match(/\.pressable-feedback__web-highlight\s*\{([^{}]+)\}/);
  assert.ok(rule, 'Highlight has a base style');
  assert.ok(/background-color: (?:transparent|#0000)/.test(rule[1]), 'Resting background is transparent');
  assert.ok(rule[1].includes('opacity: 1'), 'Highlight stays at constant opacity');
  assert.ok(/transition: background-color (?:\.1s|100ms) ease-out/.test(rule[1]), 'Background transitions with ghost Button timing');
  assert.ok(!rule[1].includes('var(--foreground)'), 'Hover exit cannot switch to foreground color');
  assert.ok(!rule[1].includes('transition: opacity'), 'Hover exit does not fade an opaque foreground layer');
});

test('web component selectors match the upstream slots rather than native approximations', () => {
  for (const selector of ['.surface--secondary', '.avatar--sm', '.alert', '.input-otp__slot', '.slider__thumb', '.checkbox__control', '.switch__control', '.tabs__tab', '.select__popover', '.toast__title']) assert.ok(css.includes(selector), selector);
  for (const selector of ['.switch-field', '.checkbox-field', '.tabs__trigger', '.toast__root', '.slider__thumb-knob']) assert.ok(!css.includes(selector), selector);
});

test('compiled motion retains accordion expansion, tabs movement, overlay entry and exit, and distinct skeleton animations', () => {
  assert.match(css, /height (?:\.2s|200ms) var\(--ease-out-quad\)/);
  assert.ok(css.includes('height: var(--disclosure-panel-height)'));
  assert.ok(css.includes('transition-property: translate, width, height'));
  for (const selector of ['.popover[data-entering="true"]', '.popover[data-exiting="true"]', '.select__popover[data-entering="true"]', '.select__popover[data-exiting="true"]']) assert.ok(css.includes(selector), selector);
  for (const keyframes of ['enter', 'exit', 'skeleton', 'caret-blink', 'spin']) assert.ok(css.includes('@keyframes ' + keyframes), keyframes);
  assert.match(css, /animation: (?:2s linear infinite skeleton|skeleton 2s linear infinite)/);
  assert.ok(css.includes('animation: var(--animate-pulse)'));
  assert.ok(!css.includes('heroui-shared-pulse'));
  assert.ok(css.includes('margin .3s var(--ease-out-fluid)'));
  assert.ok(css.includes('transform var(--toast-translate-duration) var(--toast-ease)'));
});

test('both web and shared Expo entries compile the React rules, with native components gated', () => {
  const output = path.join(directory, 'shared.css');
  execFileSync(path.join(root, 'node_modules/.bin/tailwindcss'), ['-i', path.join(root, 'styles/index.css'), '-o', output, '--optimize', '--silent'], {cwd:root});
  const shared = readFileSync(output, 'utf8');
  assert.ok(shared.includes('@supports selector(div > div)'));
  assert.ok(shared.includes('@media native'));
  for (const marker of ['.switch__control', '.tabs__tab', '.popover[data-entering="true"]', '@keyframes skeleton', '@keyframes enter']) assert.ok(shared.includes(marker), marker);
  assert.ok(!css.includes('.switch__root'), 'Standalone web CSS excludes Native component rules');
  for (const token of ['--field-hover', '--accent-hover', '--accent-soft-foreground']) assert.ok(shared.includes('var(' + token + ','), 'Shared utilities prefer React theme token: ' + token);
  assert.match(shared, /\.toast--accent \.toast__indicator\s*\{\s*color: var\(--accent-soft-foreground/);
});

test('accent toast icons use the same semantic color as their titles', () => {
  for (const slot of ['title', 'indicator']) assert.match(css, new RegExp('\\.toast--accent \\.toast__' + slot + '\\s*\\{\\s*color: var\\(--accent-soft-foreground\\)'));
});

test('web checkbox retains background scaling and SVG drawing transitions', () => {
  assert.ok(css.includes('.checkbox__control:before'));
  assert.match(css, /transition: stroke-dashoffset (?:\.15s|150ms) linear (?:\.015s|15ms)/);
  assert.ok(css.includes('[data-slot="checkbox-default-indicator--checkmark"]'));
  assert.ok(!css.includes('.checkbox__indicator:not([data-selected])'));
});

test('web browser controls and package scrollbars follow the active theme', () => {
  assert.match(css, /:root\.dark\s*\{\s*color-scheme: dark/);
  assert.match(css, /:root\.light\s*\{\s*color-scheme: light/);
  assert.match(css, /\.heroui-scrollbar,\s*\.scroll-shadow\s*\{[^}]*scrollbar-width: thin;[^}]*scrollbar-color: var\(--color-muted\) transparent/);
});
