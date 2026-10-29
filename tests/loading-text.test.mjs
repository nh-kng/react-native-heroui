import assert from 'node:assert/strict';
import test from 'node:test';

import { LoadingText } from '@nh-kng/react-native-heroui/loading-text';
import { LoadingText as WebLoadingText } from '../build/web/components/loading-text/index.web.js';
import {
  loadingTextDuration,
  loadingTextSweep,
  resolveLoadingText,
} from '../build/web/components/loading-text/loading-text-state.js';

test('LoadingText conditional subpath exposes the web component and Root alias without native imports', () => {
  assert.equal(LoadingText, WebLoadingText);
  assert.equal(LoadingText.Root, LoadingText);
});

test('loading labels default to a small shimmer and preserve explicitly empty text', () => {
  assert.deepEqual(resolveLoadingText(), { text: 'Thinking', variant: 'shimmer', size: 'sm' });
  assert.deepEqual(resolveLoadingText({ text: '', size: 'lg' }), { text: '', variant: 'none', size: 'lg' });
  assert.equal(loadingTextDuration, 2000);
});

test('disabled animation wins over shimmer and pulse while preserving label and size', () => {
  for (const variant of ['shimmer', 'pulse', 'none']) {
    assert.deepEqual(resolveLoadingText({ text: 'Generating response', variant, size: 'md' }, true), {
      text: 'Generating response', variant: 'none', size: 'md',
    });
    assert.equal(resolveLoadingText({ variant }).variant, variant);
  }
});

test('labels normalize line breaks consistently across platform text layout engines', () => {
  assert.equal(resolveLoadingText({ text: 'Thinking\r\nGenerating\rresponse\nReady' }).text, 'Thinking Generating response Ready');
});

test('the native highlight crosses the full label in its reading direction at every layout width', () => {
  for (const width of [20, 100, 347.5]) {
    const ltr = loadingTextSweep(width, false);
    const rtl = loadingTextSweep(width, true);
    assert.ok(ltr[0] + width <= 0, 'LTR begins fully outside the label');
    assert.ok(ltr[1] >= width, 'LTR finishes fully outside the label');
    assert.deepEqual(rtl, ltr.toReversed());
  }
});

