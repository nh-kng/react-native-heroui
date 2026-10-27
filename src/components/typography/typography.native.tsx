import type {
  TypographyRootProps as WebTypographyRootProps,
  HeadingProps as WebTypographyHeadingProps,
  ParagraphProps as WebTypographyParagraphProps,
  CodeProps as WebTypographyCodeProps,
} from '@heroui/react/typography';
import {
  Typography as NativeTypography,
  type TypographyRootProps as NativeTypographyRootProps,
  type TypographyHeadingProps as NativeTypographyHeadingProps,
  type TypographyParagraphProps as NativeTypographyParagraphProps,
  type TypographyCodeProps as NativeTypographyCodeProps,
} from 'heroui-native/text';
import type { ComponentRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef } from 'react';

import { type HeadingType, type ParagraphType } from './typography-mapping.js';

type TypographyRootOwned = 'align' | 'children' | 'className' | 'color' | 'truncate' | 'type' | 'weight' | 'ref';
type TypographyHeadingOwned = TypographyRootOwned | 'level';
type TypographyParagraphOwned = TypographyRootOwned | 'size';
type TypographyCodeOwned = Exclude<TypographyRootOwned, 'type'>;

export type TypographyNativeProps = Omit<NativeTypographyRootProps, TypographyRootOwned>;
export type TypographyWebProps = Omit<WebTypographyRootProps, TypographyRootOwned>;

export interface TypographyProps {
  align?: NonNullable<NativeTypographyRootProps['align']> & NonNullable<WebTypographyRootProps['align']>;
  children?: ReactNode;
  className?: string;
  color?: NonNullable<NativeTypographyRootProps['color']> & NonNullable<WebTypographyRootProps['color']>;
  nativeProps?: TypographyNativeProps;
  truncate?: boolean;
  type?: NonNullable<NativeTypographyRootProps['type']> & NonNullable<WebTypographyRootProps['type']>;
  weight?: NonNullable<NativeTypographyRootProps['weight']> & NonNullable<WebTypographyRootProps['weight']>;
  webProps?: TypographyWebProps;
}

type TypographyRef = ComponentRef<typeof NativeTypography>;

const TypographyRoot: ForwardRefExoticComponent<TypographyProps & RefAttributes<TypographyRef>> = forwardRef<TypographyRef, TypographyProps>(function TypographyRoot(
  { align, children, className, color, nativeProps, truncate, type, weight, webProps: _webProps, ...props },
  ref,
) {
  return (
    <NativeTypography
      {...nativeProps}
      {...props}
      ref={ref}
      align={align}
      className={className}
      color={color}
      truncate={truncate}
      type={type}
      weight={weight}
    >
      {children}
    </NativeTypography>
  );
});

export interface TypographyHeadingProps {
  align?: NonNullable<NativeTypographyHeadingProps['align']> & NonNullable<WebTypographyHeadingProps['align']>;
  children?: ReactNode;
  className?: string;
  color?: NonNullable<NativeTypographyHeadingProps['color']> & NonNullable<WebTypographyHeadingProps['color']>;
  nativeProps?: Omit<NativeTypographyHeadingProps, TypographyHeadingOwned>;
  truncate?: boolean;
  type?: HeadingType;
  weight?: NonNullable<NativeTypographyHeadingProps['weight']> & NonNullable<WebTypographyHeadingProps['weight']>;
  webProps?: Omit<WebTypographyHeadingProps, TypographyHeadingOwned | 'level'>;
}

type TypographyHeadingRef = ComponentRef<typeof NativeTypography.Heading>;

const TypographyHeading: ForwardRefExoticComponent<TypographyHeadingProps & RefAttributes<TypographyHeadingRef>> = forwardRef<TypographyHeadingRef, TypographyHeadingProps>(function TypographyHeading(
  { align, children, className, color, nativeProps, truncate, type, weight, webProps: _webProps },
  ref,
) {
  return (
    <NativeTypography.Heading
      {...nativeProps}
      ref={ref}
      align={align}
      className={className}
      color={color}
      truncate={truncate}
      type={type}
      weight={weight}
    >
      {children}
    </NativeTypography.Heading>
  );
});

export interface TypographyParagraphProps {
  align?: NonNullable<NativeTypographyParagraphProps['align']> & NonNullable<WebTypographyParagraphProps['align']>;
  children?: ReactNode;
  className?: string;
  color?: NonNullable<NativeTypographyParagraphProps['color']> & NonNullable<WebTypographyParagraphProps['color']>;
  nativeProps?: Omit<NativeTypographyParagraphProps, TypographyParagraphOwned>;
  truncate?: boolean;
  type?: ParagraphType;
  weight?: NonNullable<NativeTypographyParagraphProps['weight']> & NonNullable<WebTypographyParagraphProps['weight']>;
  webProps?: Omit<WebTypographyParagraphProps, TypographyParagraphOwned | 'size'>;
}

type TypographyParagraphRef = ComponentRef<typeof NativeTypography.Paragraph>;

const TypographyParagraph: ForwardRefExoticComponent<TypographyParagraphProps & RefAttributes<TypographyParagraphRef>> = forwardRef<TypographyParagraphRef, TypographyParagraphProps>(function TypographyParagraph(
  { align, children, className, color, nativeProps, truncate, type, weight, webProps: _webProps },
  ref,
) {
  return (
    <NativeTypography.Paragraph
      {...nativeProps}
      ref={ref}
      align={align}
      className={className}
      color={color}
      truncate={truncate}
      type={type}
      weight={weight}
    >
      {children}
    </NativeTypography.Paragraph>
  );
});

export interface TypographyCodeProps {
  align?: NonNullable<NativeTypographyCodeProps['align']> & NonNullable<WebTypographyCodeProps['align']>;
  children?: ReactNode;
  className?: string;
  color?: NonNullable<NativeTypographyCodeProps['color']> & NonNullable<WebTypographyCodeProps['color']>;
  nativeProps?: Omit<NativeTypographyCodeProps, TypographyCodeOwned>;
  truncate?: boolean;
  weight?: NonNullable<NativeTypographyCodeProps['weight']> & NonNullable<WebTypographyCodeProps['weight']>;
  webProps?: Omit<WebTypographyCodeProps, TypographyCodeOwned>;
}

type TypographyCodeRef = ComponentRef<typeof NativeTypography.Code>;

const TypographyCode: ForwardRefExoticComponent<TypographyCodeProps & RefAttributes<TypographyCodeRef>> = forwardRef<TypographyCodeRef, TypographyCodeProps>(function TypographyCode(
  { align, children, className, color, nativeProps, truncate, weight, webProps: _webProps },
  ref,
) {
  return (
    <NativeTypography.Code
      {...nativeProps}
      ref={ref}
      align={align}
      className={className}
      color={color}
      truncate={truncate}
      weight={weight}
    >
      {children}
    </NativeTypography.Code>
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
