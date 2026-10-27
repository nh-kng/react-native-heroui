/*
 * Derived from heroui-native/src/providers/text-component/provider.tsx at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { TextComponentContextValue } from './types.js';
import { createContext } from '../../helpers/internal/utils/create-context.js';

const [TextComponentProvider, useTextComponent] =
  createContext<TextComponentContextValue>({
    name: 'TextComponentContext',
  });

export { TextComponentProvider, useTextComponent };
