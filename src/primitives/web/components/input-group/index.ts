/*
 * Derived from heroui-react/packages/react/src/components/input-group/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {
  InputGroupInput,
  InputGroupPrefix,
  InputGroupRoot,
  InputGroupSuffix,
  InputGroupTextArea,
} from "./input-group.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const InputGroup = Object.assign(InputGroupRoot, {
  Root: InputGroupRoot,
  Input: InputGroupInput,
  TextArea: InputGroupTextArea,
  Prefix: InputGroupPrefix,
  Suffix: InputGroupSuffix,
});

export type InputGroup = {
  Props: ComponentProps<typeof InputGroupRoot>;
  RootProps: ComponentProps<typeof InputGroupRoot>;
  InputProps: ComponentProps<typeof InputGroupInput>;
  TextAreaProps: ComponentProps<typeof InputGroupTextArea>;
  PrefixProps: ComponentProps<typeof InputGroupPrefix>;
  SuffixProps: ComponentProps<typeof InputGroupSuffix>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {InputGroupInput, InputGroupPrefix, InputGroupRoot, InputGroupSuffix, InputGroupTextArea};

export type {
  InputGroupRootProps,
  InputGroupRootProps as InputGroupProps,
  InputGroupInputProps,
  InputGroupTextAreaProps,
  InputGroupPrefixProps,
  InputGroupSuffixProps,
} from "./input-group.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {inputGroupVariants} from "../../../../styles/web/index.js";

export type {InputGroupVariants} from "../../../../styles/web/index.js";
