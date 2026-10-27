/*
 * Derived from heroui-native/src/providers/hero-ui-native/provider.tsx at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import React, { useMemo } from 'react';
import { I18nManager } from 'react-native';
import { SafeAreaListener } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';

import type { HeroUINativeProviderProps } from './types.js';
import { LayoutDirectionProvider } from '../../helpers/internal/contexts/layout-direction-context.js';
import { useDevInfo } from '../../helpers/internal/hooks/use-dev-info.js';
import { PortalHost } from '../../primitives/portal/index.js';
import { GlobalAnimationSettingsProvider } from '../animation-settings/index.js';
import { TextComponentProvider } from '../text-component/provider.js';
import { TextInputComponentProvider } from '../text-input-component/provider.js';
import { ToastProvider } from '../toast/provider.js';

/**
 * HeroUINativeProvider Component
 *
 * @description
 * Main provider component for HeroUI Native that configures the application
 * with global settings. This component should wrap your entire application
 * or the section where you want to use HeroUI Native components.
 *
 * Currently provides:
 * - Global animation settings
 * - Global text component configuration
 * - Global text input component configuration
 * - Toast notification system
 * - Portal management for overlays
 *
 * @param {HeroUINativeProviderProps} props - Provider configuration props
 * @param {ReactNode} props.children - Child components to wrap
 * @param {HeroUINativeConfig} [props.config] - Configuration object
 *
 */
const HeroUINativeProvider: React.FC<HeroUINativeProviderProps> = ({
  children,
  config = {},
}) => {
  const { textProps, textInputProps, toast, animation, devInfo, isRTL } =
    config;

  useDevInfo(devInfo);

  // Determine if toast should be enabled and get props
  const isToastEnabled = toast !== false && toast !== 'disabled';
  const toastProps = typeof toast === 'object' ? toast : {};

  // Resolve the effective layout direction, falling back to the global RTL state
  const layoutDirectionValue = useMemo(
    () => ({ isRTL: isRTL ?? I18nManager.isRTL }),
    [isRTL]
  );

  return (
    <SafeAreaListener
      onChange={({ insets }) => {
        Uniwind.updateInsets(insets);
      }}
    >
      <LayoutDirectionProvider value={layoutDirectionValue}>
        <GlobalAnimationSettingsProvider animation={animation}>
          <TextComponentProvider value={{ textProps }}>
            <TextInputComponentProvider value={{ textInputProps }}>
              {isToastEnabled ? (
                <ToastProvider {...toastProps}>
                  {children}
                  <PortalHost />
                </ToastProvider>
              ) : (
                <>
                  {children}
                  <PortalHost />
                </>
              )}
            </TextInputComponentProvider>
          </TextComponentProvider>
        </GlobalAnimationSettingsProvider>
      </LayoutDirectionProvider>
    </SafeAreaListener>
  );
};

export default HeroUINativeProvider;
