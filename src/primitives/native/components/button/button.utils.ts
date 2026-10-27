/*
 * Derived from heroui-native/src/components/button/button.utils.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { ButtonRootProps } from './button.types.js';

/**
 * Resolves the animation prop into its object form.
 * Returns `undefined` when the animation is a non-object value (boolean / string).
 */
export function resolveAnimationObject(
  animation: ButtonRootProps['animation']
): Record<string, unknown> | undefined {
  if (typeof animation === 'object' && animation !== null) {
    return animation;
  }
  return undefined;
}

/**
 * Determines whether all animations should be disabled based on the animation prop value.
 */
export function isAnimationDisabled(
  animation: ButtonRootProps['animation']
): boolean {
  if (
    animation === false ||
    animation === 'disabled' ||
    animation === 'disable-all'
  ) {
    return true;
  }
  if (typeof animation === 'object' && animation !== null) {
    const { state } = animation;
    return state === false || state === 'disabled' || state === 'disable-all';
  }
  return false;
}
