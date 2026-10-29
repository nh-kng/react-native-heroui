/*
 * Derived from heroui-react/packages/react/src/components/scroll-shadow/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {ScrollShadowRoot} from "./scroll-shadow.js";

/* -------------------------------------------------------------------------------------------------
 * Component
 * -----------------------------------------------------------------------------------------------*/
export const ScrollShadow = Object.assign(ScrollShadowRoot, {
  Root: ScrollShadowRoot,
});

export type ScrollShadow = {
  Props: ComponentProps<typeof ScrollShadowRoot>;
  RootProps: ComponentProps<typeof ScrollShadowRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ScrollShadowRoot};

export type {
  ScrollShadowRootProps,
  ScrollShadowRootProps as ScrollShadowProps,
  ScrollShadowVisibility,
} from "./scroll-shadow.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {scrollShadowVariants} from "../../../../styles/web/index.js";

export type {ScrollShadowVariants} from "../../../../styles/web/index.js";

/* -------------------------------------------------------------------------------------------------
 * Hooks
 * -----------------------------------------------------------------------------------------------*/
export {useScrollShadow} from "./use-scroll-shadow.js";

export type {UseScrollShadowProps} from "./use-scroll-shadow.js";
