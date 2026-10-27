/*
 * Derived from heroui-react/packages/styles/src/components/color-swatch/color-swatch.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const colorSwatchVariants = tv({
  base: "color-swatch",
  defaultVariants: {
    shape: "circle",
    size: "md",
  },
  variants: {
    shape: {
      circle: "color-swatch--circle",
      square: "color-swatch--square",
    },
    size: {
      lg: "color-swatch--lg",
      md: "color-swatch--md",
      sm: "color-swatch--sm",
      xl: "color-swatch--xl",
      xs: "color-swatch--xs",
    },
  },
});

export type ColorSwatchVariants = VariantProps<typeof colorSwatchVariants>;
