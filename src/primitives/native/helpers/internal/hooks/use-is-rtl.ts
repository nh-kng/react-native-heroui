/*
 * Derived from heroui-native/src/helpers/internal/hooks/use-is-rtl.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { I18nManager } from 'react-native';

import { useLayoutDirectionContext } from '../contexts/index.js';

/**
 * Hook that resolves the effective layout direction for JS-driven logic
 * (e.g. gesture deltas) that Yoga logical props cannot cover.
 *
 * @description
 * Reads the direction provided via `HeroUINativeProvider` config (`isRTL`), or
 * the nearest `LayoutDirectionScope` override. Falls back to the global
 * `I18nManager.isRTL` state when no provider value is available, which matches
 * the default React Native behavior.
 *
 * @returns `true` when the layout direction is right-to-left
 *
 * @example
 * ```tsx
 * const isRTL = useIsRTL();
 * const translateX = isRTL ? -offset : offset;
 * ```
 */
export function useIsRTL(): boolean {
  const context = useLayoutDirectionContext();

  return context?.isRTL ?? I18nManager.isRTL;
}
