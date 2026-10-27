/*
 * Derived from heroui-react/packages/react/src/components/input/input.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import type {ComponentPropsWithRef} from "react";
import {use} from "react";
import {Input as InputPrimitive} from "react-aria-components/Input";

import {inputVariants} from '../../../../styles/web/components/input/input.styles.js';
import type {InputVariants} from '../../../../styles/web/components/input/input.styles.js';
import { composeTwRenderProps } from '../../utils/compose.js';
import {ComboBoxContext} from "../combo-box/index.js";
import {TextFieldContext} from "../textfield/index.js";

/* -------------------------------------------------------------------------------------------------
 * Input Root
 * -----------------------------------------------------------------------------------------------*/
interface InputRootProps extends ComponentPropsWithRef<typeof InputPrimitive>, InputVariants {}

const InputRoot = ({className, fullWidth, variant: variantProp, ...rest}: InputRootProps) => {
  const textFieldContext = use(TextFieldContext);
  const comboBoxContext = use(ComboBoxContext);

  // Use variant from context if not explicitly provided
  const variant = variantProp ?? textFieldContext.variant ?? comboBoxContext.variant;

  return (
    <InputPrimitive
      className={composeTwRenderProps(className, inputVariants({fullWidth, variant}))}
      data-slot="input"
      {...rest}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {InputRoot};

export type {InputRootProps};
