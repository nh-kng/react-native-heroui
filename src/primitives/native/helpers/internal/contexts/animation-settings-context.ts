/*
 * Derived from heroui-native/src/helpers/internal/contexts/animation-settings-context.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { createContext } from '../utils/create-context.js';

/**
 * Context value for global animation settings
 */
export interface AnimationSettingsContextValue {
  /**
   * Whether all animations should be disabled (cascading from parent)
   */
  isAllAnimationsDisabled: boolean;
}

const [AnimationSettingsProvider, useAnimationSettings] =
  createContext<AnimationSettingsContextValue>({
    name: 'AnimationSettingsContext',
    strict: false,
  });

export { AnimationSettingsProvider, useAnimationSettings };
