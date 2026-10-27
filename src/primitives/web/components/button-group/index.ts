/*
 * Derived from heroui-react/packages/react/src/components/button-group/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {ButtonGroupRoot, ButtonGroupSeparator} from "./button-group.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ButtonGroup = Object.assign(ButtonGroupRoot, {
  Root: ButtonGroupRoot,
  Separator: ButtonGroupSeparator,
});

export type ButtonGroup = {
  Props: ComponentProps<typeof ButtonGroupRoot>;
  RootProps: ComponentProps<typeof ButtonGroupRoot>;
  SeparatorProps: ComponentProps<typeof ButtonGroupSeparator>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ButtonGroupRoot, ButtonGroupSeparator};

export type {
  ButtonGroupRootProps,
  ButtonGroupRootProps as ButtonGroupProps,
  ButtonGroupSeparatorProps,
} from "./button-group.js";

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/
export {ButtonGroupContext, BUTTON_GROUP_CHILD} from "./button-group.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {buttonGroupVariants} from "../../../../styles/web/index.js";

export type {ButtonGroupVariants} from "../../../../styles/web/index.js";
