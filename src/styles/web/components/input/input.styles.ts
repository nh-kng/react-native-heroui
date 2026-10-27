/*
 * Derived from heroui-react/packages/styles/src/components/input/input.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const inputVariants = tv({
  base: "input__input",
  defaultVariants: {
    fullWidth: false,
    variant: "primary",
  },
  variants: {
    fullWidth: {
      false: "",
      true: "w-full",
    },
    variant: {
      primary: "input__input--variant-primary",
      secondary: "input__input--variant-secondary",
    },
  },
});

export type InputVariants = VariantProps<typeof inputVariants>;
