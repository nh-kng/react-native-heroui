/*
 * Derived from heroui-react/packages/react/src/components/description/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {DescriptionRoot} from "./description.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Description = Object.assign(DescriptionRoot, {
  Root: DescriptionRoot,
});

export type Description = {
  Props: ComponentProps<typeof DescriptionRoot>;
  RootProps: ComponentProps<typeof DescriptionRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {DescriptionRoot};

export type {DescriptionRootProps, DescriptionRootProps as DescriptionProps} from "./description.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {descriptionVariants} from "../../../../styles/web/index.js";

export type {DescriptionVariants} from "../../../../styles/web/index.js";
