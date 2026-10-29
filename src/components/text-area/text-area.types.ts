import type { ComponentProps } from 'react';

import * as N from '../../primitives/native/components/text-area/index.js';
import * as W from '../../primitives/web/components/textarea/index.js';
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

export interface TextAreaProps {
  className?: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.TextArea>,
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
    ComponentProps<typeof W.TextArea>,
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
