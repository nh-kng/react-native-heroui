/*
 * Derived from heroui-react/packages/react/src/components/close-button/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {CloseButtonRoot} from "./close-button.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const CloseButton = Object.assign(CloseButtonRoot, {
  Root: CloseButtonRoot,
});

export type CloseButton = {
  Props: ComponentProps<typeof CloseButtonRoot>;
  RootProps: ComponentProps<typeof CloseButtonRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {CloseButtonRoot};

export type {CloseButtonRootProps, CloseButtonRootProps as CloseButtonProps} from "./close-button.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {closeButtonVariants} from "../../../../styles/web/index.js";

export type {CloseButtonVariants} from "../../../../styles/web/index.js";
