import { forwardRef, type ComponentRef } from 'react';

import type {
  TagGroupProps,
  TagGroupListProps,
  TagGroupItemProps,
  TagGroupLabelProps,
  TagGroupRemoveButtonProps,
} from './tag-group.types.js';
import * as N from '../../primitives/native/components/tag-group/index.js';
export type * from './tag-group.types.js';

export type TagGroupRootRef = ComponentRef<typeof N.TagGroup>;
const TagGroupRoot = forwardRef<TagGroupRootRef, TagGroupProps>(function TagGroupRoot(
  {
    children,
    className,
    selectionMode,
    selectedKeys,
    defaultSelectedKeys,
    onSelectionChange,
    onRemove,
    disabledKeys,
    webProps,
    nativeProps,
  },
  ref
) {
  const Target = N.TagGroup;
  return (
    <Target
      {...nativeProps}
      ref={ref}
      className={className}
      selectionMode={selectionMode}
      selectedKeys={selectedKeys}
      defaultSelectedKeys={defaultSelectedKeys}
      disabledKeys={disabledKeys}
      onSelectionChange={(keys) => onSelectionChange?.(new Set(Array.from(keys, String)))}
      onRemove={onRemove ? (keys) => onRemove(new Set(Array.from(keys, String))) : undefined}>
      {children}
    </Target>
  );
});

export type TagGroupListRef = ComponentRef<typeof N.TagGroup.List>;
const TagGroupList = forwardRef<TagGroupListRef, TagGroupListProps>(function TagGroupList(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = N.TagGroup.List;
  return (
    <Target {...nativeProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type TagGroupItemRef = ComponentRef<typeof N.TagGroup.Item>;
const TagGroupItem = forwardRef<TagGroupItemRef, TagGroupItemProps>(function TagGroupItem(
  { children, className, id, textValue, isDisabled, webProps, nativeProps },
  ref
) {
  const Target = N.TagGroup.Item;
  return (
    <Target
      {...nativeProps}
      ref={ref}
      className={className}
      id={id}
      isDisabled={isDisabled}
      accessibilityLabel={textValue}>
      {children}
    </Target>
  );
});

export type TagGroupLabelRef = ComponentRef<typeof N.TagGroup.ItemLabel>;
const TagGroupLabel = forwardRef<TagGroupLabelRef, TagGroupLabelProps>(function TagGroupLabel(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = N.TagGroup.ItemLabel;
  return (
    <Target {...nativeProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type TagGroupRemoveButtonRef = ComponentRef<typeof N.TagGroup.ItemRemoveButton>;
const TagGroupRemoveButton = forwardRef<TagGroupRemoveButtonRef, TagGroupRemoveButtonProps>(
  function TagGroupRemoveButton({ children, className, webProps, nativeProps }, ref) {
    const Target = N.TagGroup.ItemRemoveButton;
    return (
      <Target {...nativeProps} ref={ref} className={className}>
        {children}
      </Target>
    );
  }
);

export const TagGroup = Object.assign(TagGroupRoot, {
  Root: TagGroupRoot,
  List: TagGroupList,
  Item: TagGroupItem,
  Label: TagGroupLabel,
  RemoveButton: TagGroupRemoveButton,
});
