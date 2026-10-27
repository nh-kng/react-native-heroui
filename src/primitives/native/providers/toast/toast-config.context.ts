/*
 * Derived from heroui-native/src/providers/toast/toast-config.context.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { createContext, useContext } from 'react';

import type { ToastGlobalConfig } from './types.js';

/**
 * Context for global toast configuration
 * Extracted to separate file to avoid circular dependencies with toast component
 */
const ToastConfigContext = createContext<ToastGlobalConfig | undefined>(
  undefined
);

/**
 * Hook to access global toast configuration
 *
 * @returns Global toast configuration or undefined if not set
 *
 * @example
 * ```tsx
 * const globalConfig = useToastConfig();
 * // Use globalConfig.variant, globalConfig.placement, etc.
 * ```
 */
export function useToastConfig(): ToastGlobalConfig | undefined {
  return useContext(ToastConfigContext);
}

export { ToastConfigContext };
