/*
 * Derived from heroui-native/src/helpers/external/hooks/use-is-on-surface.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { useSurface } from '../../../components/surface/surface.context.js';

export const useIsOnSurface = () => {
  const surfaceContext = useSurface();
  return !!(surfaceContext?.variant && surfaceContext.variant !== 'transparent');
};
