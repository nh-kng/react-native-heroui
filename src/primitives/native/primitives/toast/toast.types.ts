/*
 * Derived from heroui-native/src/primitives/toast/toast.types.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { PressableRef , SlottablePressableProps , SlottableTextProps , SlottableViewProps , TextRef , ViewRef } from '../../helpers/internal/types/primitives.js';

/**
 * Context for the toast root component
 */
type RootContext = {
  /** Unique identifier for the toast */
  nativeID: string;
};

/**
 * Props for the toast root component
 */
type RootProps = SlottableViewProps & {
  /** Unique identifier for the toast */
  id?: string | number;
};

/**
 * Props for the toast title component
 */
type TitleProps = SlottableTextProps;

/**
 * Props for the toast description component
 */
type DescriptionProps = SlottableTextProps;

/**
 * Props for the toast action component
 */
type ActionProps = SlottablePressableProps & {
  /** Alternative label for the action button for accessibility */
  altText?: string;
};

/**
 * Props for the toast close button component
 */
type CloseProps = SlottablePressableProps;

/**
 * Ref type for the toast root
 */
type RootRef = ViewRef;

/**
 * Ref type for the toast title
 */
type TitleRef = TextRef;

/**
 * Ref type for the toast description
 */
type DescriptionRef = TextRef;

/**
 * Ref type for the toast action button
 */
type ActionRef = PressableRef;

/**
 * Ref type for the toast close button
 */
type CloseRef = PressableRef;

export type {
  ActionProps,
  ActionRef,
  CloseProps,
  CloseRef,
  DescriptionProps,
  DescriptionRef,
  RootContext,
  RootProps,
  RootRef,
  TitleProps,
  TitleRef,
};
