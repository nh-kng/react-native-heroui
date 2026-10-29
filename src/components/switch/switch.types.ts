import type { ComponentProps, ReactNode } from 'react';

import * as N from '../../primitives/native/components/switch/index.js';
import * as W from '../../primitives/web/components/switch/index.js';
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

export interface SwitchProps {
  children?: ReactNode;
  className?: string;
  isSelected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (value: boolean) => void;
  isDisabled?: boolean;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Switch>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'isSelected'
    | 'defaultSelected'
    | 'onSelectedChange'
    | 'isDisabled'
    | 'onChange'
    | 'disabled'
    | 'accessibilityState'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Switch>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'isSelected'
    | 'defaultSelected'
    | 'onSelectedChange'
    | 'isDisabled'
    | 'onChange'
    | 'disabled'
    | 'accessibilityState'
  >;
}

export interface SwitchThumbProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Switch.Thumb>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Switch.Thumb<'span'>>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}
