/*
 * Derived from heroui-react/packages/styles/src/components/surface/surface.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const surfaceVariants = tv({
  base: "surface__root",
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      default: "surface__root--variant-default",
      secondary: "surface__root--variant-secondary",
      tertiary: "surface__root--variant-tertiary",
      transparent: "surface__root--variant-transparent",
    },
  },
});

export type SurfaceVariants = VariantProps<typeof surfaceVariants>;
