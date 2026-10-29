/*
 * Derived from heroui-react/packages/styles/src/components/search-field/search-field.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const searchFieldVariants = tv({
  defaultVariants: {
    fullWidth: false,
    variant: "primary",
  },
  slots: {
    base: "search-field__root",
    clearButton: "search-field__clear-button",
    group: "search-field__group",
    input: "search-field__input",
    searchIcon: "search-field__search-icon",
  },
  variants: {
    fullWidth: {
      false: {},
      true: {
        base: "search-field--full-width",
        group: "search-field__group--full-width",
      },
    },
    variant: {
      primary: {
        base: "search-field--primary",
      },
      secondary: {
        base: "search-field--secondary",
      },
    },
  },
});

export type SearchFieldVariants = VariantProps<typeof searchFieldVariants>;
