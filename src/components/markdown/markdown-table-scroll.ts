const boundaryTolerance = 1;

export function clampTableOffset(offset: number, maximum: number): number {
  return Math.max(0, Math.min(offset, Math.max(0, maximum)));
}

export function markdownTableScrollMetrics(
  viewport: number,
  content: number,
  offset: number,
  track: number
) {
  const maximum = Math.max(0, content - viewport);
  const position = clampTableOffset(offset, maximum);
  const length = Math.max(0, track);
  const thumb =
    content > 0 ? Math.min(length, Math.max(24, (length * viewport) / content)) : length;
  const travel = length - thumb;
  return {
    maximum,
    position,
    overflow: viewport > 0 && maximum > boundaryTolerance,
    canScrollLeft: position > boundaryTolerance,
    canScrollRight: maximum - position > boundaryTolerance,
    thumb,
    travel,
    thumbPosition: maximum > 0 ? (travel * position) / maximum : 0,
    percent: maximum > 0 ? Math.round((position / maximum) * 100) : 0,
  };
}

export function markdownTablePageOffset(
  offset: number,
  direction: number,
  viewport: number,
  maximum: number
) {
  return clampTableOffset(offset + direction * viewport * 0.8, maximum);
}

export function markdownTableDragOffset(
  offset: number,
  delta: number,
  travel: number,
  maximum: number
) {
  return clampTableOffset(offset + (travel > 0 ? (delta / travel) * maximum : 0), maximum);
}

export function markdownTableTrackOffset(
  point: number,
  thumbPosition: number,
  thumb: number,
  offset: number,
  viewport: number,
  maximum: number
) {
  const direction = point < thumbPosition ? -1 : point > thumbPosition + thumb ? 1 : 0;
  return markdownTablePageOffset(offset, direction, viewport, maximum);
}

export function markdownTableWebOffset(raw: number, maximum: number, rtl: boolean) {
  return clampTableOffset(rtl ? maximum + raw : raw, maximum);
}

export function markdownTableWebScrollLeft(offset: number, maximum: number, rtl: boolean) {
  const position = clampTableOffset(offset, maximum);
  return rtl ? position - maximum : position;
}

export function markdownTableLayoutOffset(
  offset: number,
  maximum: number,
  rtl: boolean,
  previous: { maximum: number; rtl: boolean } | null
) {
  const atReadingStart =
    rtl &&
    (!previous ||
      previous.rtl !== rtl ||
      (previous.maximum !== maximum && offset >= previous.maximum - boundaryTolerance));
  return atReadingStart ? maximum : clampTableOffset(offset, maximum);
}
