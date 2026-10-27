/*
 * Derived from heroui-react/packages/styles/src/components/alert/alert.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const alertVariants = tv({
  defaultVariants: {
    status: "default",
  },
  slots: {
    base: "alert",
    content: "alert__content",
    description: "alert__description",
    indicator: "alert__indicator",
    title: "alert__title",
  },
  variants: {
    status: {
      accent: {
        base: "alert--accent",
      },
      danger: {
        base: "alert--danger",
      },
      default: {
        base: "alert--default",
      },
      success: {
        base: "alert--success",
      },
      warning: {
        base: "alert--warning",
      },
    },
  },
});

export type AlertVariants = VariantProps<typeof alertVariants>;
