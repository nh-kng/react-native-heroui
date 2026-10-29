export interface SegmentBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function segmentKeys(value: string): Set<string> {
  return new Set([value]);
}

export function changedSegment(current: string, keys: Iterable<string | number>): string | undefined {
  const values = Array.from(keys);
  if (values.length !== 1 || typeof values[0] !== 'string' || values[0] === current) return undefined;
  return values[0];
}

export function segmentBounds(item: SegmentBounds, parent: SegmentBounds): SegmentBounds | undefined {
  if (![item.x, item.y, item.width, item.height, parent.x, parent.y].every(Number.isFinite)
    || item.width <= 0 || item.height <= 0) return undefined;
  return { x: item.x - parent.x, y: item.y - parent.y, width: item.width, height: item.height };
}

export function sameSegmentBounds(a: SegmentBounds | undefined, b: SegmentBounds | undefined): boolean {
  return a?.x === b?.x && a?.y === b?.y && a?.width === b?.width && a?.height === b?.height;
}

export function offsetSegmentBounds(item: SegmentBounds, list: SegmentBounds): SegmentBounds | undefined {
  return segmentBounds(
    { ...item, x: item.x + list.x, y: item.y + list.y },
    { x: 0, y: 0, width: list.width, height: list.height }
  );
}

export function segmentIndicatorX(bounds: SegmentBounds, trackWidth: number, isAnchorMirrored: boolean): number {
  return isAnchorMirrored && trackWidth > 0 ? bounds.x - (trackWidth - bounds.width) : bounds.x;
}
