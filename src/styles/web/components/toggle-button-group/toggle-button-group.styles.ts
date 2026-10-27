/*
 * Derived from heroui-react/packages/styles/src/components/toggle-button-group/toggle-button-group.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const toggleButtonGroupVariants = tv({
  defaultVariants: {
    fullWidth: false,
    isDetached: false,
    orientation: "horizontal",
  },
  slots: {
    base: "toggle-button-group",
    separator: "toggle-button-group__separator",
  },
  variants: {
    fullWidth: {
      false: {},
      true: {
        base: "toggle-button-group--full-width",
      },
    },
    isDetached: {
      false: {},
      true: {
        base: "toggle-button-group--detached",
      },
    },
    orientation: {
      horizontal: {
        base: "toggle-button-group--horizontal",
      },
      vertical: {
        base: "toggle-button-group--vertical",
      },
    },
  },
});

export type ToggleButtonGroupVariants = VariantProps<typeof toggleButtonGroupVariants>;
