/*
 * Derived from heroui-native/src/components/scroll-shadow/scroll-shadow.styles.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { StyleSheet } from 'react-native';

import { tv } from '../../helpers/external/utils/cn.js';
import { combineStyles } from '../../helpers/internal/utils/index.js';

/**
 * ScrollShadow component styles using tailwind-variants
 */
const root = tv({
  base: '',
});

export const scrollShadowClassNames = combineStyles({
  root,
});

/**
 * Native styles for properties not supported by NativeWind
 */
export const scrollShadowStyleSheet = StyleSheet.create({
  topShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    pointerEvents: 'none',
  },
  bottomShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    pointerEvents: 'none',
  },
  leftShadow: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 10,
    pointerEvents: 'none',
  },
  rightShadow: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    pointerEvents: 'none',
  },
});
