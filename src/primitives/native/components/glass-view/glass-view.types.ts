/*
 * Derived from heroui-native/src/components/glass-view/glass-view.types.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { ViewProps } from 'react-native';

import type { ThemeColor } from '../../helpers/external/hooks/use-theme-color.js';
import type { ExpoBlurTint } from '../../optional/expo-blur.js';

/**
 * Props for the GlassView component
 */
export type GlassViewProps = ViewProps & {
  /**
   * Blur intensity (0-100) forwarded to expo-blur's `intensity`.
   * iOS only — the Android fallback layer ignores it.
   * @default 25
   */
  intensity?: number;
  /**
   * Blur tint forwarded to expo-blur's `tint`. iOS only — the Android
   * fallback layer ignores it.
   * @default derived from the active color scheme ('light' | 'dark')
   */
  tint?: ExpoBlurTint;
  /**
   * Theme color token flattened over `--background` and painted as an opaque
   * `backgroundColor` on platforms without native backdrop blur (Android /
   * web). iOS ignores this — the blur layer frosts through the translucent
   * tint instead.
   * @default 'overlay'
   */
  fallbackColor?: ThemeColor;
  /**
   * When `true`, skips the iOS blur layer and paints the opaque
   * `fallbackColor` (flattened over `--background`) on every platform.
   * Useful for surfaces where translucency is undesirable, e.g. stacked
   * toasts where the blur would reveal the content underneath.
   * @default false
   */
  forceFallbackColor?: boolean;
  /**
   * Additional class names applied to the blur layer
   */
  className?: string;
};
