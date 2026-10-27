/*
 * Derived from heroui-native/src/components/close-button/close-button.types.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { ButtonRootProps } from '../button/button.types.js';

/**
 * Props for customizing the close icon
 */
export interface CloseButtonIconProps {
  /**
   * Size of the icon
   * @default 18
   */
  size?: number;
  /**
   * Color of the icon
   * @default Uses theme muted color
   */
  color?: string;
}

/**
 * Props for the CloseButton component
 *
 * Extends ButtonRootProps, allowing full override of all button props.
 * Defaults to variant='tertiary', size='sm', and isIconOnly=true.
 */
export type CloseButtonProps = ButtonRootProps & {
  /**
   * Props for customizing the close icon
   */
  iconProps?: CloseButtonIconProps;
};
