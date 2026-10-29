import type { ComponentProps, ReactNode } from 'react';

import * as N from '../../primitives/native/components/skeleton/index.js';
import * as W from '../../primitives/web/components/skeleton/index.js';
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

export interface SkeletonProps {
  children?: ReactNode;
  className?: string;
  isLoading?: boolean;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Skeleton>,
    'children' | 'className' | 'ref' | 'asChild' | 'isLoading'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Skeleton.Root<'div'>>,
    'children' | 'className' | 'ref' | 'asChild' | 'isLoading'
  >;
}
