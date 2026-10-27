import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';

import type { InputProps } from './input.types.js';
import {
  Input as NativeInput,
  type InputRef,
} from '../../primitives/native/components/input/index.js';
export type { InputNativeProps, InputProps, InputWebProps } from './input.types.js';

export type InputComponentRef = InputRef;

const InputRoot: ForwardRefExoticComponent<InputProps & RefAttributes<InputRef>> = forwardRef<
  InputRef,
  InputProps
>(function InputRoot(
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
  ref
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
