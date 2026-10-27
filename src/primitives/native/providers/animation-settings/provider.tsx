/*
 * Derived from heroui-native/src/providers/animation-settings/provider.tsx at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import React from 'react';
import { useReducedMotion } from 'react-native-reanimated';

import type {
  GlobalAnimationSettingsContextValue,
  GlobalAnimationSettingsProviderProps,
} from './types.js';
import { createContext } from '../../helpers/internal/utils/create-context.js';

const [GlobalAnimationSettingsProvider, useGlobalAnimationSettings] =
  createContext<GlobalAnimationSettingsContextValue>({
    name: 'GlobalAnimationSettingsContext',
    strict: false,
  });

export { useGlobalAnimationSettings };

/**
 * GlobalAnimationSettingsProvider Component
 *
 * @description
 * Provider component that controls global animation settings across the application.
 * When animation is set to 'disable-all', all animations will be disabled globally.
 * Additionally, if the user has enabled reduce motion in accessibility settings,
 * all animations will be disabled automatically.
 *
 * This provider wraps AnimationSettingsProvider to cascade the global setting
 * down through the component tree.
 *
 * @param {GlobalAnimationSettingsProviderProps} props - Provider props
 * @param {AnimationRootDisableAll} [props.animation] - Global animation setting
 * @param {ReactNode} props.children - Child components to wrap
 */
export const GlobalAnimationSettingsProviderComponent: React.FC<
  GlobalAnimationSettingsProviderProps
> = ({ animation, children }) => {
  const reducedMotion = useReducedMotion();
  const globalIsAllAnimationsDisabled =
    animation === 'disable-all' || reducedMotion;

  return (
    <GlobalAnimationSettingsProvider value={{ globalIsAllAnimationsDisabled }}>
      {children}
    </GlobalAnimationSettingsProvider>
  );
};

export default GlobalAnimationSettingsProviderComponent;
