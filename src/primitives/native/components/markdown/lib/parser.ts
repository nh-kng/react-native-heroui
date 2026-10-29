import MarkdownIt from 'markdown-it';

import type { CalloutMetadata } from '../../../../../components/markdown/callout.types.js';
import { maskCalloutMarkers, transformCalloutParagraph } from '../../../../../components/markdown/markdown-callouts.js';
import { isClosedMarkdownBlock, isNativeMarkdownUrl, markdownRevision, safeMarkdownUrl } from '../../../../../components/markdown/markdown-policy.js';
import type { ASTNode, MarkdownToken } from '../markdown.types.js';
import { mathPlugin } from './math.js';
import { nativeMarkdownTextRules } from './render-rules.js';
import { taskPlugin } from './tasks.js';
import { cleanupTokens } from './util/cleanupTokens.js';
import getTokenTypeByToken from './util/getTokenTypeByToken.js';
import groupTextTokens from './util/groupTextTokens.js';
import omitListItemParagraph from './util/omitListItemParagraph.js';

export function createNativeMarkdownParser() {
  const parser = new MarkdownIt({ html: false, typographer: false, linkify: false });
  parser.validateLink = (url) => safeMarkdownUrl(url) !== '';
  parser.use(mathPlugin);
  parser.use(taskPlugin);
  return parser;
}

export function tokensToAST(tokens: MarkdownToken[] | null, callouts = new WeakMap<MarkdownToken, CalloutMetadata>()): ASTNode[] {
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
      attributes: Object.fromEntries((token.attrs ?? []).map(([name, value]) => [name, String(value)])), children: tokensToAST(token.children, callouts),
      callout: callouts.get(token),
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
  let parsed = parser.parse(source, {});
  const callouts = new WeakMap<MarkdownToken, CalloutMetadata>();
  const metadata = new Map<string, { callout: CalloutMetadata; paragraph: boolean }>();
  const paragraphs = new Set<number>();
  const markers: number[] = [];
  const lines = source.split('\n');
  const offsets: number[] = [];
  let offset = 0;
  for (const line of lines) {
    offsets.push(offset);
    offset += line.length + 1;
  }
  for (const [index, quote] of parsed.entries()) {
    if (quote.type !== 'blockquote_open' || !quote.map) continue;
    const first = parsed[index + 1];
    if (!first || !['paragraph_open', 'heading_open', 'table_open'].includes(first.type)) continue;
    let inlineIndex = index + 1;
    while (inlineIndex < parsed.length && !['inline', 'blockquote_close'].includes(parsed[inlineIndex].type)) inlineIndex++;
    const inline = parsed[inlineIndex];
    if (inline?.type !== 'inline' || (inline.map?.[0] ?? first.map?.[0]) !== quote.map[0]) continue;
    const firstLine = inline.content.split('\n')[0];
    const column = lines[quote.map[0]].indexOf(firstLine);
    if (column < 0) continue;
    const prefix = lines[quote.map[0]].slice(0, column);
    if (!/^[ \t]*$/.test(prefix.slice(prefix.lastIndexOf('>') + 1))) continue;
    const markerOffset = offsets[quote.map[0]] + column;
    const result = transformCalloutParagraph(source.slice(markerOffset), inline.children?.[0]?.type === 'text');
    if (!result) continue;
    metadata.set(`${quote.map[0]}:${quote.level}`, { callout: result.callout, paragraph: first.type === 'paragraph_open' });
    if (first.type === 'paragraph_open') paragraphs.add(markerOffset);
    markers.push(markerOffset);
  }
  if (markers.length) {
    const env: Record<string, unknown> = {};
    parsed = parser.parse(maskCalloutMarkers(source, markers, paragraphs), env);
    const quotes: typeof parsed = [];
    for (let index = 0; index < parsed.length; index++) {
      const token = parsed[index];
      if (token.type === 'blockquote_open') {
        quotes.push(token);
        const info = token.map && metadata.get(`${token.map[0]}:${token.level}`);
        if (info) {
          token.type = 'callout_open';
          callouts.set(token, info.callout);
          const inline = parsed[index + 2];
          if (info.paragraph && parsed[index + 1]?.type === 'paragraph_open' && inline?.type === 'inline') {
            const newline = inline.content.indexOf('\n');
            if (newline === -1) parsed.splice(index + 1, 3);
            else {
              inline.content = inline.content.slice(newline + 1);
              inline.children = parser.parseInline(inline.content, env)[0]?.children ?? [];
            }
          }
        }
      } else if (token.type === 'blockquote_close') {
        if (quotes.pop()?.type === 'callout_open') token.type = 'callout_close';
      }
    }
  }
  for (const token of parsed) {
    if (token.type === 'paragraph_open' && token.hidden) token.attrSet('data-tight', 'true');
  }
  const tokens = omitListItemParagraph(groupTextTokens(cleanupTokens(parsed)));
  const tree = tokensToAST(tokens, callouts);
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
