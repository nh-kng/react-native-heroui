/*
 * Derived from heroui-react/packages/styles/src/components/kbd/kbd.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const kbdVariants = tv({
  defaultVariants: {},
  slots: {
    abbr: "kbd__abbr",
    base: "kbd",
    content: "kbd__content",
  },
  variants: {
    variant: {
      default: "kbd--default",
      light: "kbd--light",
    },
  },
});

export type KbdVariants = VariantProps<typeof kbdVariants>;
