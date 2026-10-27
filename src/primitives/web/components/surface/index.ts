/*
 * Derived from heroui-react/packages/react/src/components/surface/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {SurfaceRoot} from "./surface.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Surface = Object.assign(SurfaceRoot, {
  Root: SurfaceRoot,
});

export type Surface = {
  Props: ComponentProps<typeof SurfaceRoot>;
  RootProps: ComponentProps<typeof SurfaceRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {SurfaceRoot} from "./surface.js";

export type {SurfaceRootProps, SurfaceRootProps as SurfaceProps} from "./surface.js";

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/
export {SurfaceContext} from "./surface.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {surfaceVariants} from "../../../../styles/web/index.js";

export type {SurfaceVariants} from "../../../../styles/web/index.js";
