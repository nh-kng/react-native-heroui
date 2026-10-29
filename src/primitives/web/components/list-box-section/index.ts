/*
 * Derived from heroui-react/packages/react/src/components/list-box-section/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {ListBoxSectionRoot} from "./list-box-section.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ListBoxSection = ListBoxSectionRoot;

export type ListBoxSection = {
  Props: ComponentProps<typeof ListBoxSectionRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ListBoxSectionRoot};

export type {
  ListBoxSectionRootProps,
  ListBoxSectionRootProps as ListBoxSectionProps,
} from "./list-box-section.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {listboxSectionVariants} from "../../../../styles/web/index.js";

export type {ListBoxSectionVariants} from "../../../../styles/web/index.js";
