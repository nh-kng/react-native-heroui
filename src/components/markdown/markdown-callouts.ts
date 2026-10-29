import type { CalloutMetadata, CalloutType } from './callout.types.js';

const calloutTypes: Record<string, CalloutType | undefined> = {
  NOTE: 'note',
  TIP: 'tip',
  IMPORTANT: 'important',
  WARNING: 'warning',
  CAUTION: 'caution',
};

export interface CalloutTransformation {
  callout: CalloutMetadata;
}

export function maskCalloutMarkers(
  source: string,
  offsets: readonly number[],
  paragraphs: ReadonlySet<number>
): string {
  const characters = source.split('');
  for (const start of offsets) {
    for (let index = start; index < characters.length && characters[index] !== '\n'; index++) {
      if (characters[index] !== '\r') characters[index] = paragraphs.has(start) ? 'x' : ' ';
    }
  }
  return characters.join('');
}

export function transformCalloutParagraph(
  source: string,
  firstInlineIsText: boolean
): CalloutTransformation | undefined {
  if (!firstInlineIsText) return undefined;
  const newline = source.indexOf('\n');
  const line = (newline === -1 ? source : source.slice(0, newline)).replace(/\r$/, '');
  const match = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:[ \t]+(.+))?$/.exec(line);
  const type = match && calloutTypes[match[1]];
  if (!match || !type) return undefined;
  return {
    callout: { type, ...(match[2] === undefined ? {} : { title: match[2] }) },
  };
}
