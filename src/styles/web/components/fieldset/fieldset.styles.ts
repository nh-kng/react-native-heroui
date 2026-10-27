/*
 * Derived from heroui-react/packages/styles/src/components/fieldset/fieldset.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const fieldsetVariants = tv({
  slots: {
    actions: "fieldset__actions",
    base: "fieldset",
    description: "fieldset__description",
    fieldGroup: "fieldset__field-group",
    legend: "fieldset__legend",
  },
});

export type FieldsetVariants = VariantProps<typeof fieldsetVariants>;
