import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
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
  assert.ok(accents.length >= 2);
  for (const accent of accents) {
    assert.match(accent, /^oklch\((?:0\.6204|62\.04%)\s+0?\.195\s+253\.83\)$/);
  }
});

test('compiled button feedback supports pointer and React Aria states with disabled guards', () => {
  const enabled = '[data-slot="button"]:not(:disabled):not([aria-disabled="true"]):not([data-disabled])';
  for (const state of [':hover', '[data-hovered="true"]', ':active', '[data-pressed="true"]']) {
    assert.ok(css.includes(`${enabled}${state}`), state);
  }
  assert.match(css, /background-color: var\(--button-bg-hover\)/);
  assert.match(css, /@media \(prefers-reduced-motion: no-preference\)\s*\{[^{}]*\{\s*transform: scale\(var\(--button-pressed-scale\)\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)\s*\{\s*\[data-slot="button"\]\s*\{\s*transition: none/);
});

test('compiled button variants and sizes retain their distinct feedback', () => {
  for (const [variant, color] of [
    ['primary', '--color-accent-hover'],
    ['danger', '--color-danger-hover'],
    ['danger-soft', '--color-danger-soft-hover'],
  ]) {
    assert.ok(css.includes(`[data-slot="button"].button__root--variant-${variant} {\n    --button-bg-hover: var(${color});`), variant);
  }
  for (const [size, scale] of [['sm', '.98'], ['lg', '.96']]) {
    assert.ok(css.includes(`[data-slot="button"].button__root--size-${size} {\n    --button-pressed-scale: ${scale};`), size);
  }
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
