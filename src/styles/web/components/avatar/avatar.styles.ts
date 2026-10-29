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
    base: "avatar__root",
    fallback: "avatar__fallback-container avatar__fallback-text",
    image: "avatar__image",
  },
  variants: {
    color: {
      accent: {
        fallback: "avatar__fallback-text--color-accent",
      },
      danger: {
        fallback: "avatar__fallback-text--color-danger",
      },
      default: {
        fallback: "avatar__fallback-text--color-default",
      },
      success: {
        fallback: "avatar__fallback-text--color-success",
      },
      warning: {
        fallback: "avatar__fallback-text--color-warning",
      },
    },
    size: {
      lg: {
        base: "avatar__root--size-lg",
      },
      md: {
        base: "avatar__root--size-md",
      },
      sm: {
        base: "avatar__root--size-sm",
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
