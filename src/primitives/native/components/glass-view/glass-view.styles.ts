/*
 * Derived from heroui-native/src/components/glass-view/glass-view.styles.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { tv } from '../../helpers/external/utils/cn.js';
import { combineStyles } from '../../helpers/internal/utils/combine-styles.js';

/**
 * Root style definition — absolute-fill blur layer. Parents supply the
 * clipping class (border radius + overflow) via `className`.
 */
const root = tv({
  base: 'glass-view__root',
});

export const glassViewClassNames = combineStyles({
  root,
});
