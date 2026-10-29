/*
 * Derived from heroui-native/src/components/slider/slider.constants.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
/**
 * Display names for Slider components
 */
export const DISPLAY_NAME = {
  ROOT: 'HeroUI.Slider.Root',
  OUTPUT: 'HeroUI.Slider.Output',
  TRACK: 'HeroUI.Slider.Track',
  TRACK_BACKGROUND: 'HeroUI.Slider.TrackBackground',
  FILL: 'HeroUI.Slider.Fill',
  THUMB: 'HeroUI.Slider.Thumb',
};

/**
 * Spring animation configuration for thumb scale feedback
 */
export const THUMB_SPRING_CONFIG = {
  damping: 15,
  stiffness: 200,
  mass: 0.5,
};
