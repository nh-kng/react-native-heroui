import type { ComponentProps, ReactNode } from 'react';

import * as N from '../../primitives/native/components/input-otp/index.js';
import * as W from '../../primitives/web/components/input-otp/index.js';
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

export interface InputOTPProps {
  children?: ReactNode;
  className?: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (value: string) => void;
  maxLength: number;
  isDisabled?: boolean;
  isInvalid?: boolean;
  onComplete?: (value: string) => void;
  pattern?: string;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.InputOTP>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'value'
    | 'defaultValue'
    | 'onChangeText'
    | 'maxLength'
    | 'isDisabled'
    | 'isInvalid'
    | 'onComplete'
    | 'pattern'
    | 'onChange'
    | 'disabled'
    | 'textInputProps'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.InputOTP>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'value'
    | 'defaultValue'
    | 'onChangeText'
    | 'maxLength'
    | 'isDisabled'
    | 'isInvalid'
    | 'onComplete'
    | 'pattern'
    | 'onChange'
    | 'disabled'
    | 'textInputProps'
  >;
}

export interface InputOTPGroupProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.InputOTP.Group>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.InputOTP.Group>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}

export interface InputOTPSlotProps {
  className?: string;
  index: number;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.InputOTP.Slot>,
    'children' | 'className' | 'ref' | 'asChild' | 'index'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.InputOTP.Slot>,
    'children' | 'className' | 'ref' | 'asChild' | 'index'
  >;
}

export interface InputOTPSeparatorProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.InputOTP.Separator>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.InputOTP.Separator>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}
