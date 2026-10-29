/*
 * Derived from heroui-react/packages/react/src/components/radio/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {RadioContent, RadioControl, RadioIndicator, RadioRoot} from "./radio.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Radio = Object.assign(RadioRoot, {
  Root: RadioRoot,
  Content: RadioContent,
  Control: RadioControl,
  Indicator: RadioIndicator,
});

export type Radio = {
  Props: ComponentProps<typeof RadioRoot>;
  RootProps: ComponentProps<typeof RadioRoot>;
  ContentProps: ComponentProps<typeof RadioContent>;
  ControlProps: ComponentProps<typeof RadioControl>;
  IndicatorProps: ComponentProps<typeof RadioIndicator>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {RadioContent, RadioControl, RadioIndicator, RadioRoot};

export type {
  RadioRootProps,
  RadioRootProps as RadioProps,
  RadioContentProps,
  RadioControlProps,
  RadioIndicatorProps,
  RadioFieldRenderProps,
  RadioButtonRenderProps,
} from "./radio.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {radioVariants} from "../../../../styles/web/index.js";

export type {RadioVariants} from "../../../../styles/web/index.js";
