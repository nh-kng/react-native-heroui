import flattenInlineTokens from './flattenInlineTokens.js';
import getTokenTypeByToken from './getTokenTypeByToken.js';
import renderInlineAsText from './renderInlineAsText.js';
import type { MarkdownToken } from '../../markdown.types.js';

export function cleanupTokens(tokens: MarkdownToken[]): MarkdownToken[] {
  tokens = flattenInlineTokens(tokens);
  tokens.forEach((token) => {
    token.type = getTokenTypeByToken(token);

    // set image and hardbreak to block elements
    if (token.type === 'image' || token.type === 'hardbreak') {
      token.block = true;
    }

    // Set img alt text
    if (token.type === 'image') {
      const alt = renderInlineAsText(token.children);
      token.attrs = [...(token.attrs ?? []).filter(([name]) => name !== 'alt'), ['alt', alt]];
    }
  });

    const stack: MarkdownToken[] = [];
  tokens = tokens.reduce<MarkdownToken[]>((acc, token, index) => {
    if (token.type === 'link' && token.nesting === 1) {
      stack.push(token);
    } else if (
      stack.length > 0 &&
      token.type === 'link' &&
      token.nesting === -1
    ) {
      if (stack.some((stackToken) => stackToken.block)) {
        stack[0].type = 'blocklink';
        stack[0].block = true;
        token.type = 'blocklink';
        token.block = true;
      }

      stack.push(token);

      while (stack.length) {
        const item = stack.shift();
        if (item) acc.push(item);
      }
    } else if (stack.length > 0) {
      stack.push(token);
    } else {
      acc.push(token);
    }

    return acc;
  }, []);

  return tokens;
}
