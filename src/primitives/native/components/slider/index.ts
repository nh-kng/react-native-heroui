/*
 * Derived from heroui-native/src/components/slider/index.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
// Component export
export { default as Slider, useSlider } from './slider.js';

// ClassNames export for external reuse
export { sliderClassNames } from './slider.styles.js';

// Re-export primitive context and value types for consumer convenience
export type {
  SliderContextValue,
  SliderOrientation,
  SliderRenderProps,
  SliderState,
  SliderValue,
} from '../../primitives/slider/slider.types.js';

// Component-level type exports
export type {
  SliderFillProps,
  SliderOutputProps,
  SliderProps,
  SliderThumbProps,
  SliderTrackBackgroundProps,
  SliderTrackProps,
} from './slider.types.js';
