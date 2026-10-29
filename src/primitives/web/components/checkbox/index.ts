/*
 * Derived from heroui-react/packages/react/src/components/checkbox/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {CheckboxContent, CheckboxControl, CheckboxIndicator, CheckboxRoot} from "./checkbox.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Checkbox = Object.assign(CheckboxRoot, {
  Root: CheckboxRoot,
  Content: CheckboxContent,
  Control: CheckboxControl,
  Indicator: CheckboxIndicator,
});

export type Checkbox = {
  Props: ComponentProps<typeof CheckboxRoot>;
  RootProps: ComponentProps<typeof CheckboxRoot>;
  ContentProps: ComponentProps<typeof CheckboxContent>;
  ControlProps: ComponentProps<typeof CheckboxControl>;
  IndicatorProps: ComponentProps<typeof CheckboxIndicator>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {CheckboxContent, CheckboxControl, CheckboxIndicator, CheckboxRoot};

export type {
  CheckboxRootProps,
  CheckboxRootProps as CheckboxProps,
  CheckboxContentProps,
  CheckboxControlProps,
  CheckboxIndicatorProps,
  CheckboxFieldRenderProps,
  CheckboxButtonRenderProps,
  /** @deprecated Use {@link CheckboxFieldRenderProps} for the root render prop, or {@link CheckboxButtonRenderProps} for content/control/indicator. */
  CheckboxFieldRenderProps as CheckboxRenderProps,
} from "./checkbox.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {checkboxVariants} from "../../../../styles/web/index.js";

export type {CheckboxVariants} from "../../../../styles/web/index.js";
