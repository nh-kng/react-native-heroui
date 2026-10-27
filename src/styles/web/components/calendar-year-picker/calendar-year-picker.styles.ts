/*
 * Derived from heroui-react/packages/styles/src/components/calendar-year-picker/calendar-year-picker.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const calendarYearPickerVariants = tv({
  slots: {
    trigger: "calendar-year-picker__trigger",
    triggerHeading: "calendar-year-picker__trigger-heading",
    triggerIndicator: "calendar-year-picker__trigger-indicator",
    yearCell: "calendar-year-picker__year-cell",
    yearGrid: "calendar-year-picker__year-grid",
  },
});

export type CalendarYearPickerVariants = VariantProps<typeof calendarYearPickerVariants>;
