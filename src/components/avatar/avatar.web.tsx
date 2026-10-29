import { forwardRef, type ComponentRef } from 'react';

import type { AvatarProps, AvatarImageProps, AvatarFallbackProps } from './avatar.types.js';
import * as W from '../../primitives/web/components/avatar/index.js';
export type * from './avatar.types.js';

export type AvatarRootRef = ComponentRef<typeof W.Avatar>;
const AvatarRoot = forwardRef<AvatarRootRef, AvatarProps>(function AvatarRoot(
  { children, className, size = 'md', color = 'accent', webProps, nativeProps },
  ref
) {
  const Target = W.Avatar;
  return (
    <Target {...webProps} ref={ref} className={className} size={size} color={color}>
      {children}
    </Target>
  );
});

export type AvatarImageRef = ComponentRef<typeof W.Avatar.Image>;
const AvatarImage = forwardRef<AvatarImageRef, AvatarImageProps>(function AvatarImage(
  { className, src, alt, webProps, nativeProps },
  ref
) {
  const Target = W.Avatar.Image;
  return <Target {...webProps} ref={ref} className={className} src={src} alt={alt} />;
});

export type AvatarFallbackRef = ComponentRef<typeof W.Avatar.Fallback>;
const AvatarFallback = forwardRef<AvatarFallbackRef, AvatarFallbackProps>(function AvatarFallback(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = W.Avatar.Fallback;
  return (
    <Target {...webProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export const Avatar = Object.assign(AvatarRoot, {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
});
