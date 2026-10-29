import { forwardRef, type ComponentRef } from 'react';

import type {
  InputGroupProps,
  InputGroupInputProps,
  InputGroupPrefixProps,
  InputGroupSuffixProps,
} from './input-group.types.js';
import * as W from '../../primitives/web/components/input-group/index.js';
import { useWebTextInput } from '../shared/use-web-text-input.js';
export type * from './input-group.types.js';

export type InputGroupRootRef = ComponentRef<typeof W.InputGroup>;
const InputGroupRoot = forwardRef<InputGroupRootRef, InputGroupProps>(function InputGroupRoot(
  { children, className, isDisabled, webProps, nativeProps },
  ref
) {
  const Target = W.InputGroup;
  return (
    <Target {...webProps} ref={ref} className={className} isDisabled={isDisabled}>
      {children}
    </Target>
  );
});

export type InputGroupInputRef = ComponentRef<typeof W.InputGroup.Input>;
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
    const Target = W.InputGroup.Input;
    const valueProps = useWebTextInput<HTMLInputElement>(value, defaultValue, onChangeText);
    return (
      <Target
        {...webProps}
        ref={ref}
        className={className}
        {...valueProps}
        placeholder={placeholder}
        disabled={isDisabled}
        aria-invalid={isInvalid}
      />
    );
  }
);

export type InputGroupPrefixRef = ComponentRef<typeof W.InputGroup.Prefix>;
const InputGroupPrefix = forwardRef<InputGroupPrefixRef, InputGroupPrefixProps>(
  function InputGroupPrefix({ children, className, webProps, nativeProps }, ref) {
    const Target = W.InputGroup.Prefix;
    return (
      <Target {...webProps} ref={ref} className={className}>
        {children}
      </Target>
    );
  }
);

export type InputGroupSuffixRef = ComponentRef<typeof W.InputGroup.Suffix>;
const InputGroupSuffix = forwardRef<InputGroupSuffixRef, InputGroupSuffixProps>(
  function InputGroupSuffix({ children, className, webProps, nativeProps }, ref) {
    const Target = W.InputGroup.Suffix;
    return (
      <Target {...webProps} ref={ref} className={className}>
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
