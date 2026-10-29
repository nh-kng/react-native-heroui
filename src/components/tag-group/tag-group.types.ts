import type { ComponentProps, ReactNode } from 'react';

import * as N from '../../primitives/native/components/tag-group/index.js';
import * as L from '../../primitives/web/components/label/index.js';
import * as T from '../../primitives/web/components/tag/index.js';
import * as W from '../../primitives/web/components/tag-group/index.js';
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

export interface TagGroupProps {
  children?: ReactNode;
  className?: string;
  selectionMode?: 'none' | 'single' | 'multiple';
  selectedKeys?: ReadonlySet<string>;
  defaultSelectedKeys?: ReadonlySet<string>;
  onSelectionChange?: (keys: Set<string>) => void;
  onRemove?: (keys: Set<string>) => void;
  disabledKeys?: ReadonlySet<string>;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.TagGroup>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'selectionMode'
    | 'selectedKeys'
    | 'defaultSelectedKeys'
    | 'onSelectionChange'
    | 'onRemove'
    | 'disabledKeys'
    | 'isDisabled'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.TagGroup>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'selectionMode'
    | 'selectedKeys'
    | 'defaultSelectedKeys'
    | 'onSelectionChange'
    | 'onRemove'
    | 'disabledKeys'
    | 'isDisabled'
  >;
}

export interface TagGroupListProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.TagGroup.List>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.TagGroup.List>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}

export interface TagGroupItemProps {
  children?: ReactNode;
  className?: string;
  id: string;
  textValue: string;
  isDisabled?: boolean;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.TagGroup.Item>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'id'
    | 'textValue'
    | 'isDisabled'
    | 'accessibilityLabel'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof T.Tag>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'id'
    | 'textValue'
    | 'isDisabled'
    | 'accessibilityLabel'
  >;
}

export interface TagGroupLabelProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.TagGroup.ItemLabel>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof L.Label.Root>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}

export interface TagGroupRemoveButtonProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.TagGroup.ItemRemoveButton>,
    'children' | 'className' | 'ref' | 'asChild' | 'onPress' | 'onClick'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof T.Tag.RemoveButton>,
    'children' | 'className' | 'ref' | 'asChild' | 'onPress' | 'onClick'
  >;
}
