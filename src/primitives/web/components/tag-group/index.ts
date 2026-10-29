/*
 * Derived from heroui-react/packages/react/src/components/tag-group/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {TagGroupContext, TagGroupList, TagGroupRoot} from "./tag-group.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const TagGroup = Object.assign(TagGroupRoot, {
  Root: TagGroupRoot,
  List: TagGroupList,
});

export type TagGroup = {
  Props: ComponentProps<typeof TagGroupRoot>;
  RootProps: ComponentProps<typeof TagGroupRoot>;
  ListProps: ComponentProps<typeof TagGroupList>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {TagGroupRoot, TagGroupList, TagGroupContext};

export type {
  TagGroupRootProps,
  TagGroupRootProps as TagGroupProps,
  TagGroupListProps,
} from "./tag-group.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {tagGroupVariants} from "../../../../styles/web/index.js";

export type {TagGroupVariants} from "../../../../styles/web/index.js";
