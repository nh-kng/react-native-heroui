/*
 * Derived from heroui-native/src/helpers/internal/contexts/layout-direction-context.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { createContext } from '../utils/create-context.js';

/**
 * Context value for the effective layout direction
 */
export interface LayoutDirectionContextValue {
  /**
   * Whether the layout direction is right-to-left
   */
  isRTL: boolean;
}

const [LayoutDirectionProvider, useLayoutDirectionContext] =
  createContext<LayoutDirectionContextValue>({
    name: 'LayoutDirectionContext',
    strict: false,
  });

export { LayoutDirectionProvider, useLayoutDirectionContext };
