import type { ComponentProps, ReactNode, ReactElement } from 'react';

import * as N from '../../primitives/native/components/popover/index.js';
import * as W from '../../primitives/web/components/popover/index.js';
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

export interface PopoverProps {
  children?: ReactNode;
  className?: string;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Popover>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'isOpen'
    | 'defaultOpen'
    | 'onOpenChange'
    | 'isDefaultOpen'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Popover>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'isOpen'
    | 'defaultOpen'
    | 'onOpenChange'
    | 'isDefaultOpen'
  >;
}

export interface PopoverTriggerProps {
  children: ReactElement;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Popover.Trigger>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Popover.Trigger<'div'>>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}

export interface PopoverContentProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Popover.Content>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Popover.Content>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}

export interface PopoverArrowProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Popover.Arrow>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Popover.Arrow>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}
