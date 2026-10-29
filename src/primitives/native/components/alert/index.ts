/*
 * Derived from heroui-native/src/components/alert/index.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
// Component exports
export { default as Alert, useAlert } from './alert.js';

// ClassNames export for external reuse
export { alertClassNames } from './alert.styles.js';

// Type exports (named exports for better tree-shaking)
export type {
  AlertBackgroundProps,
  AlertContentProps,
  AlertDescriptionProps,
  AlertIconProps,
  AlertIndicatorProps,
  AlertRootProps,
  AlertTitleProps,
} from './alert.types.js';
