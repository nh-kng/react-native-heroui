import type { ComponentPropsWithoutRef } from 'react';
import type { ViewProps } from 'react-native';

export type LoadingTextVariant = 'shimmer' | 'pulse' | 'none';
export type LoadingTextSize = 'sm' | 'md' | 'lg';

type OwnedProps = 'children' | 'className' | 'ref';

export type LoadingTextWebProps = Omit<
  ComponentPropsWithoutRef<'span'>,
  OwnedProps | 'dangerouslySetInnerHTML'
>;
export type LoadingTextNativeProps = Omit<ViewProps, OwnedProps>;

export interface LoadingTextProps {
  text?: string;
  variant?: LoadingTextVariant;
  size?: LoadingTextSize;
  className?: string;
  nativeProps?: LoadingTextNativeProps;
  webProps?: LoadingTextWebProps;
}
