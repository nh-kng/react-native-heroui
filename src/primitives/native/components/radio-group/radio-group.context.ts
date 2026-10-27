/*
 * Derived from heroui-native/src/components/radio-group/radio-group.context.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { RadioGroupItemContextValue } from './radio-group.types.js';
import { createContext } from '../../helpers/internal/utils/create-context.js';

/**
 * RadioGroupItem context provider and hook
 * Extracted to separate file to avoid circular dependencies with Label component
 */
const [RadioGroupItemProvider, useRadioGroupItem] =
  createContext<RadioGroupItemContextValue>({
    name: 'RadioGroupItemContext',
    strict: false,
  });

export { RadioGroupItemProvider, useRadioGroupItem };
