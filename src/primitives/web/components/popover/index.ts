/*
 * Derived from heroui-react/packages/react/src/components/popover/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {
  PopoverArrow,
  PopoverContent,
  PopoverDialog,
  PopoverHeading,
  PopoverRoot,
  PopoverTrigger,
} from "./popover.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Popover = Object.assign(PopoverRoot, {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Dialog: PopoverDialog,
  Arrow: PopoverArrow,
  Content: PopoverContent,
  Heading: PopoverHeading,
});

export type Popover = {
  Props: ComponentProps<typeof PopoverRoot>;
  RootProps: ComponentProps<typeof PopoverRoot>;
  TriggerProps: ComponentProps<typeof PopoverTrigger>;
  DialogProps: ComponentProps<typeof PopoverDialog>;
  ArrowProps: ComponentProps<typeof PopoverArrow>;
  ContentProps: ComponentProps<typeof PopoverContent>;
  HeadingProps: ComponentProps<typeof PopoverHeading>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {PopoverArrow, PopoverContent, PopoverDialog, PopoverHeading, PopoverRoot, PopoverTrigger};

export type {
  PopoverRootProps,
  PopoverRootProps as PopoverProps,
  PopoverTriggerProps,
  PopoverDialogProps,
  PopoverArrowProps,
  PopoverContentProps,
  PopoverHeadingProps,
} from "./popover.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {popoverVariants} from "../../../../styles/web/index.js";

export type {PopoverVariants} from "../../../../styles/web/index.js";
