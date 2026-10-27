/*
 * Derived from heroui-native/src/components/text-field/text-field.types.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { ViewProps } from 'react-native';

import type { AnimationRootDisableAll } from '../../helpers/internal/types/animation.js';

/**
 * Props for the TextField component
 */
export interface TextFieldRootProps extends ViewProps {
  /**
   * Children elements to be rendered inside the root container
   */
  children?: React.ReactNode;
  /**
   * Whether the entire text field is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether the text field is in an invalid state
   * @default false
   */
  isInvalid?: boolean;
  /**
   * Whether the text field is required (shows asterisk in label)
   * @default false
   */
  isRequired?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Animation configuration for text field root
   * - `"disable-all"`: Disable all animations including children (cascades down to all child components)
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Context value for the TextField component
 */
export interface TextFieldContextValue {
  /**
   * Whether the entire text field is disabled
   */
  isDisabled: boolean;
  /**
   * Whether the text field is in an invalid state
   * @default false
   */
  isInvalid: boolean;
  /**
   * Whether the text field is required
   */
  isRequired: boolean;
}
