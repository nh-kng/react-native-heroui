import MarkdownIt from 'markdown-it';

import { isClosedMarkdownBlock, isNativeMarkdownUrl, markdownRevision, safeMarkdownUrl } from '../../../../../components/markdown/markdown-policy.js';
import type { ASTNode, MarkdownToken } from '../markdown.types.js';
import { mathPlugin } from './math.js';
import { nativeMarkdownTextRules } from './render-rules.js';
import { cleanupTokens } from './util/cleanupTokens.js';
import getTokenTypeByToken from './util/getTokenTypeByToken.js';
import groupTextTokens from './util/groupTextTokens.js';
import omitListItemParagraph from './util/omitListItemParagraph.js';

export function createNativeMarkdownParser() {
  const parser = new MarkdownIt({ html: false, typographer: false, linkify: false });
  parser.validateLink = (url) => safeMarkdownUrl(url) !== '';
  parser.use(mathPlugin);
  return parser;
}

export function tokensToAST(tokens: MarkdownToken[] | null): ASTNode[] {
  const stack: ASTNode[][] = [];
  let children: ASTNode[] = [];
  for (const [tokenIndex, token] of (tokens ?? []).entries()) {
    if (token.nesting === -1) {
      const previous = stack.pop();
      if (!previous) throw new Error('Unbalanced Markdown token stream');
      children = previous;
      continue;
    }
    const node: ASTNode = {
      type: getTokenTypeByToken(token), sourceType: token.type, sourceInfo: token.info,
      sourceMeta: token.meta, block: token.block, markup: token.markup,
      key: '', revision: '', content: token.content, tokenIndex, index: children.length,
      attributes: Object.fromEntries((token.attrs ?? []).map(([name, value]) => [name, String(value)])), children: tokensToAST(token.children),
      map: token.map, isComplete: true,
    };
    if (node.type === 'text' && node.content === '' && node.children.length === 0) continue;
    children.push(node);
    if (token.nesting === 1) {
      stack.push(children);
      children = node.children;
    }
  }
  if (stack.length) throw new Error('Unbalanced Markdown token stream');
  return children;
}

export function parseMarkdownNative(source: string, isStreaming = false, parser = createNativeMarkdownParser()): ASTNode[] {
  const tokens = omitListItemParagraph(groupTextTokens(cleanupTokens(parser.parse(source, {}))));
  const tree = tokensToAST(tokens);
  const lines = source.split('\n');
  function identify(nodes: ASTNode[], path: string) {
    const counts = new Map<string, number>();
    for (const node of nodes) {
      const index = counts.get(node.type) ?? 0;
      counts.set(node.type, index + 1);
      node.key = `${path}/${node.type}:${index}`;
      if (node.type === 'image' && !isNativeMarkdownUrl(node.attributes.src ?? '', true)) node.attributes.src = '';
      if (node.type === 'link' || node.type === 'blocklink') node.attributes.href = safeMarkdownUrl(node.attributes.href ?? '');
      const raw = node.map ? lines.slice(node.map[0], node.map[1]).join('\n') : node.content;
      node.revision = markdownRevision(raw);
      if (isStreaming && (node.type === 'fence' || node.type === 'math_block')) {
        node.isComplete = isClosedMarkdownBlock(raw, node.type === 'fence' ? 'code' : 'math');
      }
      identify(node.children, node.key);
      if (nativeMarkdownTextRules.has(node.type) && node.children.some((child) => child.block)) node.block = true;
    }
  }
  identify(tree, 'markdown');
  return tree;
}
