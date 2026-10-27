/*
 * Derived from heroui-native/src/helpers/internal/hooks/use-popup-root-animation.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { useSharedValue } from 'react-native-reanimated';

import { useCombinedAnimationDisabledState } from './use-combined-animation-disabled-state.js';
import type { AnimationRootDisableAll } from '../types/animation.js';

/**
 * Root animation hook for popup-like components (Dialog, Select, etc.)
 * Manages component state transitions and animation coordination
 */
export function usePopupRootAnimation(options: {
  animation?: AnimationRootDisableAll;
}) {
  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(
    options.animation
  );

  const progress = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const isGestureReleaseAnimationRunning = useSharedValue(false);

  return {
    isAllAnimationsDisabled,
    progress,
    isDragging,
    isGestureReleaseAnimationRunning,
  };
}
