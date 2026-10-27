import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveButtonState } from '../build/web/components/button/button-state.js';
import { buttonClassNames } from '../build/web/components/button/button.styles.js';
import { chipClassNames } from '../build/web/components/chip/chip.styles.js';
import { verifyOwned } from '../scripts/verify-owned.mjs';

test('owned implementation has complete provenance and no upstream runtime imports', () => {
  assert.equal(verifyOwned().components, 10);
});

test('loading always blocks actions and the compatibility alias has the same semantics', () => {
  assert.deepEqual(resolveButtonState(false, true), { isDisabled: true, isLoading: true });
  assert.deepEqual(resolveButtonState(false, false, true), resolveButtonState(false, true));
  assert.deepEqual(resolveButtonState(true), { isDisabled: true, isLoading: false });
  assert.deepEqual(resolveButtonState(), { isDisabled: false, isLoading: false });
});

test('button size and visual semantics remain paired between root and label', () => {
  for (const size of ['sm', 'md', 'lg']) {
    for (const variant of [
      'primary',
      'secondary',
      'tertiary',
      'ghost',
      'danger',
      'outline',
      'danger-soft',
    ]) {
      assert.match(
        buttonClassNames.root({ size, variant }),
        new RegExp(`button__root--size-${size}`)
      );
      assert.ok(
        buttonClassNames.root({ size, variant }).includes(`button__root--variant-${variant}`)
      );
      assert.ok(
        buttonClassNames.label({ size, variant }).includes(`button__label--variant-${variant}`)
      );
    }
  }
});

test('chip defaults and compound color variants are consistent for root and label', () => {
  assert.match(chipClassNames.root(), /chip__root--size-md/);
  assert.match(chipClassNames.root(), /chip__root--variant-primary--color-accent/);
  for (const color of ['accent', 'default', 'success', 'warning', 'danger']) {
    for (const variant of ['primary', 'soft']) {
      assert.ok(
        chipClassNames
          .root({ color, variant })
          .includes(`chip__root--variant-${variant}--color-${color}`)
      );
      assert.ok(
        chipClassNames
          .label({ color, variant })
          .includes(`chip__label--variant-${variant}--color-${color}`)
      );
    }
  }
});
