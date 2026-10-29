export function webTextValueProps(
  value: string | undefined,
  defaultValue: string | undefined,
  currentValue: string
): { value?: string } {
  return value !== undefined || defaultValue !== undefined ? { value: currentValue } : {};
}
