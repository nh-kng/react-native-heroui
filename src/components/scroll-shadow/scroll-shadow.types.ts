import type { ComponentProps, ReactElement } from 'react';

import * as N from '../../primitives/native/components/scroll-shadow/index.js';
import * as W from '../../primitives/web/components/scroll-shadow/index.js';
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

export interface ScrollShadowProps {
  children: ReactElement;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  size?: number;
  isEnabled?: boolean;
  nativeProps?: Partial<Pick<ComponentProps<typeof N.ScrollShadow>, 'LinearGradientComponent'>> &
    PlatformOptions<
      ComponentProps<typeof N.ScrollShadow>,
      | 'children'
      | 'className'
      | 'ref'
      | 'asChild'
      | 'orientation'
      | 'size'
      | 'isEnabled'
      | 'LinearGradientComponent'
    >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.ScrollShadow>,
    'children' | 'className' | 'ref' | 'asChild' | 'orientation' | 'size' | 'isEnabled'
  >;
}
