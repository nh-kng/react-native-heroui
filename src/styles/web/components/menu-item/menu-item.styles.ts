/*
 * Derived from heroui-react/packages/styles/src/components/menu-item/menu-item.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const menuItemVariants = tv({
  defaultVariants: {
    variant: "default",
  },
  slots: {
    indicator: "menu-item__indicator",
    item: "menu-item",
    submenuIndicator: "menu-item__indicator menu-item__indicator--submenu",
  },
  variants: {
    variant: {
      danger: {
        item: "menu-item--danger",
      },
      default: {
        item: "menu-item--default",
      },
    },
  },
});

export type MenuItemVariants = VariantProps<typeof menuItemVariants>;
