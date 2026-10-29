/*
 * Derived from heroui-react/packages/react/src/components/avatar/avatar.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import type {ComponentPropsWithRef} from "react";
import React, {createContext, use} from "react";

import type {AvatarVariants} from "../../../../styles/web/index.js";
import {avatarVariants} from "../../../../styles/web/index.js";
import {composeSlotClassName} from "../../utils/compose.js";
import {AVATAR_GROUP_CHILD, AvatarGroupContext} from "../avatar-group/avatar-group-context.js";

/* ------------------------------------------------------------------------------------------------
 * Avatar Context
 * --------------------------------------------------------------------------------------------- */
type AvatarContext = {
  slots?: ReturnType<typeof avatarVariants>;
};

const AvatarContext = createContext<AvatarContext>({});

/* -------------------------------------------------------------------------------------------------
 * Avatar Root
 * -----------------------------------------------------------------------------------------------*/
interface AvatarRootProps
  extends Omit<ComponentPropsWithRef<typeof AvatarPrimitive.Root>, "color">, AvatarVariants {
  [AVATAR_GROUP_CHILD]?: boolean;
}

const AvatarRoot = ({
  children,
  className,
  color,
  size,
  variant,
  [AVATAR_GROUP_CHILD]: isAvatarGroupChild,
  ...props
}: AvatarRootProps) => {
  const avatarGroupContext = use(AvatarGroupContext);

  // Only use group context when this avatar is a direct child of AvatarGroup
  const shouldUseContext = isAvatarGroupChild === true;

  // Merge props with precedence: direct props > context props
  const finalSize = size ?? (shouldUseContext ? avatarGroupContext?.size : undefined);
  const finalColor = color ?? (shouldUseContext ? avatarGroupContext?.color : undefined);
  const finalVariant = variant ?? (shouldUseContext ? avatarGroupContext?.variant : undefined);

  const slots = React.useMemo(
    () => avatarVariants({color: finalColor, size: finalSize, variant: finalVariant}),
    [finalColor, finalSize, finalVariant],
  );
  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <AvatarContext value={contextValue}>
      <AvatarPrimitive.Root className={slots.base({className})} {...props}>
        {children}
      </AvatarPrimitive.Root>
    </AvatarContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Avatar Image
 * -----------------------------------------------------------------------------------------------*/
interface AvatarImageProps extends ComponentPropsWithRef<typeof AvatarPrimitive.Image> {}

const AvatarImage = ({
  className,
  crossOrigin,
  loading,
  onError,
  onLoad,
  sizes,
  src,
  srcSet,
  ...props
}: AvatarImageProps) => {
  const {slots} = React.use(AvatarContext);

  return (
    <AvatarPrimitive.Image
      className={composeSlotClassName(slots?.image, className)}
      crossOrigin={crossOrigin}
      loading={loading}
      sizes={sizes}
      src={src}
      srcSet={srcSet}
      onError={onError}
      onLoad={onLoad}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Avatar Fallback
 * -----------------------------------------------------------------------------------------------*/
interface AvatarFallbackProps extends ComponentPropsWithRef<typeof AvatarPrimitive.Fallback> {
  color?: AvatarVariants["color"];
}

const AvatarFallback = ({className, color, ...props}: AvatarFallbackProps) => {
  const {slots} = React.use(AvatarContext);

  return (
    <AvatarPrimitive.Fallback
      className={composeSlotClassName(slots?.fallback, className, {color})}
      data-slot="avatar-fallback"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {AvatarRoot, AvatarImage, AvatarFallback};

export type {AvatarRootProps, AvatarImageProps, AvatarFallbackProps};
