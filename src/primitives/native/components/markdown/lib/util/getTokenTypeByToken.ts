import type { MarkdownToken } from '../../markdown.types.js';
const regSelectOpenClose = /_open|_close/g;

export default function getTokenTypeByToken(token: MarkdownToken): string {
  let cleanedType = 'unknown';

  if (token.type) {
    cleanedType = token.type.replace(regSelectOpenClose, '');
  }

  switch (cleanedType) {
    case 'heading': {
      cleanedType = `${cleanedType}${token.tag.substr(1)}`;
      break;
    }
    default: {
      break;
    }
  }

  return cleanedType;
}
