/*
 * Derived from heroui-react/packages/styles/src/components/color-picker/color-picker.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const colorPickerVariants = tv({
  slots: {
    base: "color-picker",
    popover: "color-picker__popover",
    trigger: "color-picker__trigger",
  },
});

export type ColorPickerVariants = VariantProps<typeof colorPickerVariants>;
