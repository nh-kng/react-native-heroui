/*
 * Derived from heroui-native/src/components/input-otp/input-otp.styles.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { StyleSheet } from 'react-native';

import { tv } from '../../helpers/external/utils/cn.js';
import { combineStyles } from '../../helpers/internal/utils/index.js';

const root = tv({
  base: 'input-otp__root',
});

const group = tv({
  base: 'input-otp__group',
});

const slot = tv({
  base: 'input-otp__slot',
  variants: {
    variant: {
      primary: 'input-otp__slot--variant-primary',
      secondary: 'input-otp__slot--variant-secondary',
    },
    isActive: {
      true: 'input-otp__slot--is-active',
    },
    isInvalid: {
      true: 'input-otp__slot--is-invalid',
    },
    isDisabled: {
      true: 'input-otp__slot--is-disabled',
    },
  },
  defaultVariants: {
    variant: 'primary',
    isActive: false,
    isInvalid: false,
    isDisabled: false,
  },
});

/**
 * Slot background style definition — absolute-fill container behind the
 * slot content, hosting theme-specific layers (e.g. glass blur) or custom
 * content (gradients, images).
 */
const slotBackground = tv({
  base: 'input-otp__slot-background',
});

const slotPlaceholder = tv({
  base: 'input-otp__slot-placeholder',
});

const slotValue = tv({
  base: 'input-otp__slot-value',
});

const slotCaret = tv({
  base: 'input-otp__slot-caret',
});

const separator = tv({
  base: 'input-otp__separator',
});

export const inputOTPClassNames = combineStyles({
  root,
  group,
  slot,
  slotBackground,
  slotPlaceholder,
  slotValue,
  slotCaret,
  separator,
});

export const inputOTPStyleSheet = StyleSheet.create({
  slotRoot: {
    borderCurve: 'continuous',
  },
});
