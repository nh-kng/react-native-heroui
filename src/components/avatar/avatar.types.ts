import type { ComponentProps, ReactNode } from 'react';

import * as N from '../../primitives/native/components/avatar/index.js';
import * as W from '../../primitives/web/components/avatar/index.js';
type PlatformOptions<T, K extends PropertyKey> = T extends unknown
  ? Omit<
      T,
      | K
      | 'render'
      | 'aria-disabled'
      | 'aria-checked'
      | 'aria-selected'
      | 'aria-invalid'
      | 'accessibilityState'
    >
  : never;

export interface AvatarProps {
  children?: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'accent' | 'success' | 'warning' | 'danger';
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Avatar>,
    'children' | 'className' | 'ref' | 'asChild' | 'size' | 'color'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Avatar>,
    'children' | 'className' | 'ref' | 'asChild' | 'size' | 'color'
  >;
}

export interface AvatarImageProps {
  className?: string;
  src: string;
  alt: string;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Avatar.Image>,
    'children' | 'className' | 'ref' | 'asChild' | 'src' | 'alt' | 'source' | 'accessibilityLabel'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Avatar.Image>,
    'children' | 'className' | 'ref' | 'asChild' | 'src' | 'alt' | 'source' | 'accessibilityLabel'
  >;
}

export interface AvatarFallbackProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Avatar.Fallback>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Avatar.Fallback>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}
