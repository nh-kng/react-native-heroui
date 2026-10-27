/*
 * Derived from heroui-native/src/providers/text-input-component/provider.tsx at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { TextInputComponentContextValue } from './types.js';
import { createContext } from '../../helpers/internal/utils/create-context.js';

const [TextInputComponentProvider, useTextInputComponent] =
  createContext<TextInputComponentContextValue>({
    name: 'TextInputComponentContext',
  });

export { TextInputComponentProvider, useTextInputComponent };
