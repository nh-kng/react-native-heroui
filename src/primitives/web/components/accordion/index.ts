/*
 * Derived from heroui-react/packages/react/src/components/accordion/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {
  AccordionBody,
  AccordionHeading,
  AccordionIndicator,
  AccordionItem,
  AccordionPanel,
  AccordionRoot,
  AccordionTrigger,
} from "./accordion.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Heading: AccordionHeading,
  Trigger: AccordionTrigger,
  Panel: AccordionPanel,
  Indicator: AccordionIndicator,
  Body: AccordionBody,
});

export type Accordion = {
  Props: ComponentProps<typeof AccordionRoot>;
  RootProps: ComponentProps<typeof AccordionRoot>;
  ItemProps: ComponentProps<typeof AccordionItem>;
  HeadingProps: ComponentProps<typeof AccordionHeading>;
  TriggerProps: ComponentProps<typeof AccordionTrigger>;
  PanelProps: ComponentProps<typeof AccordionPanel>;
  IndicatorProps: ComponentProps<typeof AccordionIndicator>;
  BodyProps: ComponentProps<typeof AccordionBody>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  AccordionRoot,
  AccordionItem,
  AccordionHeading,
  AccordionTrigger,
  AccordionPanel,
  AccordionIndicator,
  AccordionBody,
};

export type {
  AccordionRootProps,
  AccordionRootProps as AccordionProps,
  AccordionItemProps,
  AccordionHeadingProps,
  AccordionTriggerProps,
  AccordionPanelProps,
  AccordionIndicatorProps,
  AccordionBodyProps,
} from "./accordion.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {accordionVariants} from "../../../../styles/web/index.js";

export type {AccordionVariants} from "../../../../styles/web/index.js";
