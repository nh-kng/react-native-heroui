import type { ComponentProps, ReactNode } from 'react';

import * as N from '../../primitives/native/components/input-group/index.js';
import * as W from '../../primitives/web/components/input-group/index.js';
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

export interface InputGroupProps {
  children?: ReactNode;
  className?: string;
  isDisabled?: boolean;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.InputGroup>,
    'children' | 'className' | 'ref' | 'asChild' | 'isDisabled'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.InputGroup>,
    'children' | 'className' | 'ref' | 'asChild' | 'isDisabled'
  >;
}

export interface InputGroupInputProps {
  className?: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.InputGroup.Input>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'value'
    | 'defaultValue'
    | 'onChangeText'
    | 'placeholder'
    | 'isDisabled'
    | 'isInvalid'
    | 'onChange'
    | 'disabled'
    | 'aria-invalid'
    | 'editable'
    | 'readOnly'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.InputGroup.Input>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'value'
    | 'defaultValue'
    | 'onChangeText'
    | 'placeholder'
    | 'isDisabled'
    | 'isInvalid'
    | 'onChange'
    | 'disabled'
    | 'aria-invalid'
    | 'editable'
    | 'readOnly'
  >;
}

export interface InputGroupPrefixProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.InputGroup.Prefix>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.InputGroup.Prefix>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}

export interface InputGroupSuffixProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.InputGroup.Suffix>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.InputGroup.Suffix>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}
