/*
 * Derived from heroui-react/packages/react/src/utils/css.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
export const parseCSSTime = (value: string | undefined): number | undefined => {
  if (!value) return undefined;
  const trimmed = value.trim();
  const val = parseFloat(trimmed);

  if (Number.isNaN(val)) return undefined;
  if (trimmed.endsWith("ms")) return val;
  if (trimmed.endsWith("s")) return val * 1000;

  return val;
};
