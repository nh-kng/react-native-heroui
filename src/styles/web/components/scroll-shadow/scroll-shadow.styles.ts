/*
 * Derived from heroui-react/packages/styles/src/components/scroll-shadow/scroll-shadow.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const scrollShadowVariants = tv({
  defaultVariants: {
    hideScrollBar: false,
    orientation: "vertical",
    variant: "fade",
  },
  slots: {
    base: "scroll-shadow",
  },
  variants: {
    hideScrollBar: {
      false: {},
      true: {
        base: "scroll-shadow--hide-scrollbar",
      },
    },
    orientation: {
      horizontal: {
        base: "scroll-shadow--horizontal",
      },
      vertical: {
        base: "scroll-shadow--vertical",
      },
    },
    variant: {
      fade: {
        base: "scroll-shadow--fade",
      },
    },
  },
});

export type ScrollShadowVariants = VariantProps<typeof scrollShadowVariants>;
