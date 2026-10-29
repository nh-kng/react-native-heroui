/*
 * Derived from heroui-native/src/components/tabs/tabs.context.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { createContext, useContext } from 'react';

import type { MeasurementsContextValue } from './tabs.types.js';

// --------------------------------------------------

/**
 * Context for managing tab item measurements
 * Used to track width, height, and position of each tab trigger
 */
const MeasurementsContext = createContext<MeasurementsContextValue | null>(
  null
);

/**
 * Hook to access tab measurements context
 * @throws Error if used outside of Tabs component
 */
function useTabsMeasurements() {
  const context = useContext(MeasurementsContext);
  if (!context) {
    throw new Error(
      'Tabs measurement components must be used within Tabs component'
    );
  }
  return context;
}

export { MeasurementsContext, useTabsMeasurements };
