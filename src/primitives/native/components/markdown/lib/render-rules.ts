export const nativeMarkdownTextRules = new Set([
  'text', 'textgroup', 'strong', 'em', 's', 'code_inline', 'link', 'softbreak',
  'hardbreak', 'inline', 'span', 'math_inline',
]);

export const nativeMarkdownBlockRules = new Set([
  'body', 'heading1', 'heading2', 'heading3', 'heading4', 'heading5', 'heading6',
  'hr', 'blockquote', 'bullet_list', 'ordered_list', 'list_item', 'code_block',
  'fence', 'table', 'thead', 'tbody', 'th', 'tr', 'td', 'blocklink', 'image',
  'paragraph', 'pre', 'math_block',
]);

export function nativeMarkdownRule(type: string, block = false): 'text' | 'block' | 'unknown' {
  if (nativeMarkdownTextRules.has(type)) return block ? 'block' : 'text';
  return nativeMarkdownBlockRules.has(type) ? 'block' : 'unknown';
}
