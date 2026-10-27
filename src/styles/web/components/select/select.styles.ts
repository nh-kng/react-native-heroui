/*
 * Derived from heroui-react/packages/styles/src/components/select/select.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const selectVariants = tv({
  defaultVariants: {
    fullWidth: false,
    variant: "primary",
  },
  slots: {
    base: "select",
    clearButton: "select__clear-button",
    indicator: "select__indicator",
    popover: "select__popover",
    trigger: "select__trigger",
    value: "select__value",
  },
  variants: {
    fullWidth: {
      false: {},
      true: {
        base: "select--full-width",
        trigger: "select__trigger--full-width",
      },
    },
    variant: {
      primary: {
        base: "select--primary",
      },
      secondary: {
        base: "select--secondary",
      },
    },
  },
});

export type SelectVariants = VariantProps<typeof selectVariants>;
