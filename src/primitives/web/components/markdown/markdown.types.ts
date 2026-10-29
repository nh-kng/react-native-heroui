import type { Element } from 'hast';

import type { MarkdownCodeBlockContext, MarkdownMathContext } from '../../../../components/markdown/markdown.types.js';

export type MarkdownContext = MarkdownCodeBlockContext | MarkdownMathContext;
export interface MarkdownMetadata {
  kind: 'code' | 'math';
  context: MarkdownContext;
}
export type MarkdownElement = Element;
