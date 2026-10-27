import type { KeyboardTypeOptions } from 'react-native';

import type { InputProps as NativeInputProps } from '../../primitives/native/components/input/index.js';
import type { InputRootProps as WebInputRootProps } from '../../primitives/web/components/input/index.js';

type InputOwnedProps =
  | 'className'
  | 'defaultValue'
  | 'isDisabled'
  | 'isInvalid'
  | 'onChangeText'
  | 'placeholder'
  | 'secureTextEntry'
  | 'value'
  | 'keyboardType'
  | 'variant';

export type InputWebProps = Omit<
  WebInputRootProps,
  InputOwnedProps | 'onChange' | 'type' | 'inputMode' | 'disabled' | 'aria-invalid' | 'ref'
>;

export type InputNativeProps = Omit<
  NativeInputProps,
  InputOwnedProps | 'editable' | 'readOnly' | 'ref'
>;

export interface InputProps {
  className?: string;
  defaultValue?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  keyboardType?: KeyboardTypeOptions;
  nativeProps?: InputNativeProps;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  variant?: NonNullable<NativeInputProps['variant']> & NonNullable<WebInputRootProps['variant']>;
  webProps?: InputWebProps;
}
