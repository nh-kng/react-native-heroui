/*
 * Derived from heroui-native/src/helpers/internal/hooks/use-bottom-sheet-gesture-handlers.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type {
  GestureEventHandlerCallbackType,
  GestureEventsHandlersHookType,
} from '@gorhom/bottom-sheet';

import GorhomBottomSheetPackage from '../../../optional/gorhom-bottom-sheet.js';
import { useBottomSheetIsDragging } from '../contexts/bottom-sheet-is-dragging-context.js';

export const useBottomSheetGestureHandlers: GestureEventsHandlersHookType =
  () => {
    const { isDragging } = useBottomSheetIsDragging();

    const defaultHandlers =
      GorhomBottomSheetPackage.useGestureEventsHandlersDefault();

    const handleOnStart: GestureEventHandlerCallbackType = (
      source,
      payload
    ) => {
      'worklet';
      isDragging.set(true);
      defaultHandlers.handleOnStart(source, payload);
    };

    const handleOnChange: GestureEventHandlerCallbackType = (
      source,
      payload
    ) => {
      'worklet';
      defaultHandlers.handleOnChange(source, payload);
    };

    const handleOnEnd: GestureEventHandlerCallbackType = (source, payload) => {
      'worklet';
      isDragging.set(false);
      defaultHandlers.handleOnEnd(source, payload);
    };

    const handleOnFinalize: GestureEventHandlerCallbackType = (
      source,
      payload
    ) => {
      'worklet';
      isDragging.set(false);
      defaultHandlers.handleOnFinalize(source, payload);
    };

    return {
      handleOnStart,
      handleOnChange,
      handleOnEnd,
      handleOnFinalize,
    };
  };
