/*
 * Derived from heroui-react/packages/styles/src/components/spinner/spinner.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const spinnerVariants = tv({
  base: "spinner__root",
  defaultVariants: {
    color: "accent",
    size: "md",
  },
  variants: {
    color: {
      accent: "spinner--accent",
      current: "spinner--current",
      danger: "spinner--danger",
      success: "spinner--success",
      warning: "spinner--warning",
    },
    size: {
      lg: "spinner__root--size-lg",
      md: "spinner__root--size-md",
      sm: "spinner__root--size-sm",
      xl: "spinner--xl",
    },
  },
});

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;
