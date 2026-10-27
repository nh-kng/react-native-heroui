/*
 * Derived from heroui-react/packages/react/src/components/chip/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {ChipLabel, ChipRoot} from "./chip.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Chip = Object.assign(ChipRoot, {
  Root: ChipRoot,
  Label: ChipLabel,
});

export type Chip = {
  Props: ComponentProps<typeof ChipRoot>;
  RootProps: ComponentProps<typeof ChipRoot>;
  LabelProps: ComponentProps<typeof ChipLabel>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ChipRoot, ChipLabel};

export type {ChipRootProps, ChipRootProps as ChipProps, ChipLabelProps} from "./chip.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {chipVariants} from "../../../../styles/web/index.js";

export type {ChipVariants} from "../../../../styles/web/index.js";
