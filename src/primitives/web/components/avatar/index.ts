/*
 * Derived from heroui-react/packages/react/src/components/avatar/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {AvatarFallback, AvatarImage, AvatarRoot} from "./avatar.js";
import {AVATAR_GROUP_CHILD} from "../avatar-group/avatar-group-context.js";


/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Avatar = Object.assign(AvatarRoot, {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
});

export type Avatar = {
  Props: ComponentProps<typeof AvatarRoot>;
  RootProps: ComponentProps<typeof AvatarRoot>;
  ImageProps: ComponentProps<typeof AvatarImage>;
  FallbackProps: ComponentProps<typeof AvatarFallback>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {AvatarRoot, AvatarImage, AvatarFallback};

export type {
  AvatarRootProps,
  AvatarRootProps as AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
} from "./avatar.js";

/* -------------------------------------------------------------------------------------------------
 * Re-export AVATAR_GROUP_CHILD for type declarations
 * -----------------------------------------------------------------------------------------------*/
export {AVATAR_GROUP_CHILD};

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {avatarVariants} from "../../../../styles/web/index.js";

export type {AvatarVariants} from "../../../../styles/web/index.js";
