/*
 * Derived from heroui-react/packages/styles/src/components/label/label.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const labelVariants = tv({
  base: "label__text",
  defaultVariants: {
    isDisabled: false,
    isInvalid: false,
    isRequired: false,
  },
  variants: {
    isDisabled: {
      true: "label__root--is-disabled",
    },
    isInvalid: {
      true: "label__text--is-invalid",
    },
    isRequired: {
      true: "label--required",
    },
  },
});

export type LabelVariants = VariantProps<typeof labelVariants>;
