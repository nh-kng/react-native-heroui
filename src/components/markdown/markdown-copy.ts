import type { MarkdownCodeBlockContext, MarkdownProps } from './markdown.types.js';

export async function copyMarkdownCode(
  context: MarkdownCodeBlockContext,
  options: Pick<MarkdownProps, 'onCopyCode' | 'onCopySuccess' | 'onCopyError'>,
  writeText?: (source: string) => Promise<void>
): Promise<boolean> {
  if (!context.isComplete) return false;
  try {
    if (options.onCopyCode) await options.onCopyCode(context);
    else if (writeText) await writeText(context.source);
    else return false;
  } catch (error) {
    options.onCopyError?.(error, context);
    return false;
  }
  options.onCopySuccess?.(context);
  return true;
}
