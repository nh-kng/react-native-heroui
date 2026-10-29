import type { Element } from 'hast';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { createContext, Fragment, useContext, useMemo } from 'react';
import type { ComponentProps } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

import { createMarkdownProcessor, parseMarkdownWeb } from './parser.js';
import { shouldOpenMarkdownLink } from '../../../../components/markdown/markdown-policy.js';
import { resolveMarkdownReplacement } from '../../../../components/markdown/markdown-renderers.js';
import type { MarkdownProps } from '../../../../components/markdown/markdown.types.js';

const renderingContext = createContext<{
  document: ReturnType<typeof parseMarkdownWeb>;
  options: MarkdownProps;
} | null>(null);

function MarkdownAnchor({ node: _node, ...props }: ComponentProps<'a'> & { node?: Element }) {
  const context = useContext(renderingContext);
  return <a {...props} onClick={(event) => {
    if (!shouldOpenMarkdownLink(props.href ?? '', context?.options.onLinkPress)) event.preventDefault();
  }} />;
}

function MarkdownPre({ node, children, ...props }: ComponentProps<'pre'> & { node?: Element }) {
  const context = useContext(renderingContext);
  const info = node && context?.document.elements.get(node);
  const output = info && context ? resolveMarkdownReplacement(info.context, context.options) : undefined;
  return <Fragment key={info?.context.id}>{output === undefined ? <pre {...props}>{children}</pre> : output}</Fragment>;
}

function MarkdownCode({ node, children, ...props }: ComponentProps<'code'> & { node?: Element }) {
  const context = useContext(renderingContext);
  const info = node && context?.document.elements.get(node);
  if (info && context && 'mode' in info.context && info.context.mode === 'inline') {
    const output = resolveMarkdownReplacement(info.context, context.options);
    return <Fragment key={info.context.id}>{output === undefined ? <code {...props}>{children}</code> : output}</Fragment>;
  }
  return <code {...props}>{children}</code>;
}

const components = { a: MarkdownAnchor, pre: MarkdownPre, code: MarkdownCode };

export function Markdown(props: MarkdownProps) {
  const { children, className, isStreaming = false, webProps } = props;
  const { allowRawHtml = false, ...rootProps } = webProps ?? {};
  const processor = useMemo(() => createMarkdownProcessor(allowRawHtml), [allowRawHtml]);
  const document = useMemo(() => parseMarkdownWeb(children, isStreaming, processor), [children, isStreaming, processor]);
  const output = toJsxRuntime(document.tree, {
    Fragment, jsx, jsxs, components, passKeys: true, passNode: true, ignoreInvalidStyle: true,
  });
  return <div {...rootProps} className={className}><renderingContext.Provider value={{ document, options: props }}>{output}</renderingContext.Provider></div>;
}
