/*
 * Derived from heroui-native/src/components/select/select.animation.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { useEffect } from 'react';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { INDICATOR_SPRING_CONFIG } from './select.constants.js';
import type {
  SelectAnimationContextValue,
  SelectTriggerIndicatorAnimation,
} from './select.types.js';
import { useAnimationSettings } from '../../helpers/internal/contexts/index.js';
import {
  createContext,
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
} from '../../helpers/internal/utils/index.js';

const [SelectAnimationProvider, useSelectAnimation] =
  createContext<SelectAnimationContextValue>({
    name: 'SelectAnimationContext',
  });

export { SelectAnimationProvider, useSelectAnimation };

// --------------------------------------------------

/**
 * Animation hook for Select Trigger Indicator component
 * Handles rotation animation for the chevron icon
 */
export function useSelectTriggerIndicatorAnimation(options: {
  animation: SelectTriggerIndicatorAnimation | undefined;
  isOpen: boolean;
}) {
  const { animation, isOpen } = options;

  // Read from global animation context (always available in compound parts)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Rotation animation values
  const rotationValue = getAnimationValueProperty({
    animationValue: animationConfig?.rotation,
    property: 'value',
    defaultValue: [0, -180] as [number, number],
  });

  const rotationSpringConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.rotation,
    property: 'springConfig',
    defaultValue: INDICATOR_SPRING_CONFIG,
  });

  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isAnimationDisabledValue) {
      rotation.set(isOpen ? 1 : 0);
    } else {
      rotation.set(withSpring(isOpen ? 1 : 0, rotationSpringConfig));
    }
  }, [isOpen, isAnimationDisabledValue, rotation, rotationSpringConfig]);

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate:
            interpolate(
              rotation.get(),
              [0, 1],
              [rotationValue[0], rotationValue[1]]
            ) + 'deg',
        },
      ],
    };
  });

  return {
    rContainerStyle,
  };
}
