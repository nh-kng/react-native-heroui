/*
 * Derived from heroui-react/packages/react/src/components/list-box-item/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {ListBoxItemIndicator, ListBoxItemRoot} from "./list-box-item.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ListBoxItem = Object.assign(ListBoxItemRoot, {
  Root: ListBoxItemRoot,
  Indicator: ListBoxItemIndicator,
});

export type ListBoxItem = {
  Props: ComponentProps<typeof ListBoxItemRoot>;
  RootProps: ComponentProps<typeof ListBoxItemRoot>;
  IndicatorProps: ComponentProps<typeof ListBoxItemIndicator>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ListBoxItemRoot, ListBoxItemIndicator};

export type {
  ListBoxItemRootProps,
  ListBoxItemRootProps as ListBoxItemProps,
  ListBoxItemIndicatorProps,
} from "./list-box-item.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {listboxItemVariants} from "../../../../styles/web/index.js";
export type {ListBoxItemVariants} from "../../../../styles/web/index.js";
