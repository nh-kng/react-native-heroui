import { forwardRef, type ComponentRef } from 'react';

import type { AvatarProps, AvatarImageProps, AvatarFallbackProps } from './avatar.types.js';
import * as N from '../../primitives/native/components/avatar/index.js';
export type * from './avatar.types.js';

export type AvatarRootRef = ComponentRef<typeof N.Avatar>;
const AvatarRoot = forwardRef<AvatarRootRef, AvatarProps>(function AvatarRoot(
  { children, className, size = 'md', color = 'accent', webProps, nativeProps },
  ref
) {
  const Target = N.Avatar;
  return (
    <Target {...nativeProps} ref={ref} className={className} size={size} color={color}>
      {children}
    </Target>
  );
});

export type AvatarImageRef = ComponentRef<typeof N.Avatar.Image>;
const AvatarImage = forwardRef<AvatarImageRef, AvatarImageProps>(function AvatarImage(
  { className, src, alt, webProps, nativeProps },
  ref
) {
  const Target = N.Avatar.Image;
  return (
    <Target
      {...nativeProps}
      ref={ref}
      className={className}
      source={{ uri: src }}
      accessibilityLabel={alt}
    />
  );
});

export type AvatarFallbackRef = ComponentRef<typeof N.Avatar.Fallback>;
const AvatarFallback = forwardRef<AvatarFallbackRef, AvatarFallbackProps>(function AvatarFallback(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = N.Avatar.Fallback;
  return (
    <Target {...nativeProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export const Avatar = Object.assign(AvatarRoot, {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
});
