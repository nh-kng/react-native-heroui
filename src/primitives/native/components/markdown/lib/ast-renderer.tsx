import { Fragment, useState } from 'react';
import type { ReactNode } from 'react';
import { Linking, Pressable, ScrollView, Text, View } from 'react-native';
import type { TextStyle } from 'react-native';

import { MarkdownImage } from './image.js';
import { nativeMarkdownRule } from './render-rules.js';
import { markdownMonospace, markdownStructure } from './styles.js';
import { MarkdownTable } from './table.js';
import { Button } from '../../../../../components/button/button.native.js';
import { copyMarkdownCode } from '../../../../../components/markdown/markdown-copy.js';
import {
  isNativeMarkdownUrl,
  markdownContext,
  shouldOpenMarkdownLink,
} from '../../../../../components/markdown/markdown-policy.js';
import { markdownClass } from '../../../../../components/markdown/markdown-presentation.js';
import { resolveMarkdownReplacement } from '../../../../../components/markdown/markdown-renderers.js';
import type {
  MarkdownCodeBlockContext,
  MarkdownMathContext,
  MarkdownProps,
  MarkdownSlot,
  MarkdownTheme,
} from '../../../../../components/markdown/markdown.types.js';
import { Separator } from '../../../../../components/separator/separator.native.js';
import type { HeadingType } from '../../../../../components/typography/typography-mapping.js';
import { Typography } from '../../../../../components/typography/typography.native.js';
import type { ASTNode } from '../markdown.types.js';

function CodeBlock({
  context,
  options,
}: {
  context: MarkdownCodeBlockContext;
  options: MarkdownProps;
}) {
  const [state, setState] = useState<{
    revision: string;
    status: 'copying' | 'copied' | 'failed';
  }>();
  const status = state?.revision === context.revision ? state.status : undefined;
  const slot = (name: MarkdownSlot) => markdownClass(name, options.classNames);
  const copy = async () => {
    setState({ revision: context.revision, status: 'copying' });
    const success = await copyMarkdownCode(context, options);
    setState({ revision: context.revision, status: success ? 'copied' : 'failed' });
  };
  return (
    <View
      className={
        context.language?.toLowerCase() === 'mermaid'
          ? `${slot('codeBlock')} ${slot('mermaid')}`
          : slot('codeBlock')
      }>
      <View className={slot('codeHeader')}>
        <Typography.Paragraph type="body-xs" color="muted">
          {context.language ?? 'Code'}
        </Typography.Paragraph>
        {options.onCopyCode && (
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
        {status === 'failed' && <Text accessibilityLiveRegion="polite">Copy failed</Text>}
      </View>
      <ScrollView horizontal nestedScrollEnabled>
        <Text selectable className={slot('codeText')} style={markdownMonospace}>
          {context.source}
        </Text>
      </ScrollView>
    </View>
  );
}

const headingTypes: Record<string, HeadingType> = {
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  heading5: 'h5',
  heading6: 'h6',
};

export function renderMarkdownNative(
  tree: ASTNode[],
  options: MarkdownProps,
  theme: MarkdownTheme
): ReactNode {
  const slot = (name: MarkdownSlot) => markdownClass(name, options.classNames);
  function openLink(url: string) {
    if (shouldOpenMarkdownLink(url, options.onLinkPress) && isNativeMarkdownUrl(url)) {
      Linking.openURL(url).catch(() => undefined);
    }
  }
  function render(
    node: ASTNode,
    parents: ASTNode[],
    inText = false,
    inherited: TextStyle = {}
  ): ReactNode {
    const textStyle = {
      ...inherited,
      ...(node.type === 'strong'
        ? markdownStructure.strong
        : node.type === 'em'
          ? markdownStructure.emphasis
          : node.type === 's'
            ? markdownStructure.strike
            : {}),
    };
    const children = (inside = false) =>
      node.children.map((child) => render(child, [node, ...parents], inside, textStyle));
    if (node.type === 'image')
      return (
        <MarkdownImage
          key={node.key}
          source={node.attributes.src ?? ''}
          alt={node.attributes.alt ?? ''}
          className={slot('image')}
        />
      );
    if (node.type === 'hr') return <Separator key={node.key} className={slot('separator')} />;
    if (node.type === 'table')
      return (
        <MarkdownTable
          key={node.key}
          node={node}
          classNames={options.classNames}
          renderCell={(cell) => {
            const content = cell.children.map((child) => render(child, [cell, node, ...parents]));
            return (
              <View
                style={{
                  alignItems: cell.attributes.style?.includes('right')
                    ? 'flex-end'
                    : cell.attributes.style?.includes('center')
                      ? 'center'
                      : 'stretch',
                }}>
                {content}
              </View>
            );
          }}
        />
      );
    if (node.type === 'fence' || node.type === 'code_block') {
      const context: MarkdownCodeBlockContext = {
        ...markdownContext(node.content.replace(/\n$/, ''), node.key, node.isComplete),
        language: node.sourceInfo.trim().split(/\s+/)[0] || undefined,
      };
      const replacement = resolveMarkdownReplacement(context, options, theme);
      return (
        <Fragment key={node.key}>
          {replacement === undefined ? (
            <CodeBlock context={context} options={options} />
          ) : (
            replacement
          )}
        </Fragment>
      );
    }
    if (node.type === 'math_inline' || node.type === 'math_block') {
      const context: MarkdownMathContext = {
        ...markdownContext(node.content, node.key, node.isComplete),
        mode: node.type === 'math_inline' ? 'inline' : 'display',
      };
      const replacement = resolveMarkdownReplacement(context, options, theme);
      return (
        <Fragment key={node.key}>
          {replacement === undefined ? (
            context.mode === 'inline' ? (
              <Text className={slot('math')} style={markdownMonospace}>
                {node.content}
              </Text>
            ) : (
              <View className={`${slot('math')} markdown__math--display`}>
                <ScrollView horizontal>
                  <Typography.Paragraph
                    nativeProps={{ selectable: true, style: markdownMonospace }}>
                    {node.content}
                  </Typography.Paragraph>
                </ScrollView>
              </View>
            )
          ) : (
            replacement
          )}
        </Fragment>
      );
    }
    if (node.type === 'list_item') {
      const list = parents.find(
        (parent) => parent.type === 'bullet_list' || parent.type === 'ordered_list'
      );
      const task = node.attributes['data-task-checked'];
      const marker =
        list?.type === 'ordered_list'
          ? `${Number(list.attributes.start ?? 1) + node.index}${node.markup}`
          : '\u2022';
      return (
        <View key={node.key} className={slot('listItem')} style={markdownStructure.row}>
          {task === undefined ? (
            <Text
              className={markdownClass(
                'listMarker',
                options.classNames,
                list?.type === 'ordered_list' ? undefined : 'markdown__list-marker--bullet'
              )}>
              {marker}
            </Text>
          ) : (
            <View
              className="markdown__task-control"
              accessible
              accessibilityRole="checkbox"
              accessibilityState={{ checked: task === 'true', disabled: true }}
              accessibilityLabel={task === 'true' ? 'Completed task' : 'Incomplete task'}>
              <View
                className={markdownClass(
                  'taskMarker',
                  options.classNames,
                  task === 'true' ? 'markdown__task-marker--checked' : undefined
                )}>
                {task === 'true' && <View className="markdown__task-check" />}
              </View>
            </View>
          )}
          <View style={markdownStructure.content}>{children()}</View>
        </View>
      );
    }
    const heading = headingTypes[node.type];
    if (heading && node.children.every((child) => !child.block)) {
      return (
        <Typography.Heading
          key={node.key}
          type={heading}
          className={slot('heading')}
          nativeProps={{ style: textStyle }}>
          {children(true)}
        </Typography.Heading>
      );
    }
    if (node.type === 'paragraph' && node.children.every((child) => !child.block)) {
      return (
        <Typography.Paragraph
          key={node.key}
          className={slot('paragraph')}
          nativeProps={{ style: textStyle }}>
          {children(true)}
        </Typography.Paragraph>
      );
    }
    if (node.type === 'blocklink')
      return (
        <Pressable
          key={node.key}
          accessibilityRole="link"
          onPress={() => openLink(node.attributes.href ?? '')}>
          {children()}
        </Pressable>
      );
    if (nativeMarkdownRule(node.type, node.block) === 'text') {
      const content =
        node.type === 'text' || node.type === 'code_inline'
          ? node.content
          : node.type.endsWith('break')
            ? '\n'
            : children(true);
      if (node.type === 'textgroup' && !inText) {
        const parentHeading = parents.map((parent) => headingTypes[parent.type]).find(Boolean);
        return parentHeading ? (
          <Typography.Heading
            key={node.key}
            type={parentHeading}
            nativeProps={{ style: textStyle }}>
            {content}
          </Typography.Heading>
        ) : (
          <Typography.Paragraph
            key={node.key}
            className="markdown__body"
            nativeProps={{ style: textStyle }}
            weight={parents.some((parent) => parent.type === 'th') ? 'semibold' : undefined}>
            {content}
          </Typography.Paragraph>
        );
      }
      const inline = (
        <Text
          key={node.key}
          selectable
          className={
            node.type === 'code_inline'
              ? slot('inlineCode')
              : node.type === 'link'
                ? slot('link')
                : undefined
          }
          style={node.type === 'code_inline' ? [textStyle, markdownMonospace] : textStyle}
          accessibilityRole={node.type === 'link' ? 'link' : undefined}
          onPress={node.type === 'link' ? () => openLink(node.attributes.href ?? '') : undefined}>
          {content}
        </Text>
      );
      if (!inText) {
        const parentHeading = parents.map((parent) => headingTypes[parent.type]).find(Boolean);
        return parentHeading ? (
          <Typography.Heading
            key={node.key}
            type={parentHeading}
            nativeProps={{ style: textStyle }}>
            {inline}
          </Typography.Heading>
        ) : (
          <Typography.Paragraph
            key={node.key}
            className="markdown__body"
            nativeProps={{ style: textStyle }}>
            {inline}
          </Typography.Paragraph>
        );
      }
      return inline;
    }
    if (nativeMarkdownRule(node.type) === 'unknown') return null;
    const className =
      node.type === 'blockquote'
        ? slot('quote')
        : node.type.endsWith('_list')
          ? slot('list')
          : node.type === 'paragraph'
            ? slot('paragraph')
            : heading
              ? slot('heading')
              : undefined;
    return (
      <View key={node.key} className={className} accessibilityRole={heading ? 'header' : undefined}>
        {children()}
      </View>
    );
  }
  return tree.map((node) => render(node, []));
}
