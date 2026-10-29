import type { ComponentProps, ReactNode } from 'react';

import * as N from '../../primitives/native/components/accordion/index.js';
import * as W from '../../primitives/web/components/accordion/index.js';
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

export interface AccordionProps {
  children?: ReactNode;
  className?: string;
  expandedKeys?: ReadonlySet<string>;
  defaultExpandedKeys?: ReadonlySet<string>;
  onExpandedChange?: (keys: Set<string>) => void;
  selectionMode?: 'single' | 'multiple';
  isDisabled?: boolean;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Accordion>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'expandedKeys'
    | 'defaultExpandedKeys'
    | 'onExpandedChange'
    | 'selectionMode'
    | 'isDisabled'
    | 'value'
    | 'defaultValue'
    | 'onValueChange'
    | 'allowsMultipleExpanded'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Accordion>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'expandedKeys'
    | 'defaultExpandedKeys'
    | 'onExpandedChange'
    | 'selectionMode'
    | 'isDisabled'
    | 'value'
    | 'defaultValue'
    | 'onValueChange'
    | 'allowsMultipleExpanded'
  >;
}

export interface AccordionItemProps {
  children?: ReactNode;
  className?: string;
  value: string;
  isDisabled?: boolean;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Accordion.Item>,
    'children' | 'className' | 'ref' | 'asChild' | 'value' | 'isDisabled' | 'id'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Accordion.Item>,
    'children' | 'className' | 'ref' | 'asChild' | 'value' | 'isDisabled' | 'id'
  >;
}

export interface AccordionTriggerProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Accordion.Trigger>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Accordion.Trigger>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}

export interface AccordionIndicatorProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Accordion.Indicator>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Accordion.Indicator<'svg'>>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}

export interface AccordionContentProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Accordion.Content>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Accordion.Panel>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}
