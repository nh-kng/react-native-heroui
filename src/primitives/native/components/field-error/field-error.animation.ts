/*
 * Derived from heroui-native/src/components/field-error/field-error.animation.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import {
  ENTERING_ANIMATION_CONFIG,
  EXITING_ANIMATION_CONFIG,
} from './field-error.constants.js';
import type { FieldErrorRootAnimation } from './field-error.types.js';
import { useCombinedAnimationDisabledState } from '../../helpers/internal/hooks/use-combined-animation-disabled-state.js';
import { getAnimationValueProperty , getIsAnimationDisabledValue , getRootAnimationState } from '../../helpers/internal/utils/animation.js';

// --------------------------------------------------

/**
 * Animation hook for FieldError root component
 * Handles entering and exiting animations for error messages
 */
export function useFieldErrorRootAnimation(options: {
  animation: FieldErrorRootAnimation | undefined;
}) {
  const { animation } = options;

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
    entering: isAnimationDisabledValue ? undefined : enteringValue,
    exiting: isAnimationDisabledValue ? undefined : exitingValue,
  };
}
