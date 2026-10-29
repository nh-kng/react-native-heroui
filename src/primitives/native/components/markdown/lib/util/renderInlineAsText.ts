import type { MarkdownToken } from '../../markdown.types.js';
export default function renderInlineAsText(tokens: MarkdownToken[] | null): string {
  let result = '';
  if (!tokens) return result;

  for (let i = 0, len = tokens.length; i < len; i++) {
    if (tokens[i].type === 'text') {
      result += tokens[i].content;
    } else if (tokens[i].type === 'image') {
      result += renderInlineAsText(tokens[i].children);
    }
  }

  return result;
}
