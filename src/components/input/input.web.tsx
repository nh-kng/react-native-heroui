import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { keyboardTypeToInputMode } from './input-mapping.js';
import type { InputProps } from './input.types.js';
import { Input as WebInput } from '../../primitives/web/components/input/index.js';
export type { InputNativeProps, InputProps, InputWebProps } from './input.types.js';

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
  ref
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
