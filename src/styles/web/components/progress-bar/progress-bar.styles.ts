/*
 * Derived from heroui-react/packages/styles/src/components/progress-bar/progress-bar.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const progressBarVariants = tv({
  defaultVariants: {
    color: "accent",
    size: "md",
  },
  slots: {
    base: "progress-bar",
    fill: "progress-bar__fill",
    output: "progress-bar__output",
    track: "progress-bar__track",
  },
  variants: {
    color: {
      accent: {
        base: "progress-bar--accent",
      },
      danger: {
        base: "progress-bar--danger",
      },
      default: {
        base: "progress-bar--default",
      },
      success: {
        base: "progress-bar--success",
      },
      warning: {
        base: "progress-bar--warning",
      },
    },
    size: {
      lg: {
        base: "progress-bar--lg",
      },
      md: {
        base: "progress-bar--md",
      },
      sm: {
        base: "progress-bar--sm",
      },
    },
  },
});

export type ProgressBarVariants = VariantProps<typeof progressBarVariants>;
