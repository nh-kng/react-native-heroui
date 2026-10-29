/*
 * Derived from heroui-react/packages/react/src/components/separator/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {SeparatorRoot} from "./separator.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Separator = Object.assign(SeparatorRoot, {
  Root: SeparatorRoot,
});

export type Separator = {
  Props: ComponentProps<typeof SeparatorRoot>;
  RootProps: ComponentProps<typeof SeparatorRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {SeparatorRoot};

export type {SeparatorRootProps, SeparatorRootProps as SeparatorProps} from "./separator.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {separatorVariants} from "../../../../styles/web/index.js";

export type {SeparatorVariants} from "../../../../styles/web/index.js";
