/*
 * Derived from heroui-native/src/components/card/card.styles.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { tv } from '../../helpers/external/utils/cn.js';
import { combineStyles } from '../../helpers/internal/utils/combine-styles.js';

const root = tv({
  base: 'flex flex-col gap-3',
});

const header = tv({
  base: 'card__header',
});

const body = tv({
  base: '',
});

const footer = tv({
  base: '',
});

const label = tv({
  base: 'card__label',
});

const description = tv({
  base: 'card__description',
});

export const cardClassNames = combineStyles({
  root,
  header,
  body,
  footer,
  label,
  description,
});
