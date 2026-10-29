/*
 * Derived from heroui-native/src/primitives/accordion/accordion.utils.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
export function toStringArray(value?: string | string[]) {
  return Array.isArray(value) ? value : value ? [value] : [];
}

export function isItemSelected(
  rootValue: string | string[] | undefined,
  value: string
) {
  return Array.isArray(rootValue)
    ? rootValue.includes(value)
    : rootValue === value;
}
