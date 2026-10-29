import type { ReactNode } from 'react';

import { markdownClass, markdownWebTheme } from './markdown-presentation.js';
import type {
  MarkdownCodeBlockContext,
  MarkdownMathContext,
  MarkdownProps,
  MarkdownTheme,
} from './markdown.types.js';

export function resolveMarkdownReplacement(
  context: MarkdownCodeBlockContext | MarkdownMathContext,
  options: Pick<MarkdownProps, 'renderCodeBlock' | 'renderMath' | 'renderMermaid' | 'classNames'>,
  theme: MarkdownTheme = markdownWebTheme
): ReactNode {
  if (!context.isComplete) return undefined;
  if ('mode' in context)
    return options.renderMath?.(context, {
      theme,
      className: `${markdownClass('math', options.classNames)}${context.mode === 'display' ? ' markdown__math--display' : ''}`,
    });
  if (context.language?.toLowerCase() === 'mermaid') {
    const diagram = options.renderMermaid?.(context, {
      theme,
      className: markdownClass('mermaid', options.classNames),
    });
    if (diagram !== undefined) return diagram;
  }
  return options.renderCodeBlock?.(context, {
    theme,
    className: markdownClass('codeBlock', options.classNames),
  });
}
