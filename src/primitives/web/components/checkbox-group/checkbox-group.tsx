/*
 * Derived from heroui-react/packages/react/src/components/checkbox-group/checkbox-group.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import type {ComponentPropsWithRef} from "react";
import React, {createContext} from "react";
import {CheckboxGroup as CheckboxGroupPrimitive} from "react-aria-components/CheckboxGroup";

import {checkboxGroupVariants} from "../../../../styles/web/index.js";
import type {CheckboxGroupVariants} from "../../../../styles/web/index.js";
import {composeTwRenderProps} from "../../utils/compose.js";
import type {CheckboxVariants} from "../checkbox/index.js";

/* -------------------------------------------------------------------------------------------------
 * CheckboxGroup Context
 * -----------------------------------------------------------------------------------------------*/
interface CheckboxGroupContext {
  variant?: CheckboxVariants["variant"];
}

const CheckboxGroupContext = createContext<CheckboxGroupContext>({});

interface CheckboxGroupProps
  extends ComponentPropsWithRef<typeof CheckboxGroupPrimitive>, CheckboxGroupVariants {}

const CheckboxGroup = ({children, className, variant, ...props}: CheckboxGroupProps) => {
  const styles = React.useMemo(() => checkboxGroupVariants({variant}), [variant]);

  return (
    <CheckboxGroupContext.Provider value={{variant}}>
      <CheckboxGroupPrimitive
        className={composeTwRenderProps(className, styles)}
        data-slot="checkbox-group"
        {...props}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </CheckboxGroupPrimitive>
    </CheckboxGroupContext.Provider>
  );
};

export {CheckboxGroup, CheckboxGroupContext};
export type {CheckboxGroupProps};
