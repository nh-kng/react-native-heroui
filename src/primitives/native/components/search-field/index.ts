/*
 * Derived from heroui-native/src/components/search-field/index.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
// Component exports
export { default as SearchField, useSearchField } from './search-field.js';

// ClassNames export for external reuse
export { searchFieldClassNames } from './search-field.styles.js';

// Type exports (named exports for better tree-shaking)
export type {
  SearchFieldClearButtonIconProps,
  SearchFieldClearButtonProps,
  SearchFieldContextType,
  SearchFieldGroupProps,
  SearchFieldInputProps,
  SearchFieldProps,
  SearchFieldSearchIconIconProps,
  SearchFieldSearchIconProps,
} from './search-field.types.js';
