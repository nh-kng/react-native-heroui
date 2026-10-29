/*
 * Derived from heroui-react/packages/react/src/components/list-box/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {ListBoxRoot} from "./list-box.js";
import {ListBoxItem, ListBoxItemIndicator} from "../list-box-item/index.js";
import {ListBoxSection} from "../list-box-section/index.js";


/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ListBox = Object.assign(ListBoxRoot, {
  Root: ListBoxRoot,
  Item: ListBoxItem,
  ItemIndicator: ListBoxItemIndicator,
  Section: ListBoxSection,
});

export type ListBox = {
  Props: ComponentProps<typeof ListBoxRoot>;
  RootProps: ComponentProps<typeof ListBoxRoot>;
  ItemProps: ComponentProps<typeof ListBoxItem>;
  SectionProps: ComponentProps<typeof ListBoxSection>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ListBoxRoot};

export type {ListBoxRootProps, ListBoxRootProps as ListBoxProps} from "./list-box.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {listboxVariants} from "../../../../styles/web/index.js";

export type {ListBoxVariants} from "../../../../styles/web/index.js";
