/*
 * Derived from heroui-react/packages/styles/src/components/combo-box/combo-box.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const comboBoxVariants = tv({
  defaultVariants: {
    fullWidth: false,
  },
  slots: {
    base: "combo-box",
    inputGroup: "combo-box__input-group",
    popover: "combo-box__popover",
    trigger: "combo-box__trigger",
    value: "combo-box__value",
  },
  variants: {
    fullWidth: {
      false: {},
      true: {
        base: "combo-box--full-width",
        inputGroup: "combo-box__input-group--full-width",
      },
    },
  },
});

export type ComboBoxVariants = VariantProps<typeof comboBoxVariants>;
