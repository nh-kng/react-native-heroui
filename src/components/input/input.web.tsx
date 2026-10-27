import { Input as WebInput, type InputRootProps as WebInputRootProps } from '@heroui/react/input';
import type { InputProps as NativeInputProps } from 'heroui-native/input';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';
import type { KeyboardTypeOptions } from 'react-native';

import { keyboardTypeToInputMode } from './input-mapping.js';

type InputOwnedProps = 'className' | 'defaultValue' | 'isDisabled' | 'isInvalid' | 'onChangeText' | 'placeholder' | 'secureTextEntry' | 'value' | 'keyboardType' | 'variant';

export type InputWebProps = Omit<WebInputRootProps, InputOwnedProps | 'onChange' | 'type' | 'inputMode' | 'disabled' | 'aria-invalid' | 'ref'>;
export type InputNativeProps = Omit<NativeInputProps, InputOwnedProps | 'ref'>;

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

export type InputComponentRef = ComponentRef<typeof WebInput.Root>;

const InputRoot = forwardRef<InputComponentRef, InputProps>(function InputRoot(
  {
    className,
    defaultValue,
    isDisabled,
    isInvalid,
    keyboardType,
    nativeProps: _nativeProps,
    onChangeText,
    placeholder,
    secureTextEntry,
    value,
    variant,
    webProps,
  },
  ref,
) {
  return (
    <WebInput.Root
      {...webProps}
      ref={ref}
      aria-invalid={isInvalid}
      className={className}
      defaultValue={defaultValue}
      disabled={isDisabled}
      inputMode={keyboardTypeToInputMode(keyboardType)}
      onChange={onChangeText ? (event) => onChangeText(event.currentTarget.value) : undefined}
      placeholder={placeholder}
      type={secureTextEntry ? 'password' : undefined}
      value={value}
      variant={variant}
    />
  );
});

type InputComponent = typeof InputRoot & { Root: typeof InputRoot };

export const Input: InputComponent = Object.assign(InputRoot, {
  Root: InputRoot,
});

