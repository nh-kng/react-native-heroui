/*
 * Derived from heroui-react/packages/react/src/utils/assertion.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
export type Dict<T = any> = Record<string, T>;

export function isArray<T>(value: any): value is T[] {
  return Array.isArray(value);
}

export function isEmptyArray(value: any) {
  return isArray(value) && value.length === 0;
}

export function isObject(value: any): value is Dict {
  const type = typeof value;

  return value != null && (type === "object" || type === "function") && !isArray(value);
}

export function isEmptyObject(value: any) {
  return isObject(value) && Object.keys(value).length === 0;
}

// Empty assertions
export function isEmpty(value: any): boolean {
  if (isArray(value)) return isEmptyArray(value);
  if (isObject(value)) return isEmptyObject(value);
  if (value == null || value === "") return true;

  return false;
}

export type Booleanish = boolean | "true" | "false";

export const dataAttr = (condition: boolean | undefined) =>
  (condition ? "true" : undefined) as Booleanish;

export const isNumeric = (value?: string | number) =>
  value != null && parseInt(value.toString(), 10) > 0;
