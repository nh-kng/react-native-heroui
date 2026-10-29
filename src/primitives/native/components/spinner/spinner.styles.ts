/*
 * Derived from heroui-native/src/components/spinner/spinner.styles.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { tv } from '../../helpers/external/utils/cn.js';
import { combineStyles } from '../../helpers/internal/utils/index.js';

const root = tv({
  base: 'spinner__root',
  variants: {
    size: {
      sm: 'spinner__root--size-sm',
      md: 'spinner__root--size-md',
      lg: 'spinner__root--size-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

/**
 * Indicator style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following property is animated and cannot be overridden using Tailwind classes:
 * - `transform` (specifically `rotate`) - Animated for continuous rotation animation
 *
 * To customize this property, use the `animation` prop on `Spinner.Indicator`:
 * ```tsx
 * <Spinner.Indicator
 *   animation={{
 *     rotation: { speed: 1.1, easing: Easing.linear }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Spinner.Indicator`.
 */
const indicator = tv({
  base: 'spinner__indicator',
});

export const spinnerClassNames = combineStyles({
  root,
  indicator,
});
