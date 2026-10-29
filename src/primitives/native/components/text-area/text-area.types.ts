/*
 * Derived from heroui-native/src/components/text-area/text-area.types.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { InputProps, InputRef } from '../input/input.types.js';

/**
 * Props for the TextArea component
 */
export interface TextAreaProps extends InputProps {}

/**
 * Reference type for the TextArea component.
 * Same native text input instance as `InputRef`.
 */
export type TextAreaRef = InputRef;
