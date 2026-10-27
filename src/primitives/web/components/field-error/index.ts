/*
 * Derived from heroui-react/packages/react/src/components/field-error/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {FieldErrorRoot} from "./field-error.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const FieldError = Object.assign(FieldErrorRoot, {
  Root: FieldErrorRoot,
});

export type FieldError = {
  Props: ComponentProps<typeof FieldErrorRoot>;
  RootProps: ComponentProps<typeof FieldErrorRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {FieldErrorRoot};

export type {FieldErrorRootProps, FieldErrorRootProps as FieldErrorProps} from "./field-error.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {fieldErrorVariants} from "../../../../styles/web/index.js";

export type {FieldErrorVariants} from "../../../../styles/web/index.js";
