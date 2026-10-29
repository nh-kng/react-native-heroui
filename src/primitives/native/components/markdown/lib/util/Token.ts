import type { MarkdownToken } from '../../markdown.types.js';

export default class Token implements MarkdownToken {
  tag = '';
  content = '';
  info = '';
  markup = '';
  attrs = null;
  map = null;
  meta: unknown = null;
  constructor(public type: string, public nesting = 0, public children: MarkdownToken[] | null = null, public block = false) {}
}
