import type { ComponentProps, ReactNode } from 'react';

import * as N from '../../primitives/native/components/surface/index.js';
import * as W from '../../primitives/web/components/surface/index.js';
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

export interface SurfaceProps {
  children?: ReactNode;
  className?: string;
  variant?: 'default' | 'secondary' | 'tertiary' | 'transparent';
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Surface>,
    'children' | 'className' | 'ref' | 'asChild' | 'variant'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Surface.Root<'div'>>,
    'children' | 'className' | 'ref' | 'asChild' | 'variant'
  >;
}
