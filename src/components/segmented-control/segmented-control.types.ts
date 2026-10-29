import type { ComponentProps, ComponentPropsWithoutRef, ReactNode } from 'react';
import type { TagGroupProps, TagListProps, TagProps } from 'react-aria-components/TagGroup';
import type { TextProps } from 'react-native';

import type { TagGroup } from '../../primitives/native/components/tag-group/index.js';

type Owned =
  | 'children' | 'className' | 'ref' | 'asChild' | 'render' | 'dangerouslySetInnerHTML'
  | 'role' | 'accessibilityRole' | 'aria-disabled' | 'aria-selected' | 'aria-checked'
  | 'accessibilityState' | 'disabled';
type SelectionOwned =
  | 'selectionMode' | 'selectionBehavior' | 'selectedKeys' | 'defaultSelectedKeys'
  | 'onSelectionChange' | 'disallowEmptySelection' | 'disabledKeys' | 'isDisabled'
  | 'onRemove' | 'value' | 'defaultValue' | 'onValueChange'
  | 'aria-disabled' | 'aria-selected' | 'accessibilityState';

type InitialValue =
  | { value: string; defaultValue?: never; onValueChange?: (value: string) => void }
  | { value?: never; defaultValue: string; onValueChange?: (value: string) => void };

export type SegmentedControlWebProps = Omit<TagGroupProps, Owned | SelectionOwned>;
export type SegmentedControlNativeProps = Omit<
  ComponentProps<typeof TagGroup>,
  Owned | SelectionOwned | 'size' | 'variant' | 'animation' | 'isInvalid' | 'isRequired'
>;

export type SegmentedControlProps = InitialValue & {
  children?: ReactNode;
  className?: string;
  isDisabled?: boolean;
  webProps?: SegmentedControlWebProps;
  nativeProps?: SegmentedControlNativeProps;
};

export interface SegmentedControlListProps {
  children?: ReactNode;
  className?: string;
  webProps?: Omit<TagListProps<object>, Owned | 'items' | 'dependencies' | 'renderEmptyState'>;
  nativeProps?: Omit<ComponentProps<typeof TagGroup.List>, Owned | 'renderEmptyState'>;
}

export interface SegmentedControlItemProps {
  children?: ReactNode;
  className?: string;
  value: string;
  textValue: string;
  isDisabled?: boolean;
  webProps?: Omit<TagProps, Owned | SelectionOwned | 'id' | 'textValue' | 'href' | 'hrefLang' | 'target' | 'rel' | 'download' | 'routerOptions'>;
  nativeProps?: Omit<
    ComponentProps<typeof TagGroup.Item>,
    Owned | SelectionOwned | 'id' | 'textValue' | 'accessibilityLabel' | 'background'
  >;
}

export interface SegmentedControlLabelProps {
  children?: ReactNode;
  className?: string;
  webProps?: Omit<ComponentPropsWithoutRef<'span'>, Owned | 'dangerouslySetInnerHTML'>;
  nativeProps?: Omit<TextProps, Owned>;
}
