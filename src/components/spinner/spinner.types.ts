import type { ComponentProps } from 'react';

import * as N from '../../primitives/native/components/spinner/index.js';
import * as W from '../../primitives/web/components/spinner/index.js';
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

export interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'accent' | 'success' | 'warning' | 'danger';
  isLoading?: boolean;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Spinner>,
    'children' | 'className' | 'ref' | 'asChild' | 'size' | 'color' | 'isLoading'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Spinner.Root<'span'>>,
    'children' | 'className' | 'ref' | 'asChild' | 'size' | 'color' | 'isLoading'
  >;
}
