/*
 * Derived from heroui-react/packages/react/src/components/alert/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {AlertContent, AlertDescription, AlertIndicator, AlertRoot, AlertTitle} from "./alert.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Alert = Object.assign(AlertRoot, {
  Root: AlertRoot,
  Indicator: AlertIndicator,
  Content: AlertContent,
  Title: AlertTitle,
  Description: AlertDescription,
});

export type Alert = {
  Props: ComponentProps<typeof AlertRoot>;
  RootProps: ComponentProps<typeof AlertRoot>;
  IndicatorProps: ComponentProps<typeof AlertIndicator>;
  ContentProps: ComponentProps<typeof AlertContent>;
  TitleProps: ComponentProps<typeof AlertTitle>;
  DescriptionProps: ComponentProps<typeof AlertDescription>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {AlertRoot, AlertIndicator, AlertContent, AlertTitle, AlertDescription};

export type {
  AlertRootProps,
  AlertRootProps as AlertProps,
  AlertIndicatorProps,
  AlertContentProps,
  AlertTitleProps,
  AlertDescriptionProps,
} from "./alert.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {alertVariants} from "../../../../styles/web/index.js";

export type {AlertVariants} from "../../../../styles/web/index.js";
