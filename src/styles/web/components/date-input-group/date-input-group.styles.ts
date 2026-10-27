/*
 * Derived from heroui-react/packages/styles/src/components/date-input-group/date-input-group.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const dateInputGroupVariants = tv({
  defaultVariants: {
    fullWidth: false,
    variant: "primary",
  },
  slots: {
    base: "date-input-group",
    input: "date-input-group__input",
    inputContainer: "date-input-group__input-container",
    prefix: "date-input-group__prefix",
    segment: "date-input-group__segment",
    suffix: "date-input-group__suffix",
  },
  variants: {
    fullWidth: {
      false: {},
      true: {
        base: "date-input-group--full-width",
      },
    },
    variant: {
      primary: {
        base: "date-input-group--primary",
      },
      secondary: {
        base: "date-input-group--secondary",
      },
    },
  },
});

export type DateInputGroupVariants = VariantProps<typeof dateInputGroupVariants>;
