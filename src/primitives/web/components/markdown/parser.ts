import type { Element, Root } from 'hast';
import { urlAttributes } from 'html-url-attributes';
import type { Root as MdastRoot, RootContent } from 'mdast';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { VFile } from 'vfile';

import type { MarkdownMetadata } from './markdown.types.js';
import { calloutHandler, transformWebCallouts } from './plugins/callouts.js';
import type { CalloutMetadata } from '../../../../components/markdown/callout.types.js';
import remarkDelimiters, { normalizeBracketMath } from './plugins/delimiters.js';
import remarkGfm from './plugins/gfm.js';
import remarkMath from './plugins/math.js';
import rehypeRaw from './plugins/raw.js';
import rehypeSanitize from './plugins/sanitize.js';
import { isClosedMarkdownBlock, markdownContext, safeMarkdownUrl } from '../../../../components/markdown/markdown-policy.js';

export function createMarkdownProcessor(allowRawHtml = false) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath, { singleDollarTextMath: false })
    .use(remarkDelimiters)
    .use(remarkRehype, { allowDangerousHtml: true, handlers: { callout: calloutHandler } });
  if (allowRawHtml) processor.use(rehypeRaw).use(rehypeSanitize);
  return processor.freeze();
}

export function parseMarkdownWeb(
  source: string,
  isStreaming = false,
  processor = createMarkdownProcessor()
) {
  const file = new VFile(source);
  const mdast = transformWebCallouts(processor.parse(file), source, (masked) => processor.parse(masked));
  normalizeBracketMath(mdast, source);
  const calloutMetadata = new Map<number, CalloutMetadata>();
  const metadata = new Map<number, MarkdownMetadata>();
  function annotate(parent: MdastRoot | RootContent, path: string) {
    if (parent.type === 'callout' && parent.position?.start.offset !== undefined) {
      calloutMetadata.set(parent.position.start.offset, parent.callout);
    }
    if (parent.type === 'code' || parent.type === 'math' || parent.type === 'inlineMath') {
      const start = parent.position?.start.offset;
      const end = parent.position?.end.offset;
      if (start !== undefined && end !== undefined) {
        const kind = parent.type === 'code' ? 'code' : 'math';
        const raw = source.slice(start, end);
        const isComplete = !isStreaming || isClosedMarkdownBlock(raw, kind);
        const common = markdownContext(parent.value, path, isComplete);
        metadata.set(start, {
          kind,
          context: parent.type === 'code'
            ? { ...common, language: parent.lang ?? undefined }
            : { ...common, mode: parent.type === 'inlineMath' ? 'inline' : 'display' },
        });
      }
    }
    if ('children' in parent) {
      const counts = new Map<string, number>();
      for (const child of parent.children) {
        const index = counts.get(child.type) ?? 0;
        counts.set(child.type, index + 1);
        annotate(child, `${path}/${child.type}:${index}`);
      }
    }
  }
  annotate(mdast, 'markdown');
  const tree: Root = processor.runSync(mdast, file);
  const elements = new WeakMap<Element, MarkdownMetadata>();
  const callouts = new WeakMap<Element, CalloutMetadata>();
  visit(tree, (node, index, parent) => {
    if (node.type === 'raw' && parent && typeof index === 'number') {
      parent.children[index] = { type: 'text', value: node.value };
      return index;
    }
    if (node.type !== 'element') return undefined;
    const start = node.position?.start.offset;
    const callout = start === undefined ? undefined : calloutMetadata.get(start);
    if (callout && node.tagName === 'div') callouts.set(node, callout);
    const info = start === undefined ? undefined : metadata.get(start);
    if (info && ['pre', 'code', 'div'].includes(node.tagName)) elements.set(node, info);
    for (const key of Object.keys(urlAttributes)) {
      const tags = urlAttributes[key];
      if (Object.hasOwn(node.properties, key) && (tags === null || tags?.includes(node.tagName))) {
        node.properties[key] = safeMarkdownUrl(String(node.properties[key] ?? ''), key === 'src');
      }
    }
    return undefined;
  });
  return { tree, elements, metadata, callouts };
}
