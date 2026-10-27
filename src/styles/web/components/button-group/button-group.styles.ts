/*
 * Derived from heroui-react/packages/styles/src/components/button-group/button-group.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const buttonGroupVariants = tv({
  defaultVariants: {
    fullWidth: false,
    orientation: "horizontal",
  },
  slots: {
    base: "button-group",
    separator: "button-group__separator",
  },
  variants: {
    fullWidth: {
      false: {},
      true: {
        base: "button-group--full-width",
      },
    },
    orientation: {
      horizontal: {
        base: "button-group--horizontal",
      },
      vertical: {
        base: "button-group--vertical",
      },
    },
  },
});

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>;
