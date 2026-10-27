import type { InputRootProps as WebInputRootProps } from '@heroui/react/input';
import { Input as NativeInput, type InputProps as NativeInputProps, type InputRef } from 'heroui-native/input';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { KeyboardTypeOptions } from 'react-native';

type InputOwnedProps = 'className' | 'defaultValue' | 'isDisabled' | 'isInvalid' | 'onChangeText' | 'placeholder' | 'secureTextEntry' | 'value' | 'keyboardType' | 'variant';

export type InputNativeProps = Omit<NativeInputProps, InputOwnedProps | 'keyboardType' | 'ref'>;
export type InputWebProps = Omit<WebInputRootProps, InputOwnedProps | 'onChange' | 'type' | 'inputMode' | 'disabled' | 'aria-invalid' | 'ref'>;

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

export type InputComponentRef = InputRef;

const InputRoot: ForwardRefExoticComponent<InputProps & RefAttributes<InputRef>> = forwardRef<InputRef, InputProps>(function InputRoot(
  {
    className,
    defaultValue,
    isDisabled,
    isInvalid,
    keyboardType,
    nativeProps,
    onChangeText,
    placeholder,
    secureTextEntry,
    value,
    variant,
    webProps: _webProps,
  },
  ref,
) {
  return (
    <NativeInput
      {...nativeProps}
      ref={ref}
      className={className}
      defaultValue={defaultValue}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      value={value}
      variant={variant}
    />
  );
});

type InputComponent = typeof InputRoot & { Root: typeof InputRoot };

export const Input: InputComponent = Object.assign(InputRoot, {
  Root: InputRoot,
});

