/*
 * Derived from heroui-native/src/components/close-button/close-button.styles.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { tv } from '../../helpers/external/utils/cn.js';
import { combineStyles } from '../../helpers/internal/utils/index.js';

const root = tv({
  base: 'close-button__root',
});

const closeButtonClassNames = combineStyles({
  root,
});

export { closeButtonClassNames };
export default closeButtonClassNames;
