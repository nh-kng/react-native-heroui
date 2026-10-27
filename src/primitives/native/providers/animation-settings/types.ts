/*
 * Derived from heroui-native/src/providers/animation-settings/types.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { ReactNode } from 'react';

import type { AnimationRootDisableAll } from '../../helpers/internal/types/animation.js';

/**
 * Props for GlobalAnimationSettingsProvider component
 */
export interface GlobalAnimationSettingsProviderProps {
  /**
   * Global animation setting
   * When set to 'disable-all', all animations across the app will be disabled
   */
  animation?: AnimationRootDisableAll;
  /**
   * Child components to render within the provider
   */
  children: ReactNode;
}

/**
 * Context value for global animation settings
 */
export interface GlobalAnimationSettingsContextValue {
  /**
   * Whether all animations should be disabled globally
   */
  globalIsAllAnimationsDisabled: boolean;
}
