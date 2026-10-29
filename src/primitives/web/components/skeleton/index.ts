/*
 * Derived from heroui-react/packages/react/src/components/skeleton/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {SkeletonRoot} from "./skeleton.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Skeleton = Object.assign(SkeletonRoot, {
  Root: SkeletonRoot,
});

export type Skeleton = {
  Props: ComponentProps<typeof SkeletonRoot>;
  RootProps: ComponentProps<typeof SkeletonRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {SkeletonRoot};

export type {SkeletonRootProps, SkeletonRootProps as SkeletonProps} from "./skeleton.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {skeletonVariants} from "../../../../styles/web/index.js";

export type {SkeletonVariants} from "../../../../styles/web/index.js";
