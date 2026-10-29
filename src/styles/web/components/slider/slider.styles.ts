/*
 * Derived from heroui-react/packages/styles/src/components/slider/slider.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const sliderVariants = tv({
  slots: {
    base: "slider__root",
    fill: "slider__fill",
    marks: "slider__marks",
    output: "slider__output-text",
    thumb: "slider__thumb-knob",
    track: "slider__track",
  },
});

export type SliderVariants = VariantProps<typeof sliderVariants>;
