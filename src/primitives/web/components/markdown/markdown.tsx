import type { Element } from 'hast';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import {
  createContext,
  createElement,
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ComponentProps, HTMLAttributes } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

import { createMarkdownProcessor, parseMarkdownWeb } from './parser.js';
import { Button } from '../../../../components/button/button.web.js';
import { copyMarkdownCode } from '../../../../components/markdown/markdown-copy.js';
import { shouldOpenMarkdownLink } from '../../../../components/markdown/markdown-policy.js';
import { markdownClass } from '../../../../components/markdown/markdown-presentation.js';
import { resolveMarkdownReplacement } from '../../../../components/markdown/markdown-renderers.js';
import type {
  MarkdownCodeBlockContext,
  MarkdownProps,
  MarkdownSlot,
} from '../../../../components/markdown/markdown.types.js';
import { Separator } from '../../../../components/separator/separator.web.js';
import { Typography } from '../../../../components/typography/typography.web.js';

const renderingContext = createContext<{
  document: ReturnType<typeof parseMarkdownWeb>;
  options: MarkdownProps;
} | null>(null);

type ElementProps = HTMLAttributes<HTMLElement> & { node?: Element };
const listContext = createContext<{ ordered: boolean; start: number; items: Element[] } | null>(
  null
);
function useSlot(slot: MarkdownSlot, className?: string) {
  return markdownClass(slot, useContext(renderingContext)?.options.classNames, className);
}

function element(
  tag: 'blockquote' | 'ul' | 'ol' | 'li' | 'table' | 'tr' | 'th' | 'td',
  slot: MarkdownSlot
) {
  return function MarkdownElement({ node: _node, className, ...props }: ElementProps) {
    return createElement(tag, { ...props, className: useSlot(slot, className) });
  };
}
function heading(type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') {
  return function MarkdownHeading({ node: _node, className, ...props }: ElementProps) {
    return (
      <Typography.Heading type={type} className={useSlot('heading', className)} webProps={props}>
        {props.children}
      </Typography.Heading>
    );
  };
}
function MarkdownParagraph({ node: _node, className, children, ...props }: ElementProps) {
  return (
    <Typography.Paragraph className={useSlot('paragraph', className)} webProps={props}>
      {children}
    </Typography.Paragraph>
  );
}
function MarkdownSeparator({ node: _node, className }: ElementProps) {
  return <Separator className={useSlot('separator', className)} />;
}
function MarkdownAnchor({
  node: _node,
  className,
  ...props
}: ComponentProps<'a'> & { node?: Element }) {
  const context = useContext(renderingContext);
  return (
    <a
      {...props}
      className={useSlot('link', className)}
      onClick={(event) => {
        if (!shouldOpenMarkdownLink(props.href ?? '', context?.options.onLinkPress))
          event.preventDefault();
      }}
    />
  );
}
function MarkdownImage({
  node: _node,
  className,
  alt = '',
  src,
  ...props
}: ComponentProps<'img'> & { node?: Element }) {
  const [failed, setFailed] = useState<string>();
  const slot = useSlot('image', className);
  if (!src || failed === src)
    return (
      <span className={slot} role="img" aria-label={alt}>
        {alt}
      </span>
    );
  return (
    <img
      {...props}
      className={slot}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(src)}
    />
  );
}
function MarkdownTask({
  node: _node,
  className,
  ...props
}: ComponentProps<'input'> & { node?: Element }) {
  return (
    <span className="markdown__task-control">
      <input
        {...props}
        className={useSlot('taskMarker', className)}
        type="checkbox"
        disabled
        aria-label={props.checked ? 'Completed task' : 'Incomplete task'}
      />
      <span className="markdown__task-check" aria-hidden="true" />
    </span>
  );
}

function list(tag: 'ul' | 'ol') {
  return function MarkdownList({
    node,
    className,
    ...props
  }: ComponentProps<'ol'> & { node?: Element }) {
    const items =
      node?.children.filter(
        (child): child is Element => child.type === 'element' && child.tagName === 'li'
      ) ?? [];
    const slot = useSlot('list', className);
    return (
      <listContext.Provider value={{ ordered: tag === 'ol', start: props.start ?? 1, items }}>
        {createElement(tag, { ...props, className: slot })}
      </listContext.Provider>
    );
  };
}
function hasTask(node: Element | undefined): boolean {
  return !!node?.children.some(
    (child) =>
      child.type === 'element' &&
      (child.tagName === 'input' || (child.tagName === 'p' && hasTask(child)))
  );
}
function MarkdownListItem({ node, className, children, ...props }: ElementProps) {
  const list = useContext(listContext);
  const marker = list?.ordered
    ? `${list.start + Math.max(0, node ? list.items.indexOf(node) : 0)}.`
    : '\u2022';
  const markerClass = useSlot(
    'listMarker',
    list?.ordered ? undefined : 'markdown__list-marker--bullet'
  );
  return (
    <li {...props} className={useSlot('listItem', className)}>
      {!hasTask(node) && (
        <span className={markerClass} aria-hidden="true">
          {marker}
        </span>
      )}
      {children}
    </li>
  );
}

function CodeBlock({
  context,
  options,
}: {
  context: MarkdownCodeBlockContext;
  options: MarkdownProps;
}) {
  const [clipboardAvailable, setClipboardAvailable] = useState(false);
  useEffect(() => {
    setClipboardAvailable(
      typeof navigator !== 'undefined' && typeof navigator.clipboard?.writeText === 'function'
    );
  }, []);
  const [state, setState] = useState<{
    revision: string;
    status: 'copying' | 'copied' | 'failed';
  }>();
  const status = state?.revision === context.revision ? state.status : undefined;
  const writer =
    typeof navigator !== 'undefined' && navigator.clipboard?.writeText
      ? (source: string) => navigator.clipboard.writeText(source)
      : undefined;
  const copy = async () => {
    setState({ revision: context.revision, status: 'copying' });
    const success = await copyMarkdownCode(context, options, writer);
    setState({ revision: context.revision, status: success ? 'copied' : 'failed' });
  };
  const slot = (name: MarkdownSlot) => markdownClass(name, options.classNames);
  return (
    <div
      className={
        context.language?.toLowerCase() === 'mermaid'
          ? `${slot('codeBlock')} ${slot('mermaid')}`
          : slot('codeBlock')
      }>
      <div className={slot('codeHeader')}>
        <span>{context.language ?? 'Code'}</span>
        {(options.onCopyCode || clipboardAvailable) && (
          <Button
            size="sm"
            variant="ghost"
            className={slot('copyButton')}
            isDisabled={!context.isComplete || status === 'copying'}
            onPress={copy}>
            <Button.Label>
              {status === 'copied' ? 'Copied' : status === 'failed' ? 'Retry copy' : 'Copy'}
            </Button.Label>
          </Button>
        )}
        <span className="markdown__copy-status" role="status">
          {status === 'copied' ? 'Code copied' : status === 'failed' ? 'Copy failed' : ''}
        </span>
      </div>
      <pre className={slot('codeText')}>
        <code>{context.source}</code>
      </pre>
    </div>
  );
}
function MarkdownPre({ node, children, ...props }: ComponentProps<'pre'> & { node?: Element }) {
  const context = useContext(renderingContext);
  const info = node && context?.document.elements.get(node);
  const mathClass = useSlot('math');
  if (!info || !context) return <pre {...props}>{children}</pre>;
  const output = resolveMarkdownReplacement(info.context, context.options);
  return (
    <Fragment key={info.context.id}>
      {output !== undefined ? (
        output
      ) : 'mode' in info.context ? (
        <pre className={`${mathClass} markdown__math--display`}>{info.context.source}</pre>
      ) : (
        <CodeBlock context={info.context} options={context.options} />
      )}
    </Fragment>
  );
}
function MarkdownCode({
  node,
  children,
  className,
  ...props
}: ComponentProps<'code'> & { node?: Element }) {
  const context = useContext(renderingContext);
  const info = node && context?.document.elements.get(node);
  const inlineClass = useSlot('inlineCode', className);
  const mathClass = useSlot('math', className);
  if (info && context && 'mode' in info.context) {
    if (info.context.mode === 'display') return <code {...props}>{children}</code>;
    const output = resolveMarkdownReplacement(info.context, context.options);
    return (
      <Fragment key={info.context.id}>
        {output === undefined ? (
          <code {...props} className={mathClass}>
            {info.context.source}
          </code>
        ) : (
          output
        )}
      </Fragment>
    );
  }
  return (
    <code {...props} className={info ? className : inlineClass}>
      {children}
    </code>
  );
}

export const markdownWebComponents = {
  h1: heading('h1'),
  h2: heading('h2'),
  h3: heading('h3'),
  h4: heading('h4'),
  h5: heading('h5'),
  h6: heading('h6'),
  p: MarkdownParagraph,
  a: MarkdownAnchor,
  pre: MarkdownPre,
  code: MarkdownCode,
  img: MarkdownImage,
  hr: MarkdownSeparator,
  blockquote: element('blockquote', 'quote'),
  ul: list('ul'),
  ol: list('ol'),
  li: MarkdownListItem,
  table: function MarkdownTable({ node: _node, className, ...props }: ElementProps) {
    return (
      <div className="markdown__table-scroll" tabIndex={0} role="region" aria-label="Table">
        <table {...props} className={useSlot('table', className)} />
      </div>
    );
  },
  tr: element('tr', 'tableRow'),
  th: element('th', 'tableHeader'),
  td: element('td', 'tableCell'),
  input: MarkdownTask,
};

export function Markdown(props: MarkdownProps) {
  const { children, className, isStreaming = false, webProps } = props;
  const { allowRawHtml = false, ...rootProps } = webProps ?? {};
  const processor = useMemo(() => createMarkdownProcessor(allowRawHtml), [allowRawHtml]);
  const document = useMemo(
    () => parseMarkdownWeb(children, isStreaming, processor),
    [children, isStreaming, processor]
  );
  const output = toJsxRuntime(document.tree, {
    Fragment,
    jsx,
    jsxs,
    components: markdownWebComponents,
    passKeys: true,
    passNode: true,
    ignoreInvalidStyle: true,
  });
  return (
    <div {...rootProps} className={markdownClass('root', props.classNames, className)}>
      <renderingContext.Provider value={{ document, options: props }}>
        {output}
      </renderingContext.Provider>
    </div>
  );
}
