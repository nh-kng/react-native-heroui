/*
 * Derived from heroui-react/packages/styles/src/components/number-field/number-field.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const numberFieldVariants = tv({
  defaultVariants: {
    fullWidth: false,
    variant: "primary",
  },
  slots: {
    base: "number-field",
    decrementButton: "number-field__decrement-button",
    group: "number-field__group",
    incrementButton: "number-field__increment-button",
    input: "number-field__input",
  },
  variants: {
    fullWidth: {
      false: {},
      true: {
        base: "number-field--full-width",
        group: "number-field__group--full-width",
      },
    },
    variant: {
      primary: {
        base: "number-field--primary",
      },
      secondary: {
        base: "number-field--secondary",
      },
    },
  },
});

export type NumberFieldVariants = VariantProps<typeof numberFieldVariants>;
