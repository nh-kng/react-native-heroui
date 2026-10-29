import { forwardRef, type ComponentRef } from 'react';

import type {
  InputOTPProps,
  InputOTPGroupProps,
  InputOTPSlotProps,
  InputOTPSeparatorProps,
} from './input-otp.types.js';
import * as W from '../../primitives/web/components/input-otp/index.js';
import { useControllableValue } from '../shared/use-controllable-value.js';
export type * from './input-otp.types.js';

export type InputOTPRootRef = ComponentRef<typeof W.InputOTP>;
const InputOTPRoot = forwardRef<InputOTPRootRef, InputOTPProps>(function InputOTPRoot(
  {
    children,
    className,
    value,
    defaultValue,
    onChangeText,
    maxLength,
    isDisabled,
    isInvalid,
    onComplete,
    pattern,
    webProps,
    nativeProps,
  },
  ref
) {
  const Target = W.InputOTP;
  const [current, change] = useControllableValue(value, defaultValue ?? '', onChangeText);
  return (
    <Target
      {...webProps}
      ref={ref}
      className={className}
      value={current}
      onChange={change}
      maxLength={maxLength}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      onComplete={onComplete}
      pattern={pattern}>
      {children}
    </Target>
  );
});

export type InputOTPGroupRef = ComponentRef<typeof W.InputOTP.Group>;
const InputOTPGroup = forwardRef<InputOTPGroupRef, InputOTPGroupProps>(function InputOTPGroup(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = W.InputOTP.Group;
  return (
    <Target {...webProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type InputOTPSlotRef = ComponentRef<typeof W.InputOTP.Slot>;
const InputOTPSlot = forwardRef<InputOTPSlotRef, InputOTPSlotProps>(function InputOTPSlot(
  { className, index, webProps, nativeProps },
  ref
) {
  const Target = W.InputOTP.Slot;
  return <Target {...webProps} ref={ref} className={className} index={index} />;
});

export type InputOTPSeparatorRef = ComponentRef<typeof W.InputOTP.Separator>;
const InputOTPSeparator = forwardRef<InputOTPSeparatorRef, InputOTPSeparatorProps>(
  function InputOTPSeparator({ children, className, webProps, nativeProps }, ref) {
    const Target = W.InputOTP.Separator;
    return (
      <Target {...webProps} ref={ref} className={className}>
        {children}
      </Target>
    );
  }
);

export const InputOTP = Object.assign(InputOTPRoot, {
  Root: InputOTPRoot,
  Group: InputOTPGroup,
  Slot: InputOTPSlot,
  Separator: InputOTPSeparator,
});
