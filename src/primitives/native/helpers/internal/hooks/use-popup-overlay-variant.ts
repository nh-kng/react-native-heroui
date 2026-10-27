/*
 * Derived from heroui-native/src/helpers/internal/hooks/use-popup-overlay-variant.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { Platform } from 'react-native';

import { useLibraryTheme } from './use-library-theme.js';
import { GLASS_THEME_VALUE } from '../../../components/glass-view/glass-view.constants.js';
import ExpoBlur from '../../../optional/expo-blur.js';
import type { PopupOverlayVariant } from '../types/overlay.js';

/**
 * The blur backdrop requires expo-blur and is only rendered on iOS.
 * On other platforms (or when expo-blur is not installed) the overlay
 * falls back to the `default` solid backdrop.
 */
const IS_BLUR_SUPPORTED = Platform.OS === 'ios' && Boolean(ExpoBlur);

/**
 * Resolves the effective overlay variant for the popup components whose
 * overlay paints a solid backdrop (Dialog, BottomSheet).
 *
 * When `variant` is omitted, the `glass` library theme defaults to `blur`;
 * every other theme defaults to `default`. A requested `blur` variant is
 * downgraded to `default` when blur is unsupported (non-iOS or expo-blur
 * missing).
 */
export function usePopupOverlayVariant(variant?: PopupOverlayVariant): {
  resolvedVariant: PopupOverlayVariant;
  isBlurVariant: boolean;
} {
  const theme = useLibraryTheme();

  const requestedVariant =
    variant ?? (theme === GLASS_THEME_VALUE ? 'blur' : 'default');

  const resolvedVariant: PopupOverlayVariant =
    requestedVariant === 'blur' && IS_BLUR_SUPPORTED ? 'blur' : 'default';

  return {
    resolvedVariant,
    isBlurVariant: resolvedVariant === 'blur',
  };
}
