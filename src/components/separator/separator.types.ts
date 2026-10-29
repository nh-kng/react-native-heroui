import type { ComponentProps } from 'react';

import * as N from '../../primitives/native/components/separator/index.js';
import * as W from '../../primitives/web/components/separator/index.js';
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

export interface SeparatorProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Separator>,
    'children' | 'className' | 'ref' | 'asChild' | 'orientation'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Separator>,
    'children' | 'className' | 'ref' | 'asChild' | 'orientation'
  >;
}
