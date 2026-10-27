/*
 * Derived from heroui-native/src/components/description/description.styles.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { tv } from '../../helpers/external/utils/cn.js';
import { combineStyles } from '../../helpers/internal/utils/combine-styles.js';

const root = tv({
  base: 'description__root',
  variants: {
    isInsideField: {
      true: 'description__root--is-inside-field',
    },
    isInvalid: {
      true: 'description__root--is-invalid',
    },
    isDisabled: {
      true: 'description__root--is-disabled',
      false: '',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

export const descriptionClassNames = combineStyles({
  root,
});
