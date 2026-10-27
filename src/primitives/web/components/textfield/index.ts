/*
 * Derived from heroui-react/packages/react/src/components/textfield/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {TextFieldRoot} from "./textfield.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const TextField = Object.assign(TextFieldRoot, {
  Root: TextFieldRoot,
});

export type TextField = {
  Props: ComponentProps<typeof TextFieldRoot>;
  RootProps: ComponentProps<typeof TextFieldRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {TextFieldRoot};

export type {TextFieldRootProps, TextFieldRootProps as TextFieldProps} from "./textfield.js";

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/
export {TextFieldContext} from "./textfield.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {textFieldVariants} from "../../../../styles/web/index.js";

export type {TextFieldVariants} from "../../../../styles/web/index.js";
