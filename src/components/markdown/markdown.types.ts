import type { HTMLAttributes, ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export type MarkdownRenderResult = Exclude<ReactNode, Promise<unknown>>;

export interface MarkdownBlockContext {
  source: string;
  id: string;
  revision: string;
  isComplete: boolean;
}

export interface MarkdownCodeBlockContext extends MarkdownBlockContext {
  language: string | undefined;
}

export interface MarkdownMathContext extends MarkdownBlockContext {
  mode: 'inline' | 'display';
}

export type MarkdownSlot =
  | 'root'
  | 'heading'
  | 'paragraph'
  | 'inlineCode'
  | 'codeBlock'
  | 'codeHeader'
  | 'codeText'
  | 'copyButton'
  | 'link'
  | 'quote'
  | 'callout'
  | 'calloutHeader'
  | 'calloutIcon'
  | 'calloutTitle'
  | 'calloutBody'
  | 'list'
  | 'listItem'
  | 'listMarker'
  | 'taskMarker'
  | 'table'
  | 'tableRow'
  | 'tableHeader'
  | 'tableCell'
  | 'image'
  | 'separator'
  | 'math'
  | 'mermaid';
export type MarkdownClassNames = Partial<Record<MarkdownSlot, string>>;

export interface MarkdownTheme {
  foreground: string;
  muted: string;
  surface: string;
  border: string;
  accent: string;
  link: string;
}

export interface MarkdownPresentation {
  className: string;
  theme: MarkdownTheme;
}

export type MarkdownWebProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'className' | 'dangerouslySetInnerHTML' | 'ref'
> & { allowRawHtml?: boolean };

export type MarkdownNativeProps = Omit<ViewProps, 'children' | 'className' | 'ref'>;

export interface MarkdownProps {
  children: string;
  className?: string;
  classNames?: MarkdownClassNames;
  isStreaming?: boolean;
  onLinkPress?: (url: string) => boolean | void;
  onCopyCode?: (context: MarkdownCodeBlockContext) => void | Promise<void>;
  onCopySuccess?: (context: MarkdownCodeBlockContext) => void;
  onCopyError?: (error: unknown, context: MarkdownCodeBlockContext) => void;
  renderCodeBlock?: (
    context: MarkdownCodeBlockContext,
    presentation: MarkdownPresentation
  ) => MarkdownRenderResult;
  renderMath?: (
    context: MarkdownMathContext,
    presentation: MarkdownPresentation
  ) => MarkdownRenderResult;
  renderMermaid?: (
    context: MarkdownCodeBlockContext,
    presentation: MarkdownPresentation
  ) => MarkdownRenderResult;
  webProps?: MarkdownWebProps;
  nativeProps?: MarkdownNativeProps;
}
