import { Markdown } from '@nh-kng/react-native-heroui';
import { Markdown as SubpathMarkdown } from '@nh-kng/react-native-heroui/markdown';
import type { MarkdownProps, MarkdownCodeBlockContext, MarkdownMathContext } from '@nh-kng/react-native-heroui/markdown';

const code = (context: MarkdownCodeBlockContext) => `${context.id}:${context.revision}:${context.language}:${context.isComplete}:${context.source}`;
const math = (context: MarkdownMathContext) => `${context.mode}:${context.source}`;
export const valid: MarkdownProps = {
  classNames: { heading: 'text-accent', codeBlock: 'rounded-xl', tableHeader: 'bg-surface' },
  onCopyCode: async ({ source }) => { await Promise.resolve(source); },
  onCopySuccess: ({ id }) => { void id; },
  onCopyError: (error, { source }) => { void error; void source; },
  children: '# source', className: 'custom', isStreaming: true,
  onLinkPress: (url) => url.startsWith('https:'), renderCodeBlock: code, renderMermaid: code, renderMath: (context, presentation) => `${math(context)}:${presentation.theme.foreground}:${presentation.className}`,
  webProps: { allowRawHtml: true, id: 'markdown', style: { maxWidth: 500 } },
  nativeProps: { testID: 'markdown', style: { padding: 8 }, accessibilityLabel: 'Article' },
};
export const consumers = <><Markdown {...valid} /><SubpathMarkdown>**source**</SubpathMarkdown></>;
// @ts-expect-error Markdown input must be a string.
export const invalidChildren = <Markdown>{123}</Markdown>;
// @ts-expect-error children is required.
export const missingChildren = <Markdown />;
// @ts-expect-error Appearance variants are not part of the contract.
export const invalidTone = <Markdown tone="danger">source</Markdown>;
// @ts-expect-error Container refs are not part of the shared API.
export const invalidRef = <Markdown ref={null}>source</Markdown>;
// @ts-expect-error Shared children cannot be overridden.
export const invalidWeb: MarkdownProps = { children: '', webProps: { children: '' } };
// @ts-expect-error Class names are owned.
export const invalidNative: MarkdownProps = { children: '', nativeProps: { className: 'override' } };
// @ts-expect-error Raw HTML must pass the owned sanitizer pipeline.
export const invalidHtml: MarkdownProps = { children: '', webProps: { dangerouslySetInnerHTML: { __html: '' } } };
// @ts-expect-error Renderer maps are adapter-owned.
export const invalidRules: MarkdownProps = { children: '', nativeProps: { rules: {} } };
// @ts-expect-error Consumer parser plugins cannot bypass pipeline policy.
export const invalidPlugins: MarkdownProps = { children: '', webProps: { rehypePlugins: [] } };
// @ts-expect-error Renderer callbacks must be synchronous.
export const invalidAsync: MarkdownProps = { children: '', renderMath: async () => 'math' };

// @ts-expect-error Slot names are a closed public inventory.
export const invalidSlot: MarkdownProps = { children: '', classNames: { imaginary: 'x' } };
// @ts-expect-error Copy services must complete without returning replacement content.
export const invalidCopy: MarkdownProps = { children: '', onCopyCode: () => 'copied' };
