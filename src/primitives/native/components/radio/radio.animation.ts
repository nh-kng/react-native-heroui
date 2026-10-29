/*
 * Derived from heroui-native/src/components/radio/radio.animation.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import type { RadioIndicatorThumbAnimation } from './radio.types.js';
import { useAnimationSettings } from '../../helpers/internal/contexts/index.js';
import { useCombinedAnimationDisabledState } from '../../helpers/internal/hooks/index.js';
import type { AnimationRootDisableAll } from '../../helpers/internal/types/index.js';
import {
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
} from '../../helpers/internal/utils/index.js';

// --------------------------------------------------

/**
 * Animation hook for Radio root component.
 * Handles cascading animation disabled state to child components (Indicator, IndicatorThumb).
 */
export function useRadioRootAnimation(options: {
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
 * Animation hook for Radio.IndicatorThumb component.
 * Handles scale animation based on selection state.
 */
export function useRadioIndicatorThumbAnimation(options: {
  animation: RadioIndicatorThumbAnimation | undefined;
  isSelected: boolean | undefined;
}) {
  const { animation, isSelected } = options;

  // Read from global animation context (always available in compound parts)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Scale animation
  const scaleValue = getAnimationValueProperty({
    animationValue: animationConfig?.scale,
    property: 'value',
    defaultValue: [1.5, 1] as [number, number],
  });

  const scaleTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.scale,
    property: 'timingConfig',
    defaultValue: { duration: 300, easing: Easing.out(Easing.ease) },
  });

  const rContainerStyle = useAnimatedStyle(() => {
    if (isAnimationDisabledValue) {
      return {
        transform: [
          {
            scale: scaleValue[1],
          },
        ],
      };
    }

    return {
      transform: [
        {
          scale: withTiming(
            isSelected ? scaleValue[1] : scaleValue[0],
            scaleTimingConfig
          ),
        },
      ],
    };
  });

  return {
    rContainerStyle,
  };
}
