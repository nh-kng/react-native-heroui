/*
 * Derived from heroui-react/packages/react/src/components/field-error/field-error.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import type {ComponentPropsWithRef} from "react";
import {FieldError as FieldErrorPrimitive} from "react-aria-components/FieldError";

import type {FieldErrorVariants} from '../../../../styles/web/components/field-error/field-error.styles.js';
import {fieldErrorVariants} from '../../../../styles/web/components/field-error/field-error.styles.js';
import {composeTwRenderProps} from "../../utils/compose.js";

/* -------------------------------------------------------------------------------------------------
 * Field Error Root
 * -----------------------------------------------------------------------------------------------*/
interface FieldErrorRootProps
  extends ComponentPropsWithRef<typeof FieldErrorPrimitive>, FieldErrorVariants {}

const FieldErrorRoot = ({children, className, ...rest}: FieldErrorRootProps) => {
  return (
    <FieldErrorPrimitive
      data-visible
      className={composeTwRenderProps(className, fieldErrorVariants())}
      data-slot="field-error"
      {...rest}
    >
      {(renderProps) => (typeof children === "function" ? children(renderProps) : children)}
    </FieldErrorPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {FieldErrorRoot};

export type {FieldErrorRootProps};
