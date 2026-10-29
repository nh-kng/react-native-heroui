import { Fragment } from 'react';
import type { ReactNode } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import type { TextStyle } from 'react-native';

import { isNativeMarkdownUrl, markdownContext, shouldOpenMarkdownLink } from '../../../../../components/markdown/markdown-policy.js';
import { resolveMarkdownReplacement } from '../../../../../components/markdown/markdown-renderers.js';
import type { MarkdownCodeBlockContext, MarkdownMathContext, MarkdownProps } from '../../../../../components/markdown/markdown.types.js';
import type { ASTNode } from '../markdown.types.js';
import { MarkdownImage } from './image.js';
import { nativeMarkdownRule } from './render-rules.js';
import { styles } from './styles.js';
import textStyleProps from './text-style-props.js';

function textOnly(style: TextStyle): TextStyle {
  return Object.fromEntries(Object.entries(style).filter(([key]) => textStyleProps.includes(key)));
}

function viewOnly(style: TextStyle) {
  return Object.fromEntries(Object.entries(style).filter(([key]) => !textStyleProps.includes(key)));
}

export function renderMarkdownNative(tree: ASTNode[], options: MarkdownProps): ReactNode {
  function openLink(url: string) {
    if (shouldOpenMarkdownLink(url, options.onLinkPress) && isNativeMarkdownUrl(url)) {
      Linking.openURL(url).catch(() => undefined);
    }
  }
  function render(node: ASTNode, parents: ASTNode[], inherited: TextStyle): ReactNode {
    const style = styles[node.type] ?? {};
    const textStyle = { ...inherited, ...textOnly(style) };
    if (node.type === 'image') return <MarkdownImage key={node.key} source={node.attributes.src ?? ''} alt={node.attributes.alt ?? ''} />;
    const children = node.children.map((child) => render(child, [node, ...parents], textStyle));
    const common = markdownContext(node.content, node.key, node.isComplete);
    if (node.type === 'fence' || node.type === 'code_block') {
      const context: MarkdownCodeBlockContext = { ...markdownContext(node.content.replace(/\n$/, ''), node.key, node.isComplete), language: node.sourceInfo.trim().split(/\s+/)[0] || undefined };
      const replacement = resolveMarkdownReplacement(context, options);
      return <Fragment key={node.key}>{replacement === undefined ? <Text style={[inherited, style]}>{context.source}</Text> : replacement}</Fragment>;
    }
    if (node.type === 'math_inline' || node.type === 'math_block') {
      const context: MarkdownMathContext = { ...common, mode: node.type === 'math_inline' ? 'inline' : 'display' };
      const replacement = resolveMarkdownReplacement(context, options);
      return <Fragment key={node.key}>{replacement === undefined ? <Text style={textStyle}>{node.content}</Text> : replacement}</Fragment>;
    }
    if (node.type === 'link') return <Text key={node.key} style={[textStyle, style]} accessibilityRole="link" onPress={() => openLink(node.attributes.href ?? '')}>{children}</Text>;
    if (node.type === 'blocklink') return <Pressable key={node.key} accessibilityRole="link" onPress={() => openLink(node.attributes.href ?? '')}>{children}</Pressable>;
    if (node.type === 'list_item') {
      const list = parents.find((parent) => parent.type === 'bullet_list' || parent.type === 'ordered_list');
      const marker = list?.type === 'ordered_list' ? `${Number(list.attributes.start ?? 1) + node.index}${node.markup}` : '\u2022';
      return <View key={node.key} style={viewOnly(style)}><Text accessible={false} style={[textStyle, styles.bullet_list_icon]}>{marker}</Text><View style={{ flex: 1 }}>{children}</View></View>;
    }
    if (nativeMarkdownRule(node.type, node.block) === 'text') {
      return <Text key={node.key} style={[inherited, style]}>{node.type === 'text' || node.type === 'code_inline' ? node.content : node.type.endsWith('break') ? '\n' : children}</Text>;
    }
    if (nativeMarkdownRule(node.type) === 'unknown') return null;
    return <View key={node.key} style={viewOnly(style)} accessibilityRole={node.type.startsWith('heading') ? 'header' : undefined}>{children}</View>;
  }
  return tree.map((node) => render(node, [], {}));
}
