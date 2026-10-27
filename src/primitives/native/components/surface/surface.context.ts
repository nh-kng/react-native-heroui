/*
 * Derived from heroui-native/src/components/surface/surface.context.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { SurfaceContextValue } from './surface.types.js';
import { createContext } from '../../helpers/internal/utils/create-context.js';

// --------------------------------------------------

/**
 * Context holding the active surface variant.
 *
 * Kept in a leaf module — free of component imports — so low-level consumers
 * such as `useIsOnSurface` can read the surface variant without pulling in the
 * Surface component graph.
 */
const [SurfaceProvider, useSurface] = createContext<SurfaceContextValue>({
  name: 'SurfaceContext',
  strict: false,
});

export { SurfaceProvider, useSurface };
