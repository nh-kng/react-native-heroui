/*
 * Derived from heroui-react/packages/react/src/components/select/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {
  SelectClearButton,
  SelectIndicator,
  SelectPopover,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "./select.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Select = Object.assign(SelectRoot, {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Indicator: SelectIndicator,
  ClearButton: SelectClearButton,
  Popover: SelectPopover,
});

export type Select<T extends object = object> = {
  Props: ComponentProps<typeof SelectRoot<T>>;
  RootProps: ComponentProps<typeof SelectRoot<T>>;
  TriggerProps: ComponentProps<typeof SelectTrigger>;
  ValueProps: ComponentProps<typeof SelectValue>;
  IndicatorProps: ComponentProps<typeof SelectIndicator>;
  ClearButtonProps: ComponentProps<typeof SelectClearButton>;
  PopoverProps: ComponentProps<typeof SelectPopover>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {SelectClearButton, SelectIndicator, SelectPopover, SelectRoot, SelectTrigger, SelectValue};

export type {
  SelectRootProps,
  SelectRootProps as SelectProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectIndicatorProps,
  SelectClearButtonProps,
  SelectPopoverProps,
} from "./select.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {selectVariants} from "../../../../styles/web/index.js";

export type {SelectVariants} from "../../../../styles/web/index.js";
