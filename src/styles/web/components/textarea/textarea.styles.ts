/*
 * Derived from heroui-react/packages/styles/src/components/textarea/textarea.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const textAreaVariants = tv({
  base: "textarea",
  defaultVariants: {
    fullWidth: false,
    variant: "primary",
  },
  variants: {
    fullWidth: {
      false: "",
      true: "textarea--full-width",
    },
    variant: {
      primary: "textarea--primary",
      secondary: "textarea--secondary",
    },
  },
});

export type TextAreaVariants = VariantProps<typeof textAreaVariants>;
