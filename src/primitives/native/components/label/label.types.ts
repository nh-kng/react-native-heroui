/*
 * Derived from heroui-native/src/components/label/label.types.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { TextStyle } from 'react-native';

import type { LabelSlots } from './label.styles.js';
import type { AnimationRootDisableAll } from '../../helpers/internal/types/animation.js';
import type { PressableRef , TextRef } from '../../helpers/internal/types/primitives.js';
import type { ElementSlots } from '../../helpers/internal/types/theme.js';
import type * as LabelPrimitivesTypes from '../../primitives/label/label.types.js';

/**
 * Props for the main Label component
 */
export interface LabelProps extends LabelPrimitivesTypes.RootProps {
  /**
   * Whether the label is required (shows asterisk)
   * @default false
   */
  isRequired?: boolean;

  /**
   * Whether the label is in an invalid state
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Animation configuration for label
   * - `"disable-all"`: Disable all animations including children
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Props for the Label.Text component
 */
export interface LabelTextProps extends LabelPrimitivesTypes.TextProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Additional CSS classes for different parts of the label
   */
  classNames?: ElementSlots<LabelSlots>;
  /**
   * Styles for different parts of the label
   */
  styles?: Partial<Record<LabelSlots, TextStyle>>;
}

/**
 * Context value for Label components
 */
export interface LabelContextValue {
  /**
   * Whether the label is disabled
   */
  isDisabled: boolean;

  /**
   * Whether the label is required
   */
  isRequired: boolean;

  /**
   * Whether the label is in an invalid state
   */
  isInvalid: boolean;
}

/**
 * Reference type for the Label component
 */
export type LabelRef = PressableRef;

/**
 * Reference type for the Label.Text component
 */
export type LabelTextRef = TextRef;
