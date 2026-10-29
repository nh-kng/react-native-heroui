import type { ComponentProps, ReactNode } from 'react';

import * as N from '../../primitives/native/components/search-field/index.js';
import * as W from '../../primitives/web/components/search-field/index.js';
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

export interface SearchFieldProps {
  children?: ReactNode;
  className?: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (value: string) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.SearchField>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'value'
    | 'defaultValue'
    | 'onChangeText'
    | 'isDisabled'
    | 'isInvalid'
    | 'onChange'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.SearchField>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'value'
    | 'defaultValue'
    | 'onChangeText'
    | 'isDisabled'
    | 'isInvalid'
    | 'onChange'
  >;
}

export interface SearchFieldGroupProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.SearchField.Group>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.SearchField.Group>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}

export interface SearchFieldInputProps {
  className?: string;
  placeholder?: string;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.SearchField.Input>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'placeholder'
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'onChangeText'
    | 'disabled'
    | 'editable'
    | 'readOnly'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.SearchField.Input>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'placeholder'
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'onChangeText'
    | 'disabled'
    | 'editable'
    | 'readOnly'
  >;
}

export interface SearchFieldSearchIconProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.SearchField.SearchIcon>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.SearchField.SearchIcon<'span'>>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}

export interface SearchFieldClearButtonProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.SearchField.ClearButton>,
    'children' | 'className' | 'ref' | 'asChild' | 'onPress' | 'onClick'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.SearchField.ClearButton>,
    'children' | 'className' | 'ref' | 'asChild' | 'onPress' | 'onClick'
  >;
}
