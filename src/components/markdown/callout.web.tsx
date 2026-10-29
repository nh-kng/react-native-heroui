import { Children, useId } from 'react';
import { twMerge } from 'tailwind-merge';

import { calloutIcons } from './callout-icons.js';
import { calloutColorClasses } from './callout-presentation.js';
import { calloutLabels, type CalloutProps } from './callout.types.js';
import { markdownClass } from './markdown-presentation.js';
import type { MarkdownClassNames } from './markdown.types.js';
import { Alert } from '../alert/alert.web.js';

export function MarkdownCallout({
  type,
  title,
  children,
  classNames,
}: CalloutProps & { classNames?: MarkdownClassNames }) {
  const id = useId();
  const hasBody = Children.toArray(children).some((child) => child !== '');
  const slot = (name: Parameters<typeof markdownClass>[0]) => markdownClass(name, classNames);
  return (
    <Alert
      className={`${slot('callout')} markdown__callout--${type}`}
      webProps={{
        role: 'group',
        'aria-labelledby': `${id}-title`,
        'aria-describedby': hasBody ? `${id}-body` : undefined,
      }}>
      <Alert.Content className="markdown__callout-content">
        <div className={slot('calloutHeader')}>
          <Alert.Indicator
            className={twMerge(calloutColorClasses[type], slot('calloutIcon'))}
            webProps={{ 'aria-hidden': true }}>
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false">
              {calloutIcons[type].map((d) => (
                <path key={d} d={d} />
              ))}
            </svg>
          </Alert.Indicator>
          <Alert.Title
            className={twMerge(calloutColorClasses[type], slot('calloutTitle'))}
            webProps={{ id: `${id}-title` }}>
            {title ?? calloutLabels[type]}
          </Alert.Title>
        </div>
        {hasBody && (
          <div id={`${id}-body`} className={slot('calloutBody')}>
            {children}
          </div>
        )}
      </Alert.Content>
    </Alert>
  );
}

export function Callout(props: CalloutProps) {
  return <MarkdownCallout {...props} />;
}
