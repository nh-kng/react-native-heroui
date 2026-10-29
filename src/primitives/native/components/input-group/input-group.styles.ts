/*
 * Derived from heroui-native/src/components/input-group/input-group.styles.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { tv } from '../../helpers/external/utils/cn.js';
import { combineStyles } from '../../helpers/internal/utils/index.js';

const prefix = tv({
  base: 'input-group__prefix',
  variants: {
    isDisabled: {
      true: 'input-group__prefix--is-disabled',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

const suffix = tv({
  base: 'input-group__suffix',
  variants: {
    isDisabled: {
      true: 'input-group__suffix--is-disabled',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

export const inputGroupClassNames = combineStyles({
  prefix,
  suffix,
});
