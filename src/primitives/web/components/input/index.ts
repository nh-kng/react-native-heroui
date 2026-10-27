/*
 * Derived from heroui-react/packages/react/src/components/input/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {InputRoot} from "./input.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Input = Object.assign(InputRoot, {
  Root: InputRoot,
});

export type Input = {
  Props: ComponentProps<typeof InputRoot>;
  RootProps: ComponentProps<typeof InputRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {InputRoot};

export type {InputRootProps, InputRootProps as InputProps} from "./input.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {inputVariants} from "../../../../styles/web/index.js";

export type {InputVariants} from "../../../../styles/web/index.js";
