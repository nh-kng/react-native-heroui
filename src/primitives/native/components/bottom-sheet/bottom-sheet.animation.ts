/*
 * Derived from heroui-native/src/components/bottom-sheet/bottom-sheet.animation.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { BottomSheetAnimationContextValue } from './bottom-sheet.types.js';
import { useAnimationSettings } from '../../helpers/internal/contexts/animation-settings-context.js';
import type { AnimationDisabled } from '../../helpers/internal/types/animation.js';
import { getAnimationState , getIsAnimationDisabledValue } from '../../helpers/internal/utils/animation.js';
import { createContext } from '../../helpers/internal/utils/create-context.js';

const [BottomSheetAnimationProvider, useBottomSheetAnimation] =
  createContext<BottomSheetAnimationContextValue>({
    name: 'BottomSheetAnimationContext',
  });

export { BottomSheetAnimationProvider, useBottomSheetAnimation };

// --------------------------------------------------

/**
 * Animation hook for BottomSheet Content component
 * Handles animation disabled state based on local and global animation settings
 */
export function useBottomSheetContentAnimation(options: {
  /** Animation configuration for bottom sheet content */
  animation: AnimationDisabled | undefined;
}) {
  const { animation } = options;

  // Read from global animation context (always available in compound parts)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  return {
    isAnimationDisabledValue,
  };
}
