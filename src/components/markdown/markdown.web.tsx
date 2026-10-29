import type { MarkdownProps } from './markdown.types.js';
import { Markdown as OwnedMarkdown } from '../../primitives/web/components/markdown/index.js';

export function Markdown(props: MarkdownProps) {
  return <OwnedMarkdown {...props} />;
}
