/*
 * Derived from heroui-native/src/components/control-field/control-field.context.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { ControlFieldContextValue } from './control-field.types.js';
import { createContext } from '../../helpers/internal/utils/create-context.js';

/**
 * ControlField context provider and hook
 * Extracted to separate file to avoid circular dependencies with Checkbox/Switch animation files
 */
const [ControlFieldProvider, useControlField] =
  createContext<ControlFieldContextValue>({
    name: 'ControlFieldContext',
    strict: false,
  });

export { ControlFieldProvider, useControlField };
