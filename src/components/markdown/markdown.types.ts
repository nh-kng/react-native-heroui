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

export type MarkdownWebProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'className' | 'dangerouslySetInnerHTML' | 'ref'
> & { allowRawHtml?: boolean };

export type MarkdownNativeProps = Omit<ViewProps, 'children' | 'className' | 'ref'>;

export interface MarkdownProps {
  children: string;
  className?: string;
  isStreaming?: boolean;
  onLinkPress?: (url: string) => boolean | void;
  renderCodeBlock?: (context: MarkdownCodeBlockContext) => MarkdownRenderResult;
  renderMath?: (context: MarkdownMathContext) => MarkdownRenderResult;
  renderMermaid?: (context: MarkdownCodeBlockContext) => MarkdownRenderResult;
  webProps?: MarkdownWebProps;
  nativeProps?: MarkdownNativeProps;
}
