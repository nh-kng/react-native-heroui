import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import { headingTypeToLevel, paragraphTypeToSize } from './typography-mapping.js';
import type {
  TypographyCodeProps,
  TypographyHeadingProps,
  TypographyParagraphProps,
  TypographyProps,
} from './typography.types.js';
import { Typography as WebTypography } from '../../primitives/web/components/typography/index.js';
export type {
  TypographyCodeProps,
  TypographyHeadingProps,
  TypographyNativeProps,
  TypographyParagraphProps,
  TypographyProps,
  TypographyWebProps,
} from './typography.types.js';

type TypographyRef = ComponentRef<typeof WebTypography.Root>;

const TypographyRoot = forwardRef<TypographyRef, TypographyProps>(function TypographyRoot(
  {
    align,
    children,
    className,
    color,
    nativeProps: _nativeProps,
    truncate,
    type,
    weight,
    webProps,
  },
  ref
) {
  return (
    <WebTypography.Root
      {...webProps}
      ref={ref}
      align={align}
      className={className}
      color={color}
      truncate={truncate}
      type={type}
      weight={weight}>
      {children}
    </WebTypography.Root>
  );
});

type TypographyHeadingRef = ComponentRef<typeof WebTypography.Heading>;

const TypographyHeading = forwardRef<TypographyHeadingRef, TypographyHeadingProps>(
  function TypographyHeading(
    {
      align,
      children,
      className,
      color,
      nativeProps: _nativeProps,
      truncate,
      type = 'h1',
      weight,
      webProps,
    },
    ref
  ) {
    return (
      <WebTypography.Heading
        {...webProps}
        ref={ref}
        align={align}
        className={className}
        color={color}
        level={headingTypeToLevel(type)}
        truncate={truncate}
        weight={weight}>
        {children}
      </WebTypography.Heading>
    );
  }
);

type TypographyParagraphRef = ComponentRef<typeof WebTypography.Paragraph>;

const TypographyParagraph = forwardRef<TypographyParagraphRef, TypographyParagraphProps>(
  function TypographyParagraph(
    {
      align,
      children,
      className,
      color,
      nativeProps: _nativeProps,
      truncate,
      type = 'body',
      weight,
      webProps,
    },
    ref
  ) {
    return (
      <WebTypography.Paragraph
        {...webProps}
        ref={ref}
        align={align}
        className={className}
        color={color}
        size={paragraphTypeToSize(type)}
        truncate={truncate}
        weight={weight}>
        {children}
      </WebTypography.Paragraph>
    );
  }
);

type TypographyCodeRef = ComponentRef<typeof WebTypography.Code>;

const TypographyCode = forwardRef<TypographyCodeRef, TypographyCodeProps>(function TypographyCode(
  { align, children, className, color, nativeProps: _nativeProps, truncate, weight, webProps },
  ref
) {
  return (
    <WebTypography.Code
      {...webProps}
      ref={ref}
      align={align}
      className={className}
      color={color}
      truncate={truncate}
      weight={weight}>
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
