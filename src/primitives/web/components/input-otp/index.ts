/*
 * Derived from heroui-react/packages/react/src/components/input-otp/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {InputOTPGroup, InputOTPRoot, InputOTPSeparator, InputOTPSlot} from "./input-otp.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const InputOTP = Object.assign(InputOTPRoot, {
  Root: InputOTPRoot,
  Group: InputOTPGroup,
  Slot: InputOTPSlot,
  Separator: InputOTPSeparator,
});

export type InputOTP = {
  Props: ComponentProps<typeof InputOTPRoot>;
  RootProps: ComponentProps<typeof InputOTPRoot>;
  GroupProps: ComponentProps<typeof InputOTPGroup>;
  SlotProps: ComponentProps<typeof InputOTPSlot>;
  SeparatorProps: ComponentProps<typeof InputOTPSeparator>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {InputOTPRoot, InputOTPGroup, InputOTPSlot, InputOTPSeparator};

export type {
  InputOTPRootProps,
  InputOTPRootProps as InputOTPProps,
  InputOTPGroupProps,
  InputOTPSlotProps,
  InputOTPSeparatorProps,
} from "./input-otp.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {inputOTPVariants} from "../../../../styles/web/index.js";

export type {InputOTPVariants} from "../../../../styles/web/index.js";

//  ===================================
// Regular Expressions
//  ===================================
export const REGEXP_ONLY_DIGITS = "^\\d+$";
export const REGEXP_ONLY_CHARS = "^[a-zA-Z]+$";
export const REGEXP_ONLY_DIGITS_AND_CHARS = "^[a-zA-Z0-9]+$";
