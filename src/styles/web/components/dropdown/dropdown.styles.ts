/*
 * Derived from heroui-react/packages/styles/src/components/dropdown/dropdown.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const dropdownVariants = tv({
  slots: {
    menu: "dropdown__menu",
    popover: "dropdown__popover",
    root: "dropdown",
    trigger: "dropdown__trigger",
  },
});

export type DropdownVariants = VariantProps<typeof dropdownVariants>;
