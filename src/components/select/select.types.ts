import type { ComponentProps, ReactNode } from 'react';

import { Select as N } from '../../primitives/native/components/select/index.js';
import { ListBox } from '../../primitives/web/components/list-box/index.js';
import { Select as W } from '../../primitives/web/components/select/index.js';

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
export interface SelectOption {
  value: string;
  label: string;
  isDisabled?: boolean;
}
type Owned =
  | 'isValueControlled'
  | 'children'
  | 'className'
  | 'ref'
  | 'asChild'
  | 'items'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'onValueChange'
  | 'selectedKey'
  | 'defaultSelectedKey'
  | 'onSelectionChange'
  | 'selectionMode'
  | 'isDisabled'
  | 'isOpen'
  | 'defaultOpen'
  | 'isDefaultOpen'
  | 'onOpenChange'
  | 'disabledKeys';
export interface SelectProps {
  children?: ReactNode;
  className?: string;
  items: readonly SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | undefined) => void;
  isDisabled?: boolean;

  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  nativeProps?: Omit<ComponentProps<typeof N<'single'>>, Owned>;
  webProps?: Omit<ComponentProps<typeof W<SelectOption>>, Owned>;
}
export interface SelectTriggerProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<
    ComponentProps<typeof N.Trigger>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: Omit<ComponentProps<typeof W.Trigger>, 'children' | 'className' | 'ref'>;
}
export interface SelectValueProps {
  placeholder?: string;
  className?: string;
  nativeProps?: Omit<
    ComponentProps<typeof N.Value>,
    'children' | 'className' | 'ref' | 'placeholder'
  >;
  webProps?: Omit<ComponentProps<typeof W.Value>, 'children' | 'className' | 'ref' | 'placeholder'>;
}
export interface SelectContentProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Content>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: Omit<ComponentProps<typeof W.Popover>, 'children' | 'className' | 'ref'>;
}
export interface SelectItemProps {
  value: string;
  label: string;
  children?: ReactNode;
  className?: string;
  isDisabled?: boolean;
  nativeProps?: Omit<
    ComponentProps<typeof N.Item>,
    'children' | 'className' | 'ref' | 'asChild' | 'value' | 'label' | 'disabled'
  >;
  webProps?: Omit<
    ComponentProps<typeof ListBox.Item>,
    'children' | 'className' | 'ref' | 'id' | 'textValue' | 'isDisabled'
  >;
}
