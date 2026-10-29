/*
 * Derived from heroui-native/src/primitives/activity-indicator/activity-indicator.types.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { SlottableViewProps, ViewRef } from '../../helpers/internal/types/index.js';

/**
 * Props for the activity indicator root component.
 *
 * @extends SlottableViewProps Inherits view props
 */
export interface RootProps extends SlottableViewProps {
  /** Whether the activity indicator is loading */
  isLoading?: boolean;
}

/** Reference type for the activity indicator root component */
export type RootRef = ViewRef;

/**
 * Props for the activity indicator indicator component.
 *
 * @extends SlottableViewProps Inherits view props
 */
export interface IndicatorProps extends SlottableViewProps {}

/** Reference type for the activity indicator indicator component */
export type IndicatorRef = ViewRef;
