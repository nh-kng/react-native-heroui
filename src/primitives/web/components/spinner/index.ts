/*
 * Derived from heroui-react/packages/react/src/components/spinner/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {SpinnerRoot} from "./spinner.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Spinner = Object.assign(SpinnerRoot, {
  Root: SpinnerRoot,
});

export type Spinner = {
  Props: ComponentProps<typeof SpinnerRoot>;
  RootProps: ComponentProps<typeof SpinnerRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {SpinnerRoot};

export type {SpinnerRootProps, SpinnerRootProps as SpinnerProps} from "./spinner.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {spinnerVariants} from "../../../../styles/web/index.js";

export type {SpinnerVariants} from "../../../../styles/web/index.js";
