/*
 * Derived from heroui-native/src/primitives/label/label.types.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { ViewStyle } from 'react-native';

import type { PressableRef , SlottablePressableProps , SlottableTextProps , TextRef } from '../../helpers/internal/types/primitives.js';

/**
 * Props for the label root component.
 *
 * @extends SlottablePressableProps Inherits pressable props except 'children', 'hitSlop', and 'style'
 */
type RootProps = Omit<
  SlottablePressableProps,
  'children' | 'hitSlop' | 'disabled' | 'style'
> & {
  /** The content to be rendered inside the label */
  children: React.ReactNode;
  /** Whether the label is disabled */
  isDisabled?: boolean;
  /** Style properties for the label container */
  style?: ViewStyle;
};

/**
 * Props for the label text component.
 *
 * @extends SlottableTextProps Inherits text props for slot-based styling
 */
type TextProps = SlottableTextProps & {
  /** Equivalent to `id` so that the same value can be passed as `aria-labelledby` to the input element */
  nativeID?: string;
};

/** Reference type for the label root component */
type RootRef = PressableRef;

export type { RootProps, RootRef, TextProps, TextRef };
