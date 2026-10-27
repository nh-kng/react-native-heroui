/*
 * Derived from heroui-native/src/components/label/label.styles.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { tv } from '../../helpers/external/utils/cn.js';
import { combineStyles } from '../../helpers/internal/utils/combine-styles.js';

const root = tv({
  base: '',
  variants: {
    isDisabled: {
      true: 'label__root--is-disabled',
    },
    isInsideField: {
      true: 'label__root--is-inside-field',
    },
    isInsideControlField: {
      true: 'label__root--is-inside-control-field',
    },
  },
});

const label = tv({
  slots: {
    text: 'label__text',
    asterisk: 'label__asterisk',
  },
  variants: {
    isDisabled: {
      true: {
        text: '',
        asterisk: 'label__asterisk--is-disabled',
      },
    },
    isInvalid: {
      true: {
        text: 'label__text--is-invalid',
      },
    },
  },
});

export const labelClassNames = combineStyles({
  root,
  label,
});

export type LabelSlots = keyof ReturnType<typeof label>;
