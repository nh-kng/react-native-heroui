import type { ASTNode } from '../markdown.types.js';
export function markdownColumnWidths(
  measurements: readonly (readonly number[])[],
  viewport: number
): number[] {
  const count = Math.max(0, ...measurements.map((row) => row.length));
  const widths = Array.from({ length: count }, (_, column) =>
    Math.min(480, Math.max(64, ...measurements.map((row) => row[column] ?? 0)))
  );
  const total = widths.reduce((sum, width) => sum + width, 0);
  const extra = count ? Math.max(0, viewport - total) / count : 0;
  return widths.map((width) => width + extra);
}

export function markdownTableMeasurementKey(
  revision: string,
  viewport: number,
  fontScale: number,
  styling: string
): string {
  return JSON.stringify([revision, viewport, fontScale, styling]);
}

export function markdownCellText(node: ASTNode): string {
  if (node.type === 'image') return node.attributes.alt ?? '';
  if (node.type.endsWith('break')) return '\n';
  return node.content || node.children.map(markdownCellText).join('');
}
