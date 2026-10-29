/*
 * Derived from heroui-react/packages/react/src/components/slider/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {
  SliderFill,
  SliderMarks,
  SliderOutput,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from "./slider.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Slider = Object.assign(SliderRoot, {
  Root: SliderRoot,
  Output: SliderOutput,
  Track: SliderTrack,
  Fill: SliderFill,
  Thumb: SliderThumb,
  Marks: SliderMarks,
});

export type Slider = {
  Props: ComponentProps<typeof SliderRoot>;
  RootProps: ComponentProps<typeof SliderRoot>;
  OutputProps: ComponentProps<typeof SliderOutput>;
  TrackProps: ComponentProps<typeof SliderTrack>;
  FillProps: ComponentProps<typeof SliderFill>;
  ThumbProps: ComponentProps<typeof SliderThumb>;
  MarksProps: ComponentProps<typeof SliderMarks>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {SliderRoot, SliderOutput, SliderTrack, SliderFill, SliderThumb, SliderMarks};

export type {
  SliderRootProps,
  SliderRootProps as SliderProps,
  SliderOutputProps,
  SliderTrackProps,
  SliderFillProps,
  SliderThumbProps,
  SliderMarksProps,
} from "./slider.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {sliderVariants} from "../../../../styles/web/index.js";

export type {SliderVariants} from "../../../../styles/web/index.js";
