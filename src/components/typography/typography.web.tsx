import {
  Typography as WebTypography,
  type TypographyRootProps as WebTypographyRootProps,
  type HeadingProps as WebTypographyHeadingProps,
  type ParagraphProps as WebTypographyParagraphProps,
  type CodeProps as WebTypographyCodeProps,
} from '@heroui/react/typography';
import type {
  TypographyRootProps as NativeTypographyRootProps,
  TypographyHeadingProps as NativeTypographyHeadingProps,
  TypographyParagraphProps as NativeTypographyParagraphProps,
  TypographyCodeProps as NativeTypographyCodeProps,
} from 'heroui-native/text';
import type { ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';

import { headingTypeToLevel, paragraphTypeToSize, type HeadingType, type ParagraphType } from './typography-mapping.js';

type TypographyRootOwned = 'align' | 'children' | 'className' | 'color' | 'truncate' | 'type' | 'weight' | 'ref';
type TypographyHeadingOwned = TypographyRootOwned | 'level';
type TypographyParagraphOwned = TypographyRootOwned | 'size';
type TypographyCodeOwned = Exclude<TypographyRootOwned, 'type'>;

export type TypographyWebProps = Omit<WebTypographyRootProps, TypographyRootOwned>;
export type TypographyNativeProps = Omit<NativeTypographyRootProps, TypographyRootOwned>;

export interface TypographyProps {
  align?: NonNullable<WebTypographyRootProps['align']> & NonNullable<NativeTypographyRootProps['align']>;
  children?: ReactNode;
  className?: string;
  color?: NonNullable<WebTypographyRootProps['color']> & NonNullable<NativeTypographyRootProps['color']>;
  nativeProps?: TypographyNativeProps;
  truncate?: boolean;
  type?: NonNullable<WebTypographyRootProps['type']> & NonNullable<NativeTypographyRootProps['type']>;
  weight?: NonNullable<WebTypographyRootProps['weight']> & NonNullable<NativeTypographyRootProps['weight']>;
  webProps?: TypographyWebProps;
}

type TypographyRef = ComponentRef<typeof WebTypography.Root>;

const TypographyRoot = forwardRef<TypographyRef, TypographyProps>(function TypographyRoot(
  { align, children, className, color, nativeProps: _nativeProps, truncate, type, weight, webProps },
  ref,
) {
  return (
    <WebTypography.Root {...webProps} ref={ref} align={align} className={className} color={color} truncate={truncate} type={type} weight={weight}>
      {children}
    </WebTypography.Root>
  );
});

export interface TypographyHeadingProps {
  align?: NonNullable<WebTypographyHeadingProps['align']> & NonNullable<NativeTypographyHeadingProps['align']>;
  children?: ReactNode;
  className?: string;
  color?: NonNullable<WebTypographyHeadingProps['color']> & NonNullable<NativeTypographyHeadingProps['color']>;
  nativeProps?: Omit<NativeTypographyHeadingProps, TypographyHeadingOwned>;
  truncate?: boolean;
  type?: HeadingType;
  weight?: NonNullable<WebTypographyHeadingProps['weight']> & NonNullable<NativeTypographyHeadingProps['weight']>;
  webProps?: Omit<WebTypographyHeadingProps, TypographyHeadingOwned | 'level'>;
}

type TypographyHeadingRef = ComponentRef<typeof WebTypography.Heading>;

const TypographyHeading = forwardRef<TypographyHeadingRef, TypographyHeadingProps>(function TypographyHeading(
  { align, children, className, color, nativeProps: _nativeProps, truncate, type = 'h1', weight, webProps },
  ref,
) {
  return (
    <WebTypography.Heading {...webProps} ref={ref} align={align} className={className} color={color} level={headingTypeToLevel(type)} truncate={truncate} weight={weight}>
      {children}
    </WebTypography.Heading>
  );
});

export interface TypographyParagraphProps {
  align?: NonNullable<WebTypographyParagraphProps['align']> & NonNullable<NativeTypographyParagraphProps['align']>;
  children?: ReactNode;
  className?: string;
  color?: NonNullable<WebTypographyParagraphProps['color']> & NonNullable<NativeTypographyParagraphProps['color']>;
  nativeProps?: Omit<NativeTypographyParagraphProps, TypographyParagraphOwned>;
  truncate?: boolean;
  type?: ParagraphType;
  weight?: NonNullable<WebTypographyParagraphProps['weight']> & NonNullable<NativeTypographyParagraphProps['weight']>;
  webProps?: Omit<WebTypographyParagraphProps, TypographyParagraphOwned | 'size'>;
}

type TypographyParagraphRef = ComponentRef<typeof WebTypography.Paragraph>;

const TypographyParagraph = forwardRef<TypographyParagraphRef, TypographyParagraphProps>(function TypographyParagraph(
  { align, children, className, color, nativeProps: _nativeProps, truncate, type = 'body', weight, webProps },
  ref,
) {
  return (
    <WebTypography.Paragraph {...webProps} ref={ref} align={align} className={className} color={color} size={paragraphTypeToSize(type)} truncate={truncate} weight={weight}>
      {children}
    </WebTypography.Paragraph>
  );
});

export interface TypographyCodeProps {
  align?: NonNullable<WebTypographyCodeProps['align']> & NonNullable<NativeTypographyCodeProps['align']>;
  children?: ReactNode;
  className?: string;
  color?: NonNullable<WebTypographyCodeProps['color']> & NonNullable<NativeTypographyCodeProps['color']>;
  nativeProps?: Omit<NativeTypographyCodeProps, TypographyCodeOwned>;
  truncate?: boolean;
  weight?: NonNullable<WebTypographyCodeProps['weight']> & NonNullable<NativeTypographyCodeProps['weight']>;
  webProps?: Omit<WebTypographyCodeProps, TypographyCodeOwned>;
}

type TypographyCodeRef = ComponentRef<typeof WebTypography.Code>;

const TypographyCode = forwardRef<TypographyCodeRef, TypographyCodeProps>(function TypographyCode(
  { align, children, className, color, nativeProps: _nativeProps, truncate, weight, webProps },
  ref,
) {
  return (
    <WebTypography.Code {...webProps} ref={ref} align={align} className={className} color={color} truncate={truncate} weight={weight}>
      {children}
    </WebTypography.Code>
  );
});

TypographyRoot.displayName = 'Typography';
TypographyHeading.displayName = 'Typography.Heading';
TypographyParagraph.displayName = 'Typography.Paragraph';
TypographyCode.displayName = 'Typography.Code';

type TypographyComponent = typeof TypographyRoot & {
  Root: typeof TypographyRoot;
  Heading: typeof TypographyHeading;
  Paragraph: typeof TypographyParagraph;
  Code: typeof TypographyCode;
};

export const Typography: TypographyComponent = Object.assign(TypographyRoot, {
  Root: TypographyRoot,
  Heading: TypographyHeading,
  Paragraph: TypographyParagraph,
  Code: TypographyCode,
});
