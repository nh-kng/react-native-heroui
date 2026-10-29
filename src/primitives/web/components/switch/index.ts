/*
 * Derived from heroui-react/packages/react/src/components/switch/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {SwitchContent, SwitchControl, SwitchIcon, SwitchRoot, SwitchThumb} from "./switch.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Switch = Object.assign(SwitchRoot, {
  Root: SwitchRoot,
  Content: SwitchContent,
  Control: SwitchControl,
  Thumb: SwitchThumb,
  Icon: SwitchIcon,
});

export type Switch = {
  Props: ComponentProps<typeof SwitchRoot>;
  RootProps: ComponentProps<typeof SwitchRoot>;
  ContentProps: ComponentProps<typeof SwitchContent>;
  ControlProps: ComponentProps<typeof SwitchControl>;
  ThumbProps: ComponentProps<typeof SwitchThumb>;
  IconProps: ComponentProps<typeof SwitchIcon>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {SwitchContent, SwitchControl, SwitchIcon, SwitchRoot, SwitchThumb};

export type {
  SwitchRootProps,
  SwitchRootProps as SwitchProps,
  SwitchContentProps,
  SwitchControlProps,
  SwitchThumbProps,
  SwitchIconProps,
  SwitchFieldRenderProps,
  SwitchButtonRenderProps,
  /** @deprecated Use {@link SwitchFieldRenderProps} for the root render prop, or {@link SwitchButtonRenderProps} for control. */
  SwitchFieldRenderProps as SwitchRenderProps,
} from "./switch.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {switchVariants} from "../../../../styles/web/index.js";

export type {SwitchVariants} from "../../../../styles/web/index.js";
