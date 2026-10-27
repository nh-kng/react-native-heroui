/*
 * Derived from heroui-react/packages/styles/src/components/progress-circle/progress-circle.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const progressCircleVariants = tv({
  defaultVariants: {
    color: "accent",
    size: "md",
  },
  slots: {
    base: "progress-circle",
    fillCircle: "progress-circle__fill-circle",
    track: "progress-circle__track",
    trackCircle: "progress-circle__track-circle",
  },
  variants: {
    color: {
      accent: {
        base: "progress-circle--accent",
      },
      danger: {
        base: "progress-circle--danger",
      },
      default: {
        base: "progress-circle--default",
      },
      success: {
        base: "progress-circle--success",
      },
      warning: {
        base: "progress-circle--warning",
      },
    },
    size: {
      lg: {
        base: "progress-circle--lg",
      },
      md: {
        base: "progress-circle--md",
      },
      sm: {
        base: "progress-circle--sm",
      },
    },
  },
});

export type ProgressCircleVariants = VariantProps<typeof progressCircleVariants>;
