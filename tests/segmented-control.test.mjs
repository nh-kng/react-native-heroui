import assert from 'node:assert/strict';
import test from 'node:test';

import { SegmentedControl } from '@nh-kng/react-native-heroui/segmented-control';
import { SegmentedControl as DirectExport } from '../build/web/components/segmented-control/index.web.js';
import {
  changedSegment, offsetSegmentBounds, sameSegmentBounds, segmentBounds, segmentIndicatorX, segmentKeys,
} from '../build/web/components/segmented-control/segmented-control-state.js';

test('the subpath exposes the complete segmented control compound API', () => {
  assert.equal(SegmentedControl, DirectExport);
  assert.equal(SegmentedControl.Root, SegmentedControl);
  for (const part of ['List', 'Item', 'Label']) assert.ok(SegmentedControl[part]);
});

test('a string value maps to exactly one tag key without changing its identity', () => {
  for (const value of ['system', 'analytics', '0', '']) {
    assert.deepEqual([...segmentKeys(value)], [value]);
  }
  const first = segmentKeys('system');
  first.clear();
  assert.deepEqual([...segmentKeys('system')], ['system']);
});

test('only a different single string selection produces a value change', () => {
  assert.equal(changedSegment('light', new Set(['dark'])), 'dark');
  assert.equal(changedSegment('light', new Set()), undefined);
  assert.equal(changedSegment('light', new Set(['light'])), undefined);
  assert.equal(changedSegment('light', new Set(['dark', 'system'])), undefined);
  assert.equal(changedSegment('light', new Set([1])), undefined);
});

test('indicator bounds are relative to the track and retain fractional layout measurements', () => {
  const track = { x: 20, y: 40, width: 320, height: 40 };
  assert.deepEqual(segmentBounds({ x: 114.5, y: 44, width: 96.25, height: 32 }, track), {
    x: 94.5, y: 4, width: 96.25, height: 32,
  });
  const rtl = segmentBounds({ x: 24, y: 44, width: 80, height: 32 }, track);
  assert.deepEqual(rtl, { x: 4, y: 4, width: 80, height: 32 });
  const resized = segmentBounds({ x: 134, y: 44, width: 110, height: 32 }, track);
  assert.equal(sameSegmentBounds(rtl, resized), false);
  assert.equal(sameSegmentBounds(rtl, { ...rtl }), true);
  assert.equal(sameSegmentBounds(undefined, undefined), true);
});

test('unmeasured and non-finite segments cannot position a visible indicator', () => {
  const parent = { x: 0, y: 0, width: 200, height: 40 };
  for (const item of [
    { x: 0, y: 0, width: 0, height: 32 },
    { x: 0, y: 0, width: 60, height: -1 },
    { x: NaN, y: 0, width: 60, height: 32 },
    { x: 0, y: Infinity, width: 60, height: 32 },
  ]) assert.equal(segmentBounds(item, parent), undefined);
});

test('Appearance remains a sibling after the scrolling component links', async () => {
  const { readFile } = await import('node:fs/promises');
  const { default: ts } = await import('typescript');
  const source = await readFile(new URL('../example/gallery/navigation.tsx', import.meta.url), 'utf8');
  const ast = ts.createSourceFile('navigation.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const scrollViews = [];
  const controls = [];
  function visit(node) {
    if (ts.isJsxElement(node)) {
      const tag = node.openingElement.tagName.getText(ast);
      if (tag === 'ScrollView') scrollViews.push(node);
      if (tag === 'SegmentedControl') controls.push(node);
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  assert.equal(scrollViews.length, 1);
  assert.equal(controls.length, 1);
  assert.ok(controls[0].pos > scrollViews[0].end, 'theme settings follow the closed ScrollView');
  assert.match(controls[0].getText(ast), /value=\{colorScheme\}/);
  assert.match(controls[0].getText(ast), /onColorSchemeChange\(scheme\)/);
});

test('native layout coordinates include the list offset inside the root track', () => {
  const item = { x: 75.5, y: 3, width: 72, height: 36 };
  assert.deepEqual(offsetSegmentBounds(item, { x: 8, y: 4, width: 240, height: 42 }), {
    x: 83.5, y: 7, width: 72, height: 36,
  });
  assert.deepEqual(offsetSegmentBounds({ ...item, x: 3 }, { x: 0, y: 0, width: 240, height: 42 }), {
    x: 3, y: 3, width: 72, height: 36,
  });
  assert.equal(offsetSegmentBounds({ ...item, width: 0 }, { x: 0, y: 0, width: 240, height: 42 }), undefined);
});

test('native app-wide RTL rebases the pill only when the physical left anchor is mirrored', () => {
  const bounds = { x: 114, y: 3, width: 100, height: 36 };
  assert.equal(segmentIndicatorX(bounds, 320, false), 114);
  assert.equal(segmentIndicatorX(bounds, 320, true), -106);
  assert.equal(segmentIndicatorX(bounds, 420, true), -206);
  assert.equal(segmentIndicatorX(bounds, 0, true), 114);
});
