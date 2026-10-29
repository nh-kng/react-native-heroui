export function normalizeExpandedKeys(
  keys: ReadonlySet<string>,
  mode: 'single' | 'multiple'
): Set<string> {
  return new Set(mode === 'multiple' ? keys : Array.from(keys).slice(0, 1));
}
