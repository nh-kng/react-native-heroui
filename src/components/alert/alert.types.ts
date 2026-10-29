import type { ComponentProps, ReactNode } from 'react';

import * as N from '../../primitives/native/components/alert/index.js';
import * as W from '../../primitives/web/components/alert/index.js';
type PlatformOptions<T, K extends PropertyKey> = T extends unknown
  ? Omit<
      T,
      | K
      | 'render'
      | 'aria-disabled'
      | 'aria-checked'
      | 'aria-selected'
      | 'aria-invalid'
      | 'accessibilityState'
    >
  : never;

export interface AlertProps {
  children?: ReactNode;
  className?: string;
  status?: 'default' | 'accent' | 'success' | 'warning' | 'danger';
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Alert>,
    'children' | 'className' | 'ref' | 'asChild' | 'status'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Alert.Root<'div'>>,
    'children' | 'className' | 'ref' | 'asChild' | 'status'
  >;
}

export interface AlertIndicatorProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Alert.Indicator>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Alert.Indicator<'div'>>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}

export interface AlertContentProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Alert.Content>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Alert.Content<'div'>>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}

export interface AlertTitleProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Alert.Title>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Alert.Title<'div'>>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}

export interface AlertDescriptionProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Alert.Description>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Alert.Description<'div'>>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}
