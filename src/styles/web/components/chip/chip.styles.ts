/*
 * Derived from heroui-react/packages/styles/src/components/chip/chip.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const chipVariants = tv({
  defaultVariants: {
    color: "default",
    variant: "secondary",
  },
  slots: {
    base: "chip",
    label: "chip__label",
  },
  variants: {
    color: {
      accent: {
        base: "chip--accent",
      },
      danger: {
        base: "chip--danger",
      },
      default: {
        base: "chip--default",
      },
      success: {
        base: "chip--success",
      },
      warning: {
        base: "chip--warning",
      },
    },
    size: {
      lg: {
        base: "chip--lg",
      },
      md: {
        base: "chip--md",
      },
      sm: {
        base: "chip--sm",
      },
    },
    variant: {
      primary: {
        base: "chip--primary",
      },
      secondary: {
        base: "chip--secondary",
      },
      soft: {
        base: "chip--soft",
      },
      tertiary: {
        base: "chip--tertiary",
      },
    },
  },
});

export type ChipVariants = VariantProps<typeof chipVariants>;
