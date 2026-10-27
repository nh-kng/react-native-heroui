/*
 * Derived from heroui-react/packages/styles/src/components/color-input-group/color-input-group.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const colorInputGroupVariants = tv({
  defaultVariants: {
    fullWidth: false,
    variant: "primary",
  },
  slots: {
    base: "color-input-group",
    input: "color-input-group__input",
    prefix: "color-input-group__prefix",
    suffix: "color-input-group__suffix",
  },
  variants: {
    fullWidth: {
      false: {},
      true: {
        base: "color-input-group--full-width",
      },
    },
    variant: {
      primary: {
        base: "color-input-group--primary",
      },
      secondary: {
        base: "color-input-group--secondary",
      },
    },
  },
});

export type ColorInputGroupVariants = VariantProps<typeof colorInputGroupVariants>;
