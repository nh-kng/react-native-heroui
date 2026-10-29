import type { Root } from 'hast';
import { raw } from 'hast-util-raw';
import type { VFile } from 'vfile';

export default function rehypeRaw() {
  return (tree: Root, file: VFile): Root => {
    const result = raw(tree, { file });
    if (result.type !== 'root') throw new Error('Expected Markdown root');
    return result;
  };
}
