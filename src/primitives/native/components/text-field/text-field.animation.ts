/*
 * Derived from heroui-native/src/components/text-field/text-field.animation.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { useCombinedAnimationDisabledState } from '../../helpers/internal/hooks/use-combined-animation-disabled-state.js';
import type { AnimationRootDisableAll } from '../../helpers/internal/types/animation.js';

// --------------------------------------------------

/**
 * Animation hook for TextField Root component
 * Handles root-level animation configuration and provides context for child components
 */
export function useTextFieldRootAnimation(options: {
  animation: AnimationRootDisableAll | undefined;
}) {
  const { animation } = options;

  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  return {
    isAllAnimationsDisabled,
  };
}
