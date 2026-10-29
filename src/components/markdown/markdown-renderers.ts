import type { ReactNode } from 'react';

import type { MarkdownCodeBlockContext, MarkdownMathContext, MarkdownProps } from './markdown.types.js';

export function resolveMarkdownReplacement(
  context: MarkdownCodeBlockContext | MarkdownMathContext,
  options: Pick<MarkdownProps, 'renderCodeBlock' | 'renderMath' | 'renderMermaid'>
): ReactNode {
  if (!context.isComplete) return undefined;
  if ('mode' in context) return options.renderMath?.(context);
  if (context.language?.toLowerCase() === 'mermaid') {
    const diagram = options.renderMermaid?.(context);
    if (diagram !== undefined) return diagram;
  }
  return options.renderCodeBlock?.(context);
}
