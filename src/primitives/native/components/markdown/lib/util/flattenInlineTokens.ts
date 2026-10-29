import type { MarkdownToken } from '../../markdown.types.js';
export default function flattenTokens(tokens: MarkdownToken[]): MarkdownToken[] {
  return tokens.reduce<MarkdownToken[]>((acc, curr) => {
    if (curr.type === 'inline' && curr.children && curr.children.length > 0) {
      const children = flattenTokens(curr.children);
      while (children.length) {
        acc.push(...children);
        children.length = 0;
      }
    } else {
      acc.push(curr);
    }

    return acc;
  }, []);
}
