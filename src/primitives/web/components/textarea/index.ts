/*
 * Derived from heroui-react/packages/react/src/components/textarea/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {TextAreaRoot} from "./textarea.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const TextArea = Object.assign(TextAreaRoot, {
  Root: TextAreaRoot,
});

export type TextArea = {
  Props: ComponentProps<typeof TextAreaRoot>;
  RootProps: ComponentProps<typeof TextAreaRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {TextAreaRoot};

export type {TextAreaRootProps, TextAreaRootProps as TextAreaProps} from "./textarea.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {textAreaVariants} from "../../../../styles/web/index.js";

export type {TextAreaVariants} from "../../../../styles/web/index.js";
