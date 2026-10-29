/*
 * Derived from heroui-react/packages/react/src/components/radio-group/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {RadioGroupRoot} from "./radio-group.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const RadioGroup = Object.assign(RadioGroupRoot, {
  Root: RadioGroupRoot,
});

export type RadioGroup = {
  Props: ComponentProps<typeof RadioGroupRoot>;
  RootProps: ComponentProps<typeof RadioGroupRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {RadioGroupRoot};

export type {RadioGroupRootProps, RadioGroupRootProps as RadioGroupProps} from "./radio-group.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {radioGroupVariants} from "../../../../styles/web/index.js";

export type {RadioGroupVariants} from "../../../../styles/web/index.js";
