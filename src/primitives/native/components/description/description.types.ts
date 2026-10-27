/*
 * Derived from heroui-native/src/components/description/description.types.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { TextProps } from 'react-native';
import type {
  AnimatedProps,
  EntryOrExitLayoutType,
} from 'react-native-reanimated';

import type { AnimationRoot , AnimationValue } from '../../helpers/internal/types/animation.js';
import type { TextRef } from '../../helpers/internal/types/primitives.js';

/**
 * Animation configuration for Description component
 * Used by the Description component for animation support
 */
export type DescriptionAnimation = AnimationRoot<{
  entering?: AnimationValue<{
    /**
     * Custom entering animation for description
     */
    value?: EntryOrExitLayoutType;
  }>;
  exiting?: AnimationValue<{
    /**
     * Custom exiting animation for description
     */
    value?: EntryOrExitLayoutType;
  }>;
}>;

/**
 * Props for the Description component
 */
export interface DescriptionProps
  extends Omit<AnimatedProps<TextProps>, 'entering' | 'exiting'> {
  /**
   * Description text content
   */
  children?: React.ReactNode;
  /**
   * Whether the description is in an invalid state (overrides context)
   * @default undefined
   */
  isInvalid?: boolean;
  /**
   * Whether the description is disabled (overrides context)
   * @default undefined
   */
  isDisabled?: boolean;
  /**
   * Whether to hide the description when invalid
   * @default false
   */
  hideOnInvalid?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Native ID for accessibility. Used to link description to form fields via aria-describedby.
   * When provided, form fields can reference this description using aria-describedby={nativeID}.
   */
  nativeID?: string;
  /**
   * Animation configuration for description
   * - `true` or `undefined`: Use default animations
   * - `false` or `"disabled"`: Disable only description animations (children can still animate)
   * - `"disable-all"`: Disable all animations including children (cascades down)
   * - `object`: Custom animation configuration
   */
  animation?: DescriptionAnimation;
}

/**
 * Reference type for the Description component
 */
export type DescriptionRef = TextRef;
