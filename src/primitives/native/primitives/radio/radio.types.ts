/*
 * Derived from heroui-native/src/primitives/radio/radio.types.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '../../helpers/internal/types/index.js';

/**
 * Internal context interface extending RootProps with nativeID
 */
export interface RootContext extends RootProps {
  /** Native ID for the radio element */
  nativeID?: string;
}

/**
 * Props for the radio root component.
 *
 * @extends SlottablePressableProps Inherits pressable props except 'disabled'
 */
type RootProps = Omit<SlottablePressableProps, 'disabled'> & {
  /** Whether the radio is currently selected */
  isSelected?: boolean;
  /** Callback fired when the radio selection state changes */
  onSelectedChange?: (isSelected: boolean) => void;
  /** Whether the radio is disabled and cannot be interacted with */
  isDisabled?: boolean;
  /** Whether the radio is in an invalid state @default false */
  isInvalid?: boolean;
  /** Variant style for the radio */
  variant?: 'primary' | 'secondary';
};

/**
 * Props for the radio indicator component.
 *
 * @extends SlottableViewProps Inherits view props except 'disabled'
 */
type IndicatorProps = Omit<SlottableViewProps, 'disabled'>;

/** Reference type for the radio root component */
type RootRef = PressableRef;

/** Reference type for the radio indicator component */
type IndicatorRef = ViewRef;

export type { IndicatorProps, IndicatorRef, RootProps, RootRef };
