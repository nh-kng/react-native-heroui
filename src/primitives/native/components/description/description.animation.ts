/*
 * Derived from heroui-native/src/components/description/description.animation.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import {
  ENTERING_ANIMATION_CONFIG,
  EXITING_ANIMATION_CONFIG,
} from './description.constants.js';
import type { DescriptionAnimation } from './description.types.js';
import { useCombinedAnimationDisabledState } from '../../helpers/internal/hooks/use-combined-animation-disabled-state.js';
import { getAnimationValueProperty , getIsAnimationDisabledValue , getRootAnimationState } from '../../helpers/internal/utils/animation.js';

// --------------------------------------------------

/**
 * Animation hook for Description component
 * Handles entering and exiting animations for the description text
 */
export function useDescriptionAnimation(options: {
  animation: DescriptionAnimation | undefined;
  hideOnInvalid: boolean;
}) {
  const { animation, hideOnInvalid } = options;

  const { animationConfig, isAnimationDisabled } =
    getRootAnimationState(animation);

  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  const enteringValue = getAnimationValueProperty({
    animationValue: animationConfig?.entering,
    property: 'value',
    defaultValue: ENTERING_ANIMATION_CONFIG,
  });

  const exitingValue = getAnimationValueProperty({
    animationValue: animationConfig?.exiting,
    property: 'value',
    defaultValue: EXITING_ANIMATION_CONFIG,
  });

  return {
    entering:
      isAnimationDisabledValue || !hideOnInvalid ? undefined : enteringValue,
    exiting:
      isAnimationDisabledValue || !hideOnInvalid ? undefined : exitingValue,
  };
}
