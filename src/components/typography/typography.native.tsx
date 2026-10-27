import type { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';

import type {
  TypographyCodeProps,
  TypographyHeadingProps,
  TypographyParagraphProps,
  TypographyProps,
} from './typography.types.js';
import { Typography as NativeTypography } from '../../primitives/native/components/text/index.js';
export type {
  TypographyCodeProps,
  TypographyHeadingProps,
  TypographyNativeProps,
  TypographyParagraphProps,
  TypographyProps,
  TypographyWebProps,
} from './typography.types.js';

type TypographyRef = ComponentRef<typeof NativeTypography>;

const TypographyRoot: ForwardRefExoticComponent<TypographyProps & RefAttributes<TypographyRef>> =
  forwardRef<TypographyRef, TypographyProps>(function TypographyRoot(
    {
      align,
      children,
      className,
      color,
      nativeProps,
      truncate,
      type,
      weight,
      webProps: _webProps,
      ...props
    },
    ref
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
        weight={weight}>
        {children}
      </NativeTypography>
    );
  });

type TypographyHeadingRef = ComponentRef<typeof NativeTypography.Heading>;

const TypographyHeading: ForwardRefExoticComponent<
  TypographyHeadingProps & RefAttributes<TypographyHeadingRef>
> = forwardRef<TypographyHeadingRef, TypographyHeadingProps>(function TypographyHeading(
  { align, children, className, color, nativeProps, truncate, type, weight, webProps: _webProps },
  ref
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
      weight={weight}>
      {children}
    </NativeTypography.Heading>
  );
});

type TypographyParagraphRef = ComponentRef<typeof NativeTypography.Paragraph>;

const TypographyParagraph: ForwardRefExoticComponent<
  TypographyParagraphProps & RefAttributes<TypographyParagraphRef>
> = forwardRef<TypographyParagraphRef, TypographyParagraphProps>(function TypographyParagraph(
  { align, children, className, color, nativeProps, truncate, type, weight, webProps: _webProps },
  ref
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
      weight={weight}>
      {children}
    </NativeTypography.Paragraph>
  );
});

type TypographyCodeRef = ComponentRef<typeof NativeTypography.Code>;

const TypographyCode: ForwardRefExoticComponent<
  TypographyCodeProps & RefAttributes<TypographyCodeRef>
> = forwardRef<TypographyCodeRef, TypographyCodeProps>(function TypographyCode(
  { align, children, className, color, nativeProps, truncate, weight, webProps: _webProps },
  ref
) {
  return (
    <NativeTypography.Code
      {...nativeProps}
      ref={ref}
      align={align}
      className={className}
      color={color}
      truncate={truncate}
      weight={weight}>
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
