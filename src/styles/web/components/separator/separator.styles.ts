/*
 * Derived from heroui-react/packages/styles/src/components/separator/separator.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

const separatorVariants = tv({
  base: "separator__root",
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
  },
  variants: {
    orientation: {
      horizontal: "separator--horizontal",
      vertical: "separator__root--orientation-vertical",
    },
    variant: {
      default: "separator--default",
      secondary: "separator--secondary",
      tertiary: "separator--tertiary",
    },
  },
});

export {separatorVariants};
export type SeparatorVariants = VariantProps<typeof separatorVariants>;
