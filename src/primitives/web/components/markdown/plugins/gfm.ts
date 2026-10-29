import type {} from 'remark-stringify';
import { gfmFromMarkdown, gfmToMarkdown } from 'mdast-util-gfm';
import { gfm } from 'micromark-extension-gfm';
import type { Processor } from 'unified';
import type {} from 'remark-parse';
type Options = NonNullable<Parameters<typeof gfm>[0]> & NonNullable<Parameters<typeof gfmToMarkdown>[0]>;

export default function remarkGfm(this: Processor, options?: Options) {
  const data = this.data();
  (data.micromarkExtensions ??= []).push(gfm(options));
  (data.fromMarkdownExtensions ??= []).push(gfmFromMarkdown());
  (data.toMarkdownExtensions ??= []).push(gfmToMarkdown(options));
}
