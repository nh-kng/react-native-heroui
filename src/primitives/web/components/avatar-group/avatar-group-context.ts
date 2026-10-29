/*
 * Derived from heroui-react/packages/react/src/components/avatar-group/avatar-group-context.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import {createContext} from "react";

import type {AvatarVariants, avatarGroupVariants} from "../../../../styles/web/index.js";


/* -------------------------------------------------------------------------------------------------
 * AvatarGroup Context
 * -----------------------------------------------------------------------------------------------*/
type AvatarGroupContextValue = {
  slots?: ReturnType<typeof avatarGroupVariants>;
  size?: AvatarVariants["size"];
  color?: AvatarVariants["color"];
  variant?: AvatarVariants["variant"];
};

const AvatarGroupContext = createContext<AvatarGroupContextValue>({});

/** Marks direct children of AvatarGroup so nested Avatars do not inherit group props. */
const AVATAR_GROUP_CHILD = "__avatar_group_child";

export {AvatarGroupContext, AVATAR_GROUP_CHILD};
export type {AvatarGroupContextValue};
