/*
 * Derived from heroui-react/packages/react/src/components/button/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {ButtonRoot} from "./button.js";
import {BUTTON_GROUP_CHILD} from "../button-group/index.js";


/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Button = Object.assign(ButtonRoot, {
  Root: ButtonRoot,
});

export type Button = {
  Props: ComponentProps<typeof ButtonRoot>;
  RootProps: ComponentProps<typeof ButtonRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ButtonRoot};

export type {ButtonRootProps, ButtonRootProps as ButtonProps} from "./button.js";

/* -------------------------------------------------------------------------------------------------
 * Re-export BUTTON_GROUP_CHILD for type declarations
 * -----------------------------------------------------------------------------------------------*/
export {BUTTON_GROUP_CHILD};

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {buttonVariants} from "../../../../styles/web/index.js";

export type {ButtonVariants} from "../../../../styles/web/index.js";
