import { forwardRef, type ComponentRef } from 'react';

import type {
  InputOTPProps,
  InputOTPGroupProps,
  InputOTPSlotProps,
  InputOTPSeparatorProps,
} from './input-otp.types.js';
import * as N from '../../primitives/native/components/input-otp/index.js';
export type * from './input-otp.types.js';

export type InputOTPRootRef = ComponentRef<typeof N.InputOTP>;
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
  const Target = N.InputOTP;
  return (
    <Target
      {...nativeProps}
      ref={ref}
      className={className}
      value={value}
      defaultValue={defaultValue}
      onChange={onChangeText}
      maxLength={maxLength}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      onComplete={onComplete}
      pattern={pattern}>
      {children}
    </Target>
  );
});

export type InputOTPGroupRef = ComponentRef<typeof N.InputOTP.Group>;
const InputOTPGroup = forwardRef<InputOTPGroupRef, InputOTPGroupProps>(function InputOTPGroup(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = N.InputOTP.Group;
  return (
    <Target {...nativeProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type InputOTPSlotRef = ComponentRef<typeof N.InputOTP.Slot>;
const InputOTPSlot = forwardRef<InputOTPSlotRef, InputOTPSlotProps>(function InputOTPSlot(
  { className, index, webProps, nativeProps },
  ref
) {
  const Target = N.InputOTP.Slot;
  return (
    <Target {...nativeProps} ref={ref} className={className} index={index}>
      <N.InputOTP.SlotValue />
      <N.InputOTP.SlotCaret />
    </Target>
  );
});

export type InputOTPSeparatorRef = ComponentRef<typeof N.InputOTP.Separator>;
const InputOTPSeparator = forwardRef<InputOTPSeparatorRef, InputOTPSeparatorProps>(
  function InputOTPSeparator({ children, className, webProps, nativeProps }, ref) {
    const Target = N.InputOTP.Separator;
    return (
      <Target {...nativeProps} ref={ref} className={className}>
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
