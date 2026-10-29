import Token from './Token.js';
import type { MarkdownToken } from '../../markdown.types.js';

export default function groupTextTokens(tokens: MarkdownToken[]): MarkdownToken[] {
  const result: MarkdownToken[] = [];

  let hasGroup = false;
  let inlineDepth = 0;

  tokens.forEach((token) => {
    if (!token.block && !hasGroup) {
      hasGroup = true;
      result.push(new Token('textgroup', 1));
      result.push(token);
    } else if (!token.block && hasGroup) {
      result.push(token);
    } else if (token.block && hasGroup && inlineDepth === 0) {
      hasGroup = false;
      result.push(new Token('textgroup', -1));
      result.push(token);
    } else {
      result.push(token);
    }
    if (!token.block) inlineDepth += token.nesting;
  });

  if (hasGroup) result.push(new Token('textgroup', -1));
  return result;
}
