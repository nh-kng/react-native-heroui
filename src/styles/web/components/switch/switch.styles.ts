/*
 * Derived from heroui-react/packages/styles/src/components/switch/switch.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const switchVariants = tv({
  defaultVariants: {
    size: "md",
  },
  slots: {
    base: "switch-field",
    content: "switch__content",
    control: "switch__root",
    icon: "switch__icon",
    thumb: "switch__thumb",
  },
  variants: {
    size: {
      lg: {
        base: "switch--lg",
      },
      md: {
        base: "switch--md",
      },
      sm: {
        base: "switch--sm",
      },
    },
  },
});

export type SwitchVariants = VariantProps<typeof switchVariants>;
