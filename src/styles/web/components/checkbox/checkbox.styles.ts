/*
 * Derived from heroui-react/packages/styles/src/components/checkbox/checkbox.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const checkboxVariants = tv({
  defaultVariants: {
    variant: "primary",
  },
  slots: {
    base: "checkbox",
    content: "checkbox__content",
    control: "checkbox__control",
    indicator: "checkbox__indicator",
  },
  variants: {
    variant: {
      primary: {
        base: "checkbox--primary",
      },
      secondary: {
        base: "checkbox--secondary",
      },
    },
  },
});

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
