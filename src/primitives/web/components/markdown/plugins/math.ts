import type {} from 'remark-stringify';
import { mathFromMarkdown, mathToMarkdown } from 'mdast-util-math';
import type { ToOptions } from 'mdast-util-math';
import { math } from 'micromark-extension-math';
import type { Processor } from 'unified';

export default function remarkMath(this: Processor, options?: ToOptions) {
  const data = this.data();
  (data.micromarkExtensions ??= []).push(math(options));
  (data.fromMarkdownExtensions ??= []).push(mathFromMarkdown());
  (data.toMarkdownExtensions ??= []).push(mathToMarkdown(options));
}
