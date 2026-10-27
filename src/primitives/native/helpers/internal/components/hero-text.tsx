/*
 * Derived from heroui-native/src/helpers/internal/components/hero-text.tsx at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import React from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { useTextComponent } from '../../external/hooks/index.js';
import { cn } from '../../external/utils/cn.js';
import type { TextRef } from '../types/index.js';

/**
 * Props for HeroText component
 */
export interface HeroTextProps extends RNTextProps {
  /**
   * Additional CSS classes that will be merged with the default 'hero-text' class (font-normal)
   */
  className?: string;
}

/**
 * HeroText component that automatically applies global text configuration
 * from HeroUINativeProvider.
 *
 * This component is distinct from React Native's Text component and includes
 * a default 'hero-text' className (font-normal, base layer) that can be extended via the className prop.
 *
 * Global text props that can be configured:
 * - adjustsFontSizeToFit: Auto-scale text to fit constraints
 * - allowFontScaling: Respect Text Size accessibility settings
 * - maxFontSizeMultiplier: Maximum font scale when allowFontScaling is enabled
 * - minimumFontScale: Minimum scale when adjustsFontSizeToFit is enabled (iOS only)
 *
 * @example
 * ```tsx
 * <HeroText>Hello World</HeroText>
 * ```
 *
 * @example
 * With custom className:
 * ```tsx
 * <HeroText className="text-lg font-bold">Hello World</HeroText>
 * ```
 *
 * @example
 * Global configuration in HeroUINativeProvider:
 * ```tsx
 * <HeroUINativeProvider config={{
 *   textProps: {
 *     allowFontScaling: false,
 *     adjustsFontSizeToFit: false,
 *     maxFontSizeMultiplier: 1.5
 *   }
 * }}>
 *   <App />
 * </HeroUINativeProvider>
 * ```
 */
export const HeroText = React.forwardRef<TextRef, HeroTextProps>(
  (props, ref) => {
    const { className, ...restProps } = props;
    const { textProps } = useTextComponent();

    const mergedProps = Object.assign({}, textProps, restProps);

    return (
      <RNText
        ref={ref}
        className={cn('hero-text', className)}
        {...mergedProps}
      />
    );
  }
);

HeroText.displayName = 'HeroText';
