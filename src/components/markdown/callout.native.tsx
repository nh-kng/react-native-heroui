import { Children, useId } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { twMerge } from 'tailwind-merge';
import { useCSSVariable } from 'uniwind';

import { calloutIcons } from './callout-icons.js';
import { calloutColorClasses } from './callout-presentation.js';
import { calloutLabels, type CalloutProps } from './callout.types.js';
import { markdownClass } from './markdown-presentation.js';
import type { MarkdownClassNames } from './markdown.types.js';
import { Alert } from '../alert/alert.native.js';
import { Typography } from '../typography/typography.native.js';

const colorVariables = {
  note: '--color-callout-note-foreground',
  tip: '--color-success-soft-foreground',
  important: '--color-callout-important-foreground',
  warning: '--color-warning-soft-foreground',
  caution: '--color-danger-soft-foreground',
};

export function MarkdownCallout({
  type,
  title,
  children,
  classNames,
}: CalloutProps & { classNames?: MarkdownClassNames }) {
  const id = useId();
  const hasBody = Children.toArray(children).some((child) => child !== '');
  const value = useCSSVariable(colorVariables[type]);
  const color = typeof value === 'string' ? value : undefined;
  const slot = (name: Parameters<typeof markdownClass>[0]) => markdownClass(name, classNames);
  return (
    <Alert
      className={`${slot('callout')} markdown__callout--${type}`}
      nativeProps={{ id, role: 'group', background: null }}>
      <Alert.Content className="markdown__callout-content">
        <View className={slot('calloutHeader')}>
          <Alert.Indicator className={twMerge(calloutColorClasses[type], slot('calloutIcon'))}>
            <Svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              accessible={false}>
              {calloutIcons[type].map((d) => (
                <Path key={d} d={d} />
              ))}
            </Svg>
          </Alert.Indicator>
          <Alert.Title className={twMerge(calloutColorClasses[type], slot('calloutTitle'))}>
            {title ?? calloutLabels[type]}
          </Alert.Title>
        </View>
        <View nativeID={`${id}_desc`} className={hasBody ? slot('calloutBody') : undefined}>
          {Children.toArray(children).map((child, index) =>
            typeof child === 'string' || typeof child === 'number' ? (
              <Typography.Paragraph key={index} className="markdown__body">
                {child}
              </Typography.Paragraph>
            ) : (
              child
            )
          )}
        </View>
      </Alert.Content>
    </Alert>
  );
}

export function Callout(props: CalloutProps) {
  return <MarkdownCallout {...props} />;
}
