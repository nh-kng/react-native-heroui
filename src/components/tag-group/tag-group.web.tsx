import { forwardRef, type ComponentRef } from 'react';

import { mapTagGroupChildren } from './tag-group-children.web.js';
import type {
  TagGroupProps,
  TagGroupListProps,
  TagGroupItemProps,
  TagGroupLabelProps,
  TagGroupRemoveButtonProps,
} from './tag-group.types.js';
import * as L from '../../primitives/web/components/label/index.js';
import * as T from '../../primitives/web/components/tag/index.js';
import * as W from '../../primitives/web/components/tag-group/index.js';
export type * from './tag-group.types.js';

export type TagGroupRootRef = ComponentRef<typeof W.TagGroup>;
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
  const Target = W.TagGroup;
  return (
    <Target
      {...webProps}
      ref={ref}
      className={className}
      selectionMode={selectionMode}
      selectedKeys={selectedKeys}
      defaultSelectedKeys={defaultSelectedKeys}
      disabledKeys={disabledKeys}
      onSelectionChange={(keys) => {
        if (keys !== 'all') onSelectionChange?.(new Set(Array.from(keys, String)));
      }}
      onRemove={onRemove ? (keys) => onRemove(new Set(Array.from(keys, String))) : undefined}>
      {children}
    </Target>
  );
});

export type TagGroupListRef = ComponentRef<typeof W.TagGroup.List>;
const TagGroupList = forwardRef<TagGroupListRef, TagGroupListProps>(function TagGroupList(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = W.TagGroup.List;
  return (
    <Target {...webProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type TagGroupItemRef = ComponentRef<typeof T.Tag>;
const TagGroupItem = forwardRef<TagGroupItemRef, TagGroupItemProps>(function TagGroupItem(
  { children, className, id, textValue, isDisabled, webProps, nativeProps },
  ref
) {
  const Target = T.Tag;
  return (
    <Target
      {...webProps}
      ref={ref}
      className={className}
      id={id}
      textValue={textValue}
      isDisabled={isDisabled}>
      {mapTagGroupChildren(children, TagGroupRemoveButton)}
    </Target>
  );
});

export type TagGroupLabelRef = ComponentRef<typeof L.Label.Root>;
const TagGroupLabel = forwardRef<TagGroupLabelRef, TagGroupLabelProps>(function TagGroupLabel(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = L.Label.Root;
  return (
    <Target {...webProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type TagGroupRemoveButtonRef = ComponentRef<typeof T.Tag.RemoveButton>;
const TagGroupRemoveButton = forwardRef<TagGroupRemoveButtonRef, TagGroupRemoveButtonProps>(
  function TagGroupRemoveButton({ children, className, webProps, nativeProps }, ref) {
    const Target = T.Tag.RemoveButton;
    return (
      <Target {...webProps} ref={ref} className={className}>
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
