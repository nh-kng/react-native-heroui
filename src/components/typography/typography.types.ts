import type { ReactNode } from 'react';

import type { HeadingType, ParagraphType } from './typography-mapping.js';
import type {
  TypographyCodeProps as NativeTypographyCodeProps,
  TypographyHeadingProps as NativeTypographyHeadingProps,
  TypographyParagraphProps as NativeTypographyParagraphProps,
  TypographyRootProps as NativeTypographyRootProps,
} from '../../primitives/native/components/text/index.js';
import type {
  CodeProps as WebTypographyCodeProps,
  HeadingProps as WebTypographyHeadingProps,
  ParagraphProps as WebTypographyParagraphProps,
  TypographyRootProps as WebTypographyRootProps,
} from '../../primitives/web/components/typography/index.js';

type TypographyRootOwned =
  'align' | 'children' | 'className' | 'color' | 'truncate' | 'type' | 'weight' | 'ref';

type TypographyHeadingOwned = TypographyRootOwned | 'level';

type TypographyParagraphOwned = TypographyRootOwned | 'size';

type TypographyCodeOwned = Exclude<TypographyRootOwned, 'type'>;

export type TypographyWebProps = Omit<WebTypographyRootProps, TypographyRootOwned>;

export type TypographyNativeProps = Omit<NativeTypographyRootProps, TypographyRootOwned>;

export interface TypographyProps {
  align?: NonNullable<WebTypographyRootProps['align']> &
    NonNullable<NativeTypographyRootProps['align']>;
  children?: ReactNode;
  className?: string;
  color?: NonNullable<WebTypographyRootProps['color']> &
    NonNullable<NativeTypographyRootProps['color']>;
  nativeProps?: TypographyNativeProps;
  truncate?: boolean;
  type?: NonNullable<WebTypographyRootProps['type']> &
    NonNullable<NativeTypographyRootProps['type']>;
  weight?: NonNullable<WebTypographyRootProps['weight']> &
    NonNullable<NativeTypographyRootProps['weight']>;
  webProps?: TypographyWebProps;
}

export interface TypographyHeadingProps {
  align?: NonNullable<WebTypographyHeadingProps['align']> &
    NonNullable<NativeTypographyHeadingProps['align']>;
  children?: ReactNode;
  className?: string;
  color?: NonNullable<WebTypographyHeadingProps['color']> &
    NonNullable<NativeTypographyHeadingProps['color']>;
  nativeProps?: Omit<NativeTypographyHeadingProps, TypographyHeadingOwned>;
  truncate?: boolean;
  type?: HeadingType;
  weight?: NonNullable<WebTypographyHeadingProps['weight']> &
    NonNullable<NativeTypographyHeadingProps['weight']>;
  webProps?: Omit<WebTypographyHeadingProps, TypographyHeadingOwned | 'level'>;
}

export interface TypographyParagraphProps {
  align?: NonNullable<WebTypographyParagraphProps['align']> &
    NonNullable<NativeTypographyParagraphProps['align']>;
  children?: ReactNode;
  className?: string;
  color?: NonNullable<WebTypographyParagraphProps['color']> &
    NonNullable<NativeTypographyParagraphProps['color']>;
  nativeProps?: Omit<NativeTypographyParagraphProps, TypographyParagraphOwned>;
  truncate?: boolean;
  type?: ParagraphType;
  weight?: NonNullable<WebTypographyParagraphProps['weight']> &
    NonNullable<NativeTypographyParagraphProps['weight']>;
  webProps?: Omit<WebTypographyParagraphProps, TypographyParagraphOwned | 'size'>;
}

export interface TypographyCodeProps {
  align?: NonNullable<WebTypographyCodeProps['align']> &
    NonNullable<NativeTypographyCodeProps['align']>;
  children?: ReactNode;
  className?: string;
  color?: NonNullable<WebTypographyCodeProps['color']> &
    NonNullable<NativeTypographyCodeProps['color']>;
  nativeProps?: Omit<NativeTypographyCodeProps, TypographyCodeOwned>;
  truncate?: boolean;
  weight?: NonNullable<WebTypographyCodeProps['weight']> &
    NonNullable<NativeTypographyCodeProps['weight']>;
  webProps?: Omit<WebTypographyCodeProps, TypographyCodeOwned>;
}
