/*
 * Derived from heroui-react/packages/styles/src/components/tag/tag.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const tagVariants = tv({
  defaultVariants: {
    size: "md",
    variant: "default",
  },
  slots: {
    base: "tag-group__tag tag-group__tag--variant-default tag-group__tag--size-md",
    removeButton: "tag-group__remove-button",
  },
  variants: {
    size: {
      lg: {
        base: "tag--lg",
      },
      md: {
        base: "tag--md",
      },
      sm: {
        base: "tag--sm",
      },
    },
    variant: {
      default: {
        base: "tag--default",
      },
      surface: {
        base: "tag--surface",
      },
    },
  },
});

export type TagVariants = VariantProps<typeof tagVariants>;
