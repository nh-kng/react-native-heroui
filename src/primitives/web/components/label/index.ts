/*
 * Derived from heroui-react/packages/react/src/components/label/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {LabelRoot} from "./label.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Label = Object.assign(LabelRoot, {
  Root: LabelRoot,
});

export type Label = {
  Props: ComponentProps<typeof LabelRoot>;
  RootProps: ComponentProps<typeof LabelRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {LabelRoot};

export type {LabelRootProps, LabelRootProps as LabelProps} from "./label.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {labelVariants} from "../../../../styles/web/index.js";

export type {LabelVariants} from "../../../../styles/web/index.js";
