/*
 * Derived from heroui-native/src/helpers/internal/contexts/bottom-sheet-is-dragging-context.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { SharedValue } from 'react-native-reanimated';

import { createContext } from '../utils/create-context.js';

const [BottomSheetIsDraggingProvider, useBottomSheetIsDragging] =
  createContext<{
    isDragging: SharedValue<boolean>;
  }>({
    name: 'BottomSheetIsDraggingContext',
  });

export { BottomSheetIsDraggingProvider, useBottomSheetIsDragging };
