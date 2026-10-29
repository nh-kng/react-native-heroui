import type { ComponentProps, ReactNode } from 'react';

import * as N from '../../primitives/native/components/checkbox/index.js';
import * as W from '../../primitives/web/components/checkbox/index.js';
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

export interface CheckboxProps {
  children?: ReactNode;
  className?: string;
  isSelected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (value: boolean) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Checkbox>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'isSelected'
    | 'defaultSelected'
    | 'onSelectedChange'
    | 'isDisabled'
    | 'isInvalid'
    | 'onChange'
    | 'disabled'
    | 'accessibilityState'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Checkbox>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'isSelected'
    | 'defaultSelected'
    | 'onSelectedChange'
    | 'isDisabled'
    | 'isInvalid'
    | 'onChange'
    | 'disabled'
    | 'accessibilityState'
  >;
}

export interface CheckboxIndicatorProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Checkbox.Indicator>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Checkbox.Indicator<'svg'>>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}
