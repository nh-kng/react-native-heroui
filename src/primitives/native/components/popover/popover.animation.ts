/*
 * Derived from heroui-native/src/components/popover/popover.animation.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { PopoverAnimationContextValue } from './popover.types.js';
import { createContext } from '../../helpers/internal/utils/index.js';

const [PopoverAnimationProvider, usePopoverAnimation] =
  createContext<PopoverAnimationContextValue>({
    name: 'PopoverAnimationContext',
  });

export { PopoverAnimationProvider, usePopoverAnimation };
