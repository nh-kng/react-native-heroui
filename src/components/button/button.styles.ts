/*
 * Derived from heroui-native/src/components/button/button.styles.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { tv } from 'tailwind-variants';

const root = tv({
  base: 'button__root',
  variants: {
    variant: {
      primary: 'button__root--variant-primary',
      secondary: 'button__root--variant-secondary',
      tertiary: 'button__root--variant-tertiary',
      outline: 'button__root--variant-outline',
      ghost: 'button__root--variant-ghost',
      danger: 'button__root--variant-danger',
      'danger-soft': 'button__root--variant-danger-soft',
    },
    size: {
      sm: 'button__root--size-sm',
      md: 'button__root--size-md',
      lg: 'button__root--size-lg',
    },
    isIconOnly: {
      true: 'button__root--is-icon-only',
    },
    isDisabled: {
      true: 'disabled:element-disabled',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    isIconOnly: false,
    isDisabled: false,
  },
});

const label = tv({
  base: 'button__label',
  variants: {
    variant: {
      primary: 'button__label--variant-primary',
      secondary: 'button__label--variant-secondary',
      tertiary: 'button__label--variant-tertiary',
      outline: 'button__label--variant-outline',
      ghost: 'button__label--variant-ghost',
      danger: 'button__label--variant-danger',
      'danger-soft': 'button__label--variant-danger-soft',
    },
    size: {
      sm: 'button__label--size-sm',
      md: 'button__label--size-md',
      lg: 'button__label--size-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

/**
 * Button background style definition.
 * Absolute-fill container rendered behind the button surface, matching the
 * root's border radius per size and clipping its content.
 */
const background = tv({
  base: 'button__background',
  variants: {
    size: {
      sm: 'button__background--size-sm',
      md: 'button__background--size-md',
      lg: 'button__background--size-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const buttonClassNames = {
  root,
  label,
  background,
};
