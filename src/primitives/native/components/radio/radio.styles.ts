/*
 * Derived from heroui-native/src/components/radio/radio.styles.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { StyleSheet } from 'react-native';

import { tv } from '../../helpers/external/utils/cn.js';
import { combineStyles } from '../../helpers/internal/utils/index.js';

/** Root item layout style */
const root = tv({
  base: 'radio__root',
});

/** Indicator container style (the radio circle) */
const indicator = tv({
  base: 'radio__indicator',
  variants: {
    variant: {
      primary: 'radio__indicator--variant-primary',
      secondary: 'radio__indicator--variant-secondary',
    },
    isSelected: {
      true: 'radio__indicator--is-selected',
      false: '',
    },
    isInvalid: {
      true: 'radio__indicator--is-invalid',
      false: '',
    },
  },
  compoundVariants: [
    {
      isInvalid: true,
      isSelected: true,
      className: 'radio__indicator--is-invalid--is-selected',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    isSelected: false,
    isInvalid: false,
  },
});

/**
 * Indicator background style definition — generic absolute-fill container
 * behind the indicator content (clipped by the indicator's
 * `overflow: hidden`), hosting theme-specific layers (e.g. a glass blur
 * layer).
 */
const indicatorBackground = tv({
  base: 'radio__indicator-background',
});

/**
 * Indicator thumb style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following property is animated and cannot be overridden using Tailwind classes:
 * - `transform` (specifically `scale`) - Animated for selection transitions (unselected: 1.5, selected: 1)
 *
 * To customize this property, use the `animation` prop on `Radio.IndicatorThumb`:
 * ```tsx
 * <Radio.IndicatorThumb
 *   animation={{
 *     scale: { value: [1.5, 1], timingConfig: { duration: 300, easing: Easing.out(Easing.ease) } }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Radio.IndicatorThumb`.
 */
const indicatorThumb = tv({
  base: 'radio__indicator-thumb',
  variants: {
    isSelected: {
      true: 'radio__indicator-thumb--is-selected',
      false: 'radio__indicator-thumb--is-selected-false',
    },
  },
});

export const radioClassNames = combineStyles({
  root,
  indicator,
  indicatorBackground,
  indicatorThumb,
});

export const radioStyleSheet = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});
