/*
 * Derived from heroui-native/src/primitives/slot/types.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import * as React from 'react';
import {
  type ImageProps as RNImageProps,
  type ImageStyle as RNImageStyle,
  type PressableProps as RNPressableProps,
  type StyleProp,
} from 'react-native';

type AnyProps = Record<string, any>;

type ImageSlotProps = Omit<RNImageProps, 'children'> & {
  children?: React.ReactNode;
};

type PressableStyle = RNPressableProps['style'];
type ImageStyle = StyleProp<RNImageStyle>;
type Style = PressableStyle | ImageStyle;

export type { AnyProps, ImageSlotProps, ImageStyle, PressableStyle, Style };
