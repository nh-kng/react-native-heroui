/*
 * Derived from heroui-react/packages/react/src/components/close-button/close-button.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import type {ComponentPropsWithRef} from "react";
import {useMemo} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";

import {closeButtonVariants} from "../../../../styles/web/index.js";
import type {CloseButtonVariants} from "../../../../styles/web/index.js";
import {composeTwRenderProps} from "../../utils/index.js";
import {CloseIcon} from "../icons.js";

/* -------------------------------------------------------------------------------------------------
 * Close Button Root
 * -----------------------------------------------------------------------------------------------*/
interface CloseButtonRootProps
  extends ComponentPropsWithRef<typeof ButtonPrimitive>, CloseButtonVariants {}

const CloseButtonRoot = ({
  children,
  className,
  slot,
  style,
  variant,
  ...rest
}: CloseButtonRootProps) => {
  const styles = useMemo(() => closeButtonVariants({variant}), [variant]);

  return (
    <ButtonPrimitive
      aria-label="Close"
      className={composeTwRenderProps(className, styles)}
      data-slot="close-button"
      slot={slot}
      style={style}
      type="button"
      {...rest}
    >
      {(renderProps) =>
        typeof children === "function"
          ? children(renderProps)
          : (children ?? <CloseIcon data-slot="close-button-icon" />)
      }
    </ButtonPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {CloseButtonRoot};

export type {CloseButtonRootProps};
