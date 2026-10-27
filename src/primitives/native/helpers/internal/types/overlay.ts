/*
 * Derived from heroui-native/src/helpers/internal/types/overlay.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { ExpoBlurBlurViewProps } from '../../../optional/expo-blur.js';

/**
 * Visual variant of a popup overlay (backdrop layer).
 * - `default`: solid backdrop driven by the `--color-backdrop` token
 * - `blur`: iOS-only blur backdrop rendered with expo-blur
 */
export type PopupOverlayVariant = 'default' | 'blur';

/**
 * Props forwarded to the internal BlurView rendered by the `blur` overlay
 * variant. `intensity` is treated as the maximum (animated) blur intensity.
 */
export type PopupOverlayBlurViewProps = Omit<ExpoBlurBlurViewProps, 'children'>;
