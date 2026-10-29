import type { SelectOption } from './select.types.js';

export function findSelectOption(items: readonly SelectOption[], value: string | undefined) {
  return value === undefined ? undefined : items.find((item) => item.value === value);
}

export function isSelectControlled(props: { value?: string }): boolean {
  return Object.prototype.hasOwnProperty.call(props, 'value');
}
