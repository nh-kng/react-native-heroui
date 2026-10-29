import assert from 'node:assert/strict';
import test from 'node:test';

import {
  clampTableOffset,
  markdownTableDragOffset,
  markdownTableLayoutOffset,
  markdownTablePageOffset,
  markdownTableScrollMetrics,
  markdownTableTrackOffset,
  markdownTableWebOffset,
  markdownTableWebScrollLeft,
} from '../build/web/components/markdown/markdown-table-scroll.js';

test('table controls require a measured viewport and overflow beyond rounding tolerance', () => {
  for (const [viewport, content] of [
    [0, 500],
    [500, 0],
    [500, 400],
    [500, 500],
    [500, 501],
  ]) {
    assert.equal(markdownTableScrollMetrics(viewport, content, 0, 100).overflow, false);
  }
  assert.equal(markdownTableScrollMetrics(500, 502, 0, 100).overflow, true);
});

test('scroll boundaries tolerate fractional layout and clamp bounce and shrinking content', () => {
  const start = markdownTableScrollMetrics(200, 600, -25, 100);
  assert.equal(start.position, 0);
  assert.equal(start.canScrollLeft, false);
  assert.equal(start.canScrollRight, true);
  assert.equal(markdownTableScrollMetrics(200, 600, 0.5, 100).canScrollLeft, false);
  assert.equal(markdownTableScrollMetrics(200, 600, 399.5, 100).canScrollRight, false);
  const shrunk = markdownTableScrollMetrics(200, 300, 400, 100);
  assert.equal(shrunk.position, 100);
  assert.equal(shrunk.percent, 100);
  assert.equal(shrunk.canScrollRight, false);
  assert.equal(clampTableOffset(100, -50), 0);
});

test('arrow presses page by eighty percent and stop at either end', () => {
  assert.equal(markdownTablePageOffset(0, 1, 200, 400), 160);
  assert.equal(markdownTablePageOffset(160, -1, 200, 400), 0);
  assert.equal(markdownTablePageOffset(350, 1, 200, 400), 400);
  assert.equal(markdownTablePageOffset(10, -1, 200, 400), 0);
});

test('thumb represents the viewport, has a bounded minimum, and reaches both ends', () => {
  const middle = markdownTableScrollMetrics(200, 800, 300, 200);
  assert.equal(middle.thumb, 50);
  assert.equal(middle.thumbPosition, 75);
  assert.equal(middle.percent, 50);
  assert.equal(markdownTableScrollMetrics(100, 10000, 0, 200).thumb, 24);
  assert.equal(markdownTableScrollMetrics(100, 10000, 0, 12).thumb, 12);
  assert.equal(markdownTableScrollMetrics(100, 100, 0, 200).thumb, 200);
  assert.equal(markdownTableScrollMetrics(0, 0, 0, 0).thumbPosition, 0);
  const end = markdownTableScrollMetrics(200, 800, 600, 200);
  assert.equal(end.thumbPosition + end.thumb, 200);
});

test('thumb dragging maps physical movement to content offset and clamps safely', () => {
  assert.equal(markdownTableDragOffset(0, 75, 150, 600), 300);
  assert.equal(markdownTableDragOffset(300, -1000, 150, 600), 0);
  assert.equal(markdownTableDragOffset(300, 1000, 150, 600), 600);
  assert.equal(markdownTableDragOffset(300, 100, 0, 600), 300);
});

test('track presses page toward the pointer and leave the thumb untouched', () => {
  assert.equal(markdownTableTrackOffset(10, 75, 50, 300, 200, 600), 140);
  assert.equal(markdownTableTrackOffset(150, 75, 50, 300, 200, 600), 460);
  for (const point of [75, 100, 125]) {
    assert.equal(markdownTableTrackOffset(point, 75, 50, 300, 200, 600), 300);
  }
});

test('web RTL negative scroll offsets normalize to the same physical coordinates as LTR', () => {
  for (const position of [0, 100, 300]) {
    assert.equal(markdownTableWebOffset(position, 300, false), position);
    assert.equal(markdownTableWebScrollLeft(position, 300, false), position);
    const raw = markdownTableWebScrollLeft(position, 300, true);
    assert.equal(raw, position - 300);
    assert.equal(markdownTableWebOffset(raw, 300, true), position);
  }
  assert.equal(markdownTableWebOffset(-500, 300, true), 0);
  assert.equal(markdownTableWebOffset(50, 300, true), 300);
  assert.equal(markdownTableWebScrollLeft(500, 300, true), 0);
});

test('native RTL starts at the right edge and preserves position across measured layouts', () => {
  assert.equal(markdownTableLayoutOffset(0, 600, true, null), 600);
  assert.equal(markdownTableLayoutOffset(0, 600, false, null), 0);
  const rtlLayout = { maximum: 600, rtl: true };
  assert.equal(markdownTableLayoutOffset(600, 800, true, rtlLayout), 800);
  assert.equal(markdownTableLayoutOffset(300, 800, true, rtlLayout), 300);
  assert.equal(markdownTableLayoutOffset(300, 600, true, rtlLayout), 300);
  assert.equal(markdownTableLayoutOffset(300, 200, true, rtlLayout), 200);
  assert.equal(
    markdownTableLayoutOffset(300, 600, true, { maximum: 600, rtl: false }),
    600
  );
  assert.equal(
    markdownTableLayoutOffset(300, 800, false, { maximum: 600, rtl: false }),
    300
  );
});
