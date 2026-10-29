import { useMemo } from 'react';
import { View } from 'react-native';

import { renderMarkdownNative } from './lib/ast-renderer.js';
import { createNativeMarkdownParser, parseMarkdownNative } from './lib/parser.js';
import type { MarkdownProps } from '../../../../components/markdown/markdown.types.js';

export function Markdown(props: MarkdownProps) {
  const { children, className, isStreaming = false, nativeProps } = props;
  const parser = useMemo(() => createNativeMarkdownParser(), []);
  const tree = useMemo(() => parseMarkdownNative(children, isStreaming, parser), [children, isStreaming, parser]);
  return <View {...nativeProps} className={className}>{renderMarkdownNative(tree, props)}</View>;
}
