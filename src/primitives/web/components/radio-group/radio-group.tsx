/*
 * Derived from heroui-react/packages/react/src/components/radio-group/radio-group.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import type {ComponentPropsWithRef} from "react";
import React from "react";
import {RadioGroup as RadioGroupPrimitive} from "react-aria-components/RadioGroup";

import {radioGroupVariants} from "../../../../styles/web/index.js";
import type {RadioGroupVariants} from "../../../../styles/web/index.js";
import {composeTwRenderProps} from "../../utils/compose.js";

/* -------------------------------------------------------------------------------------------------
 * Radio Group Root
 * -----------------------------------------------------------------------------------------------*/
interface RadioGroupRootProps
  extends ComponentPropsWithRef<typeof RadioGroupPrimitive>, RadioGroupVariants {}

const RadioGroupRoot = ({children, className, variant, ...props}: RadioGroupRootProps) => {
  const styles = React.useMemo(() => radioGroupVariants({variant}), [variant]);

  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      {...props}
      className={composeTwRenderProps(className, styles)}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </RadioGroupPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {RadioGroupRoot};

export type {RadioGroupRootProps};
