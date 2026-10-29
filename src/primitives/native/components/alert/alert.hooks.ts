/*
 * Derived from heroui-native/src/components/alert/alert.hooks.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { useThemeColor } from '../../helpers/external/hooks/index.js';
import type { AlertStatus } from '../../primitives/alert/alert.types.js';

/**
 * Resolves the default icon color based on the current alert status.
 */
export function useStatusColor(status: AlertStatus): string {
  const [foreground, accent, success, warning, danger] = useThemeColor([
    'foreground',
    'accent-soft-foreground',
    'success-soft-foreground',
    'warning-soft-foreground',
    'danger-soft-foreground',
  ]);

  switch (status) {
    case 'accent':
      return accent;
    case 'success':
      return success;
    case 'warning':
      return warning;
    case 'danger':
      return danger;
    default:
      return foreground;
  }
}
