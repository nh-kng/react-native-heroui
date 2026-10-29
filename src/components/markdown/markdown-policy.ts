import type { MarkdownBlockContext } from './markdown.types.js';

export function safeMarkdownUrl(value: string, image = false): string {
  if (/[\u0000-\u0020\u007f]/.test(value) || value.includes('\\')) return '';
  const colon = value.indexOf(':');
  const boundary = value.search(/[/?#]/);
  if (colon < 0 || (boundary >= 0 && boundary < colon)) return value;
  return (image ? /^https?$/i : /^(https?|mailto)$/i).test(value.slice(0, colon))
    ? value
    : '';
}

export function shouldOpenMarkdownLink(
  value: string,
  onLinkPress?: (url: string) => boolean | void
): boolean {
  const safe = safeMarkdownUrl(value);
  return safe !== '' && onLinkPress?.(safe) !== false;
}

export function isNativeMarkdownUrl(value: string, image = false): boolean {
  return safeMarkdownUrl(value, image) !== '' &&
    (image ? /^https?:\/\//i : /^(https?:\/\/|mailto:)/i).test(value);
}

export function markdownRevision(source: string): string {
  let hash = 2166136261;
  for (let index = 0; index < source.length; index++) {
    hash = Math.imul(hash ^ source.charCodeAt(index), 16777619);
  }
  return `${source.length}:${(hash >>> 0).toString(16)}`;
}

export function markdownContext(
  source: string,
  id: string,
  isComplete: boolean
): MarkdownBlockContext {
  return { source, id, isComplete, revision: markdownRevision(source) };
}

export function isClosedMarkdownBlock(raw: string, kind: 'code' | 'math'): boolean {
  const lines = raw.trimEnd().split('\n').map((line) => line.replace(/^(\s*>\s*)+/, ''));
  if (kind === 'math') {
    const opening = /^\s*(?:(?:[-+*]|\d+[.)])\s+)?(\${2,})/.exec(lines[0] ?? '');
    if (!opening) return true;
    const marker = opening[1];
    if (lines.length === 1) return raw.trimEnd().endsWith(marker) && raw.trim().length > marker.length;
    return new RegExp(`^\\s*\\${marker[0]}{${marker.length},}\\s*$`).test(lines.at(-1) ?? '');
  }
  const opening = /^\s*(?:(?:[-+*]|\d+[.)])\s+)?(`{3,}|~{3,})/.exec(lines[0] ?? '');
  if (!opening) return true;
  return lines.length > 1 && new RegExp(`^\\s*${opening[1][0]}{${opening[1].length},}\\s*$`).test(lines.at(-1) ?? '');
}
