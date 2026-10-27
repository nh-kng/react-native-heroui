/*
 * Derived from heroui-react/packages/styles/src/components/card/card.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

const cardVariants = tv({
  defaultVariants: {
    variant: "default",
  },
  slots: {
    base: "surface__root flex flex-col gap-3",
    content: "flex-1",
    description: "card__description",
    footer: "flex flex-row items-center gap-2",
    header: "card__header flex flex-col gap-1",
    title: "card__label",
  },
  variants: {
    variant: {
      default: {
        base: "surface__root--variant-default",
      },
      secondary: {
        base: "surface__root--variant-secondary",
      },
      tertiary: {
        base: "surface__root--variant-tertiary",
      },
      transparent: {
        base: "surface__root--variant-transparent",
      },
    },
  },
});

export {cardVariants};
export type CardVariants = VariantProps<typeof cardVariants>;
