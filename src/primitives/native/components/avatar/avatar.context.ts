/*
 * Derived from heroui-native/src/components/avatar/avatar.context.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { AvatarContextValue } from './avatar.types.js';
import { createContext } from '../../helpers/internal/utils/index.js';

/**
 * Avatar context provider and hook
 * Provides size, color, and animation state to child components
 */
export const [AvatarProvider, useInnerAvatarContext] =
  createContext<AvatarContextValue>({
    name: 'AvatarContext',
  });
