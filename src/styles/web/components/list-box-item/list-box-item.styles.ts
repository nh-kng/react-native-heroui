/*
 * Derived from heroui-react/packages/styles/src/components/list-box-item/list-box-item.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const listboxItemVariants = tv({
  defaultVariants: {
    variant: "default",
  },
  slots: {
    indicator: "list-box-item__indicator",
    item: "list-box-item",
  },
  variants: {
    variant: {
      danger: {
        item: "list-box-item--danger",
      },
      default: {
        item: "list-box-item--default",
      },
    },
  },
});

export type ListBoxItemVariants = VariantProps<typeof listboxItemVariants>;
