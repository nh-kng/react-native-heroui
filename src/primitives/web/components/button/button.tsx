/*
 * Derived from heroui-react/packages/react/src/components/button/button.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import type {ComponentPropsWithRef} from "react";
import {use} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";

import {buttonVariants} from '../../../../styles/web/components/button/button.styles.js';
import type {ButtonVariants} from '../../../../styles/web/components/button/button.styles.js';
import { composeTwRenderProps } from '../../utils/compose.js';
import {BUTTON_GROUP_CHILD, ButtonGroupContext} from "../button-group/index.js";

/* -------------------------------------------------------------------------------------------------
 * Button Root
 * -----------------------------------------------------------------------------------------------*/
interface ButtonRootProps extends ComponentPropsWithRef<typeof ButtonPrimitive>, ButtonVariants {
  [BUTTON_GROUP_CHILD]?: boolean;
}

const ButtonRoot = ({
  children,
  className,
  fullWidth,
  isDisabled,
  isIconOnly,
  size,
  slot,
  style,
  variant,
  [BUTTON_GROUP_CHILD]: isButtonGroupChild,
  ...rest
}: ButtonRootProps) => {
  const buttonGroupContext = use(ButtonGroupContext);

  // Only use context if this button is a direct child of ButtonGroup
  const shouldUseContext = isButtonGroupChild === true;

  // Merge props with precedence: direct props > context props
  const finalSize = size ?? (shouldUseContext ? buttonGroupContext?.size : undefined);
  const finalVariant = variant ?? (shouldUseContext ? buttonGroupContext?.variant : undefined);
  const finalIsDisabled =
    isDisabled ?? (shouldUseContext ? buttonGroupContext?.isDisabled : undefined);
  const finalFullWidth =
    fullWidth ?? (shouldUseContext ? buttonGroupContext?.fullWidth : undefined);

  const styles = buttonVariants({
    fullWidth: finalFullWidth,
    isIconOnly,
    size: finalSize,
    variant: finalVariant,
  });

  return (
    <ButtonPrimitive
      className={composeTwRenderProps(className, styles)}
      data-slot="button"
      isDisabled={finalIsDisabled}
      slot={slot}
      style={style}
      {...rest}
    >
      {(renderProps) => (typeof children === "function" ? children(renderProps) : children)}
    </ButtonPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ButtonRoot};

export type {ButtonRootProps};
