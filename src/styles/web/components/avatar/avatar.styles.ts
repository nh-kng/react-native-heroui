/*
 * Derived from heroui-react/packages/styles/src/components/avatar/avatar.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const avatarVariants = tv({
  defaultVariants: {
    color: "default",
    size: "md",
  },
  slots: {
    base: "avatar",
    fallback: "avatar__fallback",
    image: "avatar__image",
  },
  variants: {
    color: {
      accent: {
        fallback: "avatar__fallback--accent",
      },
      danger: {
        fallback: "avatar__fallback--danger",
      },
      default: {
        fallback: "avatar__fallback--default",
      },
      success: {
        fallback: "avatar__fallback--success",
      },
      warning: {
        fallback: "avatar__fallback--warning",
      },
    },
    size: {
      lg: {
        base: "avatar--lg",
      },
      md: {
        base: "avatar--md",
      },
      sm: {
        base: "avatar--sm",
      },
    },
    variant: {
      default: {},
      soft: {
        base: "avatar--soft",
      },
    },
  },
});

export type AvatarVariants = VariantProps<typeof avatarVariants>;
