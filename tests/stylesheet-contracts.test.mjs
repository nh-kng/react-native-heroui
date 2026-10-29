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

test('loading text compiles a glyph gradient, reading-direction reversal, and a static reduced-motion fallback', () => {
  assert.match(css, /\.loading-text\s*\{[^}]*color: var\(--muted\)/);
  assert.match(css, /\.loading-text--sm\s*\{[^}]*font-size: 14px;[^}]*line-height: 20px/);
  assert.match(css, /\.loading-text--md\s*\{[^}]*font-size: 16px;[^}]*line-height: 24px/);
  assert.match(css, /\.loading-text--lg\s*\{[^}]*font-size: 18px;[^}]*line-height: 28px/);
  assert.match(css, /@supports[^{}]*background-clip: text/);
  assert.match(css, /\.loading-text\[data-variant="shimmer"\]\s*\{[^}]*background-image: linear-gradient\([^;]+var\(--foreground\)[^;]+;[^}]*color: #0000;[^}]*animation: 2s linear infinite loading-text-shimmer/);
  const shimmer = css.match(/\.loading-text\[data-variant="shimmer"\]\s*\{([^}]+)\}/)?.[1];
  assert.ok(shimmer);
  assert.ok(shimmer.includes('background-size: 300% 100%'));
  assert.ok(shimmer.includes('background-repeat: no-repeat'));
  assert.match(css, /@keyframes loading-text-shimmer\s*\{\s*(?:0%|from)\s*\{\s*background-position: 100%[^}]+\}\s*(?:100%|to)\s*\{\s*background-position: 0(?:%|px)?(?: (?:center|50%))?;/);
  assert.match(css, /\.loading-text\[data-variant="shimmer"\]:dir\(rtl\)\s*\{\s*animation-direction: reverse/);
  const reducedMotion = css.match(/@media \(prefers-reduced-motion: reduce\)\s*\{\s*\.loading-text\[data-variant\]\s*\{([^}]+)\}/)?.[1];
  assert.ok(reducedMotion);
  for (const declaration of ['animation: none', 'background-image: none', 'color: var(--muted)', 'opacity: 1']) {
    assert.ok(reducedMotion.includes(declaration), declaration);
  }
  assert.ok(css.includes('@keyframes loading-text-shimmer'));
  assert.ok(css.includes('@keyframes loading-text-pulse'));
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

test('feedback CSS keeps scaling behind reduced-motion preferences and leaves ripple animation to WAAPI', () => {
  assert.match(css, /\.pressable-feedback__web-root\[data-scale="true"\]\[data-pressed="true"\]:not\(\[data-disabled\]\)/);
  assert.match(css, /@media \(prefers-reduced-motion: no-preference\)\s*\{\s*\.pressable-feedback__web-scale\[data-active="true"\]\s*\{\s*transform: scale\(\.985\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)\s*\{\s*\.pressable-feedback__web-root[^{}]+\{\s*transition: none/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)\s*\{\s*\.pressable-feedback__web-root[^{}]+\.pressable-feedback__web-ripple-surface\s*\{\s*transition: none/);
});

test('feedback overlays are decorative and feedback roots expose a visible keyboard focus style', () => {
  assert.match(css, /\.pressable-feedback__web-highlight,\s*\.pressable-feedback__web-ripple\s*\{\s*pointer-events: none/);
  assert.match(css, /\.pressable-feedback__web-root\[data-focus-visible\]\s*\{\s*outline: 2px solid var\(--focus\)/);
  assert.match(css, /\.pressable-feedback__web-ripple-surface\s*\{[^}]*opacity: var\(--pressable-feedback-ripple-pressed-opacity, (?:0?\.12)\)/);
  assert.match(css, /\.pressable-feedback__web-highlight\[data-active="true"\]\s*\{\s*opacity: var\(--pressable-feedback-highlight-pressed-opacity, (?:0?\.12)\)/);
});

test('hover feedback is enabled only on hover-capable pointers and press takes precedence', () => {
  assert.match(css, /@media \(hover: hover\)\s*\{\s*\.pressable-feedback__web-root:not\(:disabled\):not\(\[aria-disabled="true"\]\):not\(\[data-disabled\]\) \.pressable-feedback__web-highlight\[data-hovered="true"\]:not\(\[data-active="true"\]\)\s*\{\s*opacity: var\(--pressable-feedback-highlight-opacity, (?:0?\.08)\)/);
  assert.match(css, /\.pressable-feedback__web-root:not\(:disabled\):not\(\[aria-disabled="true"\]\):not\(\[data-disabled\]\) \.pressable-feedback__web-ripple\[data-hovered="true"\]:before\s*\{\s*opacity: var\(--pressable-feedback-ripple-hover-opacity, (?:0?\.08)\)/);
  const overlay = css.match(/\.pressable-feedback__web-highlight,\s*\.pressable-feedback__web-ripple\s*\{([^{}]+)\}/);
  assert.ok(overlay?.[1].includes('z-index: -1'), 'Feedback stays behind content');
  const rootRule = css.match(/\.pressable-feedback__web-root\s*\{([^{}]+)\}/);
  assert.ok(rootRule?.[1].includes('isolation: isolate'), 'Feedback stays above the root background');
  assert.ok(!css.includes('.pressable-feedback__web-scale[data-hovered'), 'Scale remains press-only');
});

test('web feedback owns its positioning and clipping without native styles', () => {
  const rootRule = css.match(/\.pressable-feedback__web-root\s*\{([^}]+)\}/)?.[1];
  assert.ok(rootRule);
  assert.match(rootRule, /position: relative/);
  assert.match(rootRule, /overflow: hidden/);
  const overlays = css.match(/\.pressable-feedback__web-highlight,\s*\.pressable-feedback__web-ripple\s*\{([^}]+)\}/)?.[1];
  assert.ok(overlays);
  assert.match(overlays, /position: absolute/);
  assert.match(overlays, /inset: 0/);
  assert.match(overlays, /border-radius: inherit/);
});

test('highlight and ripple use configurable translucent colors, release fading and clipping', () => {
  assert.match(css, /\.pressable-feedback__web-highlight\s*\{[^}]*background-color: var\(--pressable-feedback-highlight-color, currentColor\);[^}]*opacity: 0;[^}]*transition: opacity (?:\.1s|100ms) ease-out/);
  assert.match(css, /\.pressable-feedback__web-ripple\s*\{\s*overflow: hidden/);
  const surface = css.match(/\.pressable-feedback__web-ripple-surface\s*\{([^}]+)\}/)?.[1];
  assert.ok(surface, 'Ripple has a circular press surface');
  assert.ok(!surface.includes('animation:') && !surface.includes('transition:'), 'CSS does not compete with independent WAAPI animations');
  assert.match(surface, /border-radius: 50%/);
  assert.match(surface, /background-color: var\(--pressable-feedback-ripple-color, currentColor\)/);
  assert.match(css, /\.pressable-feedback__web-ripple\[data-feedback-disabled="true"\]\s*\{\s*visibility: hidden/);
  assert.match(css, /\.pressable-feedback__web-highlight\[data-feedback-disabled="true"\]\s*\{\s*opacity: 0;\s*transition: none/);
  assert.ok(!css.includes('radial-gradient(circle at center'), 'Ripple uses pointer geometry rather than a centered gradient');
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
