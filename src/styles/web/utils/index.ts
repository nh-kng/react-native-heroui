/*
 * Derived from heroui-react/packages/styles/src/utils/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
/**
 * Utility CSS class strings for common component patterns
 * These are framework-agnostic and can be used with any styling approach
 */

export const focusRingClasses =
  "focus-visible:ring-focus focus-visible:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export const disabledClasses =
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-[var(--disabled-opacity)]";

export const ariaDisabledClasses =
  "aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-[var(--disabled-opacity)]";
