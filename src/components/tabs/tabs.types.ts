import type { ComponentProps, ReactNode } from 'react';

import * as N from '../../primitives/native/components/tabs/index.js';
import * as W from '../../primitives/web/components/tabs/index.js';
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

export interface TabsProps {
  children?: ReactNode;
  className?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Tabs>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'value'
    | 'defaultValue'
    | 'onValueChange'
    | 'selectedKey'
    | 'defaultSelectedKey'
    | 'onSelectionChange'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Tabs>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'value'
    | 'defaultValue'
    | 'onValueChange'
    | 'selectedKey'
    | 'defaultSelectedKey'
    | 'onSelectionChange'
  >;
}

export interface TabsListProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Tabs.List>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Tabs.List>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}

export interface TabsTabProps {
  children?: ReactNode;
  className?: string;
  value: string;
  isDisabled?: boolean;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Tabs.Trigger>,
    'children' | 'className' | 'ref' | 'asChild' | 'value' | 'isDisabled' | 'id'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Tabs.Tab>,
    'children' | 'className' | 'ref' | 'asChild' | 'value' | 'isDisabled' | 'id'
  >;
}

export interface TabsIndicatorProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Tabs.Indicator>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Tabs.Indicator>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}

export interface TabsPanelProps {
  children?: ReactNode;
  className?: string;
  value: string;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Tabs.Content>,
    'children' | 'className' | 'ref' | 'asChild' | 'value' | 'id'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Tabs.Panel>,
    'children' | 'className' | 'ref' | 'asChild' | 'value' | 'id'
  >;
}
