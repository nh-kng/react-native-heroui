import { useMemo } from 'react';
import { View } from 'react-native';


import { renderMarkdownNative } from './lib/ast-renderer.js';
import { createNativeMarkdownParser, parseMarkdownNative } from './lib/parser.js';
import { markdownClass } from '../../../../components/markdown/markdown-presentation.js';
import type { MarkdownProps } from '../../../../components/markdown/markdown.types.js';
import { useThemeColor } from '../../helpers/external/hooks/use-theme-color.js';

export function Markdown(props: MarkdownProps) {
  const { children, className, isStreaming = false, nativeProps } = props;
  const [foreground, muted, surface, border, accent, link] = useThemeColor(['foreground', 'muted', 'surface', 'border', 'accent', 'link']);
  const parser = useMemo(() => createNativeMarkdownParser(), []);
  const tree = useMemo(() => parseMarkdownNative(children, isStreaming, parser), [children, isStreaming, parser]);
  return <View {...nativeProps} className={markdownClass('root', props.classNames, className)}>{renderMarkdownNative(tree, props, { foreground, muted, surface, border, accent, link })}</View>;
}
