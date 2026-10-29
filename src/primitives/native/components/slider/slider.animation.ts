/*
 * Derived from heroui-native/src/components/slider/slider.animation.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { THUMB_SPRING_CONFIG } from './slider.constants.js';
import type { SliderThumbAnimation } from './slider.types.js';
import { useAnimationSettings } from '../../helpers/internal/contexts/index.js';
import { useCombinedAnimationDisabledState } from '../../helpers/internal/hooks/index.js';
import type { AnimationRootDisableAll } from '../../helpers/internal/types/index.js';
import {
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
} from '../../helpers/internal/utils/index.js';

/**
 * Animation hook for Slider root component.
 * Handles root-level animation configuration and provides
 * cascading disable-all state for child components.
 */
export function useSliderRootAnimation(options: {
  animation: AnimationRootDisableAll | undefined;
}) {
  const { animation } = options;

  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  return {
    isAllAnimationsDisabled,
  };
}

// --------------------------------------------------

/**
 * Animation hook for Slider.Thumb knob scale effect.
 * Animates scale between idle and dragging states using spring physics,
 * driven by the `isThumbDragging` state from the slider context.
 */
export function useSliderThumbAnimation(options: {
  animation: SliderThumbAnimation | undefined;
  isDragging: boolean;
}) {
  const { animation, isDragging } = options;

  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  const scaleValue = getAnimationValueProperty({
    animationValue: animationConfig?.scale,
    property: 'value',
    defaultValue: [1, 0.9] as [number, number],
  });

  const scaleSpringConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.scale,
    property: 'springConfig',
    defaultValue: THUMB_SPRING_CONFIG,
  });

  const rKnobStyle = useAnimatedStyle(() => {
    if (isAnimationDisabledValue) {
      return {
        transform: [{ scale: isDragging ? scaleValue[1] : scaleValue[0] }],
      };
    }

    return {
      transform: [
        {
          scale: withSpring(
            isDragging ? scaleValue[1] : scaleValue[0],
            scaleSpringConfig
          ),
        },
      ],
    };
  });

  return {
    rKnobStyle,
  };
}
