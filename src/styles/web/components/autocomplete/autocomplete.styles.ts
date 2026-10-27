/*
 * Derived from heroui-react/packages/styles/src/components/autocomplete/autocomplete.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const autocompleteVariants = tv({
  defaultVariants: {
    fullWidth: false,
    variant: "primary",
  },
  slots: {
    base: "autocomplete",
    clearButton: "autocomplete__clear-button",
    filter: "autocomplete__filter",
    indicator: "autocomplete__indicator",
    popover: "autocomplete__popover",
    trigger: "autocomplete__trigger",
    value: "autocomplete__value",
  },
  variants: {
    fullWidth: {
      false: {},
      true: {
        base: "autocomplete--full-width",
        trigger: "autocomplete__trigger--full-width",
      },
    },
    variant: {
      primary: {
        base: "autocomplete--primary",
      },
      secondary: {
        base: "autocomplete--secondary",
      },
    },
  },
});

export type AutocompleteVariants = VariantProps<typeof autocompleteVariants>;
