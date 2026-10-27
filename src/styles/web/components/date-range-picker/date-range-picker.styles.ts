/*
 * Derived from heroui-react/packages/styles/src/components/date-range-picker/date-range-picker.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const dateRangePickerVariants = tv({
  slots: {
    base: "date-range-picker",
    popover: "date-range-picker__popover",
    rangeSeparator: "date-range-picker__range-separator",
    trigger: "date-range-picker__trigger",
    triggerIndicator: "date-range-picker__trigger-indicator",
  },
});

export type DateRangePickerVariants = VariantProps<typeof dateRangePickerVariants>;
