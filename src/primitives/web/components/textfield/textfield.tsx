/*
 * Derived from heroui-react/packages/react/src/components/textfield/textfield.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import type {ComponentPropsWithRef} from "react";
import React, {createContext} from "react";
import {TextField as TextFieldPrimitive} from "react-aria-components/TextField";

import {textFieldVariants} from '../../../../styles/web/components/textfield/textfield.styles.js';
import type {TextFieldVariants} from '../../../../styles/web/components/textfield/textfield.styles.js';
import {composeTwRenderProps} from "../../utils/compose.js";

/* ------------------------------------------------------------------------------------------------
 * TextField Context
 * --------------------------------------------------------------------------------------------- */
type TextFieldContext = {
  variant?: "primary" | "secondary";
};

const TextFieldContext = createContext<TextFieldContext>({});

/* -------------------------------------------------------------------------------------------------
 * TextField Root
 * -----------------------------------------------------------------------------------------------*/
interface TextFieldRootProps
  extends ComponentPropsWithRef<typeof TextFieldPrimitive>, TextFieldVariants {
  /**
   * The variant of the text field.
   * @default "primary"
   */
  variant?: "primary" | "secondary";
}

const TextFieldRoot = ({children, className, fullWidth, variant, ...props}: TextFieldRootProps) => {
  const styles = React.useMemo(() => textFieldVariants({fullWidth}), [fullWidth]);
  const contextValue = React.useMemo(() => ({variant}), [variant]);

  return (
    <TextFieldPrimitive
      data-slot="textfield"
      {...props}
      className={composeTwRenderProps(className, styles)}
    >
      {(values) => (
        <TextFieldContext value={contextValue}>
          <>{typeof children === "function" ? children(values) : children}</>
        </TextFieldContext>
      )}
    </TextFieldPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TextFieldRoot, TextFieldContext};

export type {TextFieldRootProps};
