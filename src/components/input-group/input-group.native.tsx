import { forwardRef, type ComponentRef } from 'react';

import type {
  InputGroupProps,
  InputGroupInputProps,
  InputGroupPrefixProps,
  InputGroupSuffixProps,
} from './input-group.types.js';
import * as N from '../../primitives/native/components/input-group/index.js';
export type * from './input-group.types.js';

export type InputGroupRootRef = ComponentRef<typeof N.InputGroup>;
const InputGroupRoot = forwardRef<InputGroupRootRef, InputGroupProps>(function InputGroupRoot(
  { children, className, isDisabled, webProps, nativeProps },
  ref
) {
  const Target = N.InputGroup;
  return (
    <Target {...nativeProps} ref={ref} className={className} isDisabled={isDisabled}>
      {children}
    </Target>
  );
});

export type InputGroupInputRef = ComponentRef<typeof N.InputGroup.Input>;
const InputGroupInput = forwardRef<InputGroupInputRef, InputGroupInputProps>(
  function InputGroupInput(
    {
      className,
      value,
      defaultValue,
      onChangeText,
      placeholder,
      isDisabled,
      isInvalid,
      webProps,
      nativeProps,
    },
    ref
  ) {
    const Target = N.InputGroup.Input;
    return (
      <Target
        {...nativeProps}
        ref={ref}
        className={className}
        value={value}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
      />
    );
  }
);

export type InputGroupPrefixRef = ComponentRef<typeof N.InputGroup.Prefix>;
const InputGroupPrefix = forwardRef<InputGroupPrefixRef, InputGroupPrefixProps>(
  function InputGroupPrefix({ children, className, webProps, nativeProps }, ref) {
    const Target = N.InputGroup.Prefix;
    return (
      <Target {...nativeProps} ref={ref} className={className}>
        {children}
      </Target>
    );
  }
);

export type InputGroupSuffixRef = ComponentRef<typeof N.InputGroup.Suffix>;
const InputGroupSuffix = forwardRef<InputGroupSuffixRef, InputGroupSuffixProps>(
  function InputGroupSuffix({ children, className, webProps, nativeProps }, ref) {
    const Target = N.InputGroup.Suffix;
    return (
      <Target {...nativeProps} ref={ref} className={className}>
        {children}
      </Target>
    );
  }
);

export const InputGroup = Object.assign(InputGroupRoot, {
  Root: InputGroupRoot,
  Input: InputGroupInput,
  Prefix: InputGroupPrefix,
  Suffix: InputGroupSuffix,
});
