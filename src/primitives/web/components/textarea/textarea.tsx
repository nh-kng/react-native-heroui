/*
 * Derived from heroui-react/packages/react/src/components/textarea/textarea.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import type {ComponentPropsWithRef} from "react";
import {use} from "react";
import {TextArea as TextAreaPrimitive} from "react-aria-components/TextArea";

import {textAreaVariants} from "../../../../styles/web/index.js";
import type {TextAreaVariants} from "../../../../styles/web/index.js";
import {composeTwRenderProps} from "../../utils/index.js";
import {TextFieldContext} from "../textfield/index.js";

/* -------------------------------------------------------------------------------------------------
 * TextArea Root
 * -----------------------------------------------------------------------------------------------*/
interface TextAreaRootProps
  extends ComponentPropsWithRef<typeof TextAreaPrimitive>, TextAreaVariants {}

const TextAreaRoot = ({className, fullWidth, variant, ...rest}: TextAreaRootProps) => {
  const textFieldContext = use(TextFieldContext);
  const resolvedVariant = variant ?? textFieldContext?.variant;

  return (
    <TextAreaPrimitive
      data-slot="textarea"
      className={composeTwRenderProps(
        className,
        textAreaVariants({fullWidth, variant: resolvedVariant}),
      )}
      {...rest}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TextAreaRoot};

export type {TextAreaRootProps};
