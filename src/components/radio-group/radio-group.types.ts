import type { ComponentProps, ReactNode } from 'react';

import * as N from '../../primitives/native/components/radio-group/index.js';
import * as R from '../../primitives/web/components/radio/index.js';
import * as W from '../../primitives/web/components/radio-group/index.js';
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

export interface RadioGroupProps {
  children?: ReactNode;
  className?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.RadioGroup>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'value'
    | 'defaultValue'
    | 'onValueChange'
    | 'isDisabled'
    | 'isInvalid'
    | 'onChange'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.RadioGroup>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'value'
    | 'defaultValue'
    | 'onValueChange'
    | 'isDisabled'
    | 'isInvalid'
    | 'onChange'
  >;
}

export interface RadioGroupItemProps {
  children?: ReactNode;
  className?: string;
  value: string;
  isDisabled?: boolean;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.RadioGroup.Item>,
    'children' | 'className' | 'ref' | 'asChild' | 'value' | 'isDisabled'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof R.Radio>,
    'children' | 'className' | 'ref' | 'asChild' | 'value' | 'isDisabled'
  >;
}
