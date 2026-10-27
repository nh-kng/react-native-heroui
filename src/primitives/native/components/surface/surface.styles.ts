/*
 * Derived from heroui-native/src/components/surface/surface.styles.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { StyleSheet } from 'react-native';

import { tv } from '../../helpers/external/utils/cn.js';
import { combineStyles } from '../../helpers/internal/utils/combine-styles.js';

const root = tv({
  base: 'surface__root',
  variants: {
    variant: {
      default: 'surface__root--variant-default',
      secondary: 'surface__root--variant-secondary',
      tertiary: 'surface__root--variant-tertiary',
      transparent: 'surface__root--variant-transparent',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

/**
 * Background style definition — absolute-fill container behind the surface
 * content, hosting theme-specific layers (e.g. glass blur) or custom
 * content (gradients, images).
 */
const background = tv({
  base: 'surface__background',
});

export const surfaceClassNames = combineStyles({
  root,
  background,
});

export const surfaceStyleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});
