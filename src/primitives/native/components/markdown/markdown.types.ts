import type MarkdownIt from 'markdown-it';

import type { CalloutMetadata } from '../../../../components/markdown/callout.types.js';

export type ParserToken = ReturnType<MarkdownIt['parse']>[number];

export interface MarkdownToken {
  type: string;
  tag: string;
  nesting: number;
  block: boolean;
  content: string;
  info: string;
  markup: string;
  attrs: [string, string][] | null;
  children: MarkdownToken[] | null;
  map: [number, number] | null;
  meta: unknown;
}

export interface ASTNode {
  callout?: CalloutMetadata;
  type: string;
  sourceType: string;
  sourceInfo: string;
  sourceMeta: unknown;
  block: boolean;
  markup: string;
  key: string;
  revision: string;
  content: string;
  tokenIndex: number;
  index: number;
  attributes: Record<string, string>;
  children: ASTNode[];
  map: [number, number] | null;
  isComplete: boolean;
}
