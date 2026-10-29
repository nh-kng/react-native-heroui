import type { Blockquote, Nodes, Root } from 'mdast';
import type { Handler } from 'mdast-util-to-hast';
import { visit } from 'unist-util-visit';

import type { CalloutMetadata } from '../../../../../components/markdown/callout.types.js';
import {
  maskCalloutMarkers,
  transformCalloutParagraph,
} from '../../../../../components/markdown/markdown-callouts.js';

export interface MarkdownCalloutNode {
  type: 'callout';
  children: Blockquote['children'];
  position?: Blockquote['position'];
  callout: CalloutMetadata;
}

declare module 'mdast' {
  interface BlockContentMap {
    callout: MarkdownCalloutNode;
  }
  interface RootContentMap {
    callout: MarkdownCalloutNode;
  }
}

export function transformWebCallouts(
  tree: Root,
  source: string,
  parse: (source: string) => Root
): Root {
  const metadata = new Map<number, { callout: CalloutMetadata; paragraph: boolean }>();
  const markers: number[] = [];
  const paragraphs = new Set<number>();
  visit(tree, 'blockquote', (node) => {
    const first = node.children[0];
    if (!first || !['paragraph', 'heading', 'table'].includes(first.type)) return;
    const inline =
      first.type === 'table'
        ? first.children[0]?.children[0]?.children[0]
        : first.type === 'paragraph' || first.type === 'heading'
          ? first.children[0]
          : undefined;
    if (
      inline?.type !== 'text' ||
      inline.position?.start.line !== node.position?.start.line ||
      inline.position?.start.offset !== first.position?.start.offset
    )
      return;
    const start = inline.position?.start.offset;
    const quoteStart = node.position?.start.offset;
    if (start === undefined || quoteStart === undefined) return;
    const result = transformCalloutParagraph(source.slice(start), true);
    if (!result) return;
    metadata.set(quoteStart, { callout: result.callout, paragraph: first.type === 'paragraph' });
    markers.push(start);
    if (first.type === 'paragraph') paragraphs.add(start);
  });
  if (!markers.length) return tree;
  const result = parse(maskCalloutMarkers(source, markers, paragraphs));
  visit(result, 'blockquote', (node, index, parent) => {
    const info =
      node.position?.start.offset === undefined
        ? undefined
        : metadata.get(node.position.start.offset);
    if (info && parent && index !== undefined) {
      const paragraph = node.children[0];
      if (info.paragraph && paragraph?.type === 'paragraph') {
        const text = paragraph.children[0];
        if (text?.type === 'text') {
          const newline = text.value.indexOf('\n');
          if (newline === -1) paragraph.children.shift();
          else text.value = text.value.slice(newline + 1);
          if (text.type === 'text' && !text.value) paragraph.children.shift();
        }
        if (!paragraph.children.length) node.children.shift();
      }
      parent.children[index] = {
        type: 'callout',
        position: node.position,
        children: node.children,
        callout: info.callout,
      };
    }
  });
  return result;
}

export const calloutHandler: Handler = (state, node: Nodes) => {
  const result = {
    type: 'element' as const,
    tagName: 'div',
    properties: {},
    children: state.all(node),
  };
  state.patch(node, result);
  return result;
};
