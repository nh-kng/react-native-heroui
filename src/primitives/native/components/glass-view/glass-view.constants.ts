/*
 * Derived from heroui-native/src/components/glass-view/glass-view.constants.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
/**
 * Display names for the GlassView component
 */
export const DISPLAY_NAME = {
  ROOT: 'HeroUINative.GlassView',
};

/**
 * `--theme` value (see `useLibraryTheme`) that enables glass rendering
 */
export const GLASS_THEME_VALUE = 'glass';

/**
 * Default blur intensity forwarded to expo-blur (iOS only)
 */
export const DEFAULT_INTENSITY = 25;

/**
 * Default theme color token flattened over `--background` on platforms
 * without native backdrop blur (Android / web)
 */
export const DEFAULT_FALLBACK_COLOR = 'overlay' as const;
