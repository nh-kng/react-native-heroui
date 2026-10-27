/*
 * Derived from heroui-native/src/providers/toast/reducer.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { ToastAction, ToastItem } from './types.js';

/**
 * Reducer for managing toast state
 */
export function toastReducer(
  state: ToastItem[],
  action: ToastAction
): ToastItem[] {
  switch (action.type) {
    case 'SHOW': {
      // Remove existing toast with same ID if it exists
      const filtered = state.filter((toast) => toast.id !== action.payload.id);
      // Add new toast
      return [...filtered, action.payload];
    }

    case 'HIDE': {
      // Hide specific toasts by ID
      // Use loose equality to handle string/number ID comparisons
      return state.filter(
        (toast) =>
          !action.payload.ids.some((id) => String(id) === String(toast.id))
      );
    }

    case 'HIDE_ALL':
      // Hide all toasts
      return [];

    default:
      return state;
  }
}
