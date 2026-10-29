/*
 * Derived from heroui-react/packages/react/src/components/tag/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {TagRemoveButton, TagRoot} from "./tag.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Tag = Object.assign(TagRoot, {
  Root: TagRoot,
  RemoveButton: TagRemoveButton,
});

export type Tag = {
  Props: ComponentProps<typeof TagRoot>;
  RootProps: ComponentProps<typeof TagRoot>;
  RemoveButtonProps: ComponentProps<typeof TagRemoveButton>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {TagRoot, TagRemoveButton};

export type {TagRootProps, TagRemoveButtonProps} from "./tag.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {tagVariants} from "../../../../styles/web/index.js";

export type {TagVariants} from "../../../../styles/web/index.js";
