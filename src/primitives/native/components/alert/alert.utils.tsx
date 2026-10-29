/*
 * Derived from heroui-native/src/components/alert/alert.utils.tsx at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { DEFAULT_ICON_SIZE } from './alert.constants.js';
import type { AlertIconProps } from './alert.types.js';
import { DefaultIcon } from './default-icon.js';
import { SuccessIcon } from './success-icon.js';
import { WarningIcon } from './warning-icon.js';
import type { AlertStatus } from '../../primitives/alert/alert.types.js';

/**
 * Resolves the default icon component based on the current alert status.
 */
export function getStatusIcon(
  status: AlertStatus,
  iconProps: AlertIconProps
): React.ReactElement {
  const { size = DEFAULT_ICON_SIZE, color } = iconProps;

  switch (status) {
    case 'success':
      return <SuccessIcon size={size} color={color} />;
    case 'warning':
      return <WarningIcon size={size} color={color} />;
    default:
      return <DefaultIcon size={size} color={color} />;
  }
}
