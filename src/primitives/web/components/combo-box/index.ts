/*
 * Derived from heroui-react/packages/react/src/components/combo-box/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {
  ComboBoxInputGroup,
  ComboBoxPopover,
  ComboBoxRoot,
  ComboBoxTrigger,
  ComboBoxValue,
} from "./combo-box.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ComboBox = Object.assign(ComboBoxRoot, {
  Root: ComboBoxRoot,
  InputGroup: ComboBoxInputGroup,
  Value: ComboBoxValue,
  Trigger: ComboBoxTrigger,
  Popover: ComboBoxPopover,
});

export type ComboBox<T extends object = object, M extends "single" | "multiple" = "single"> = {
  Props: ComponentProps<typeof ComboBoxRoot<T, M>>;
  RootProps: ComponentProps<typeof ComboBoxRoot<T, M>>;
  InputGroupProps: ComponentProps<typeof ComboBoxInputGroup>;
  ValueProps: ComponentProps<typeof ComboBoxValue<T>>;
  TriggerProps: ComponentProps<typeof ComboBoxTrigger>;
  PopoverProps: ComponentProps<typeof ComboBoxPopover>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ComboBoxInputGroup, ComboBoxPopover, ComboBoxRoot, ComboBoxTrigger, ComboBoxValue};

export type {
  ComboBoxRootProps,
  ComboBoxRootProps as ComboBoxProps,
  ComboBoxInputGroupProps,
  ComboBoxValueProps,
  ComboBoxValueRenderProps,
  ComboBoxTriggerProps,
  ComboBoxPopoverProps,
} from "./combo-box.js";

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/
export {ComboBoxContext} from "./combo-box.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {comboBoxVariants} from "../../../../styles/web/index.js";

export type {ComboBoxVariants} from "../../../../styles/web/index.js";
