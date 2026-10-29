import { forwardRef, type ComponentRef } from 'react';

import { isSelectControlled } from './select-mapping.js';
import type {
  SelectProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectContentProps,
  SelectItemProps,
} from './select.types.js';
import { ListBox } from '../../primitives/web/components/list-box/index.js';
import { Select as W } from '../../primitives/web/components/select/index.js';
export type * from './select.types.js';

export type SelectRootRef = ComponentRef<typeof W>;
const SelectRoot = forwardRef<SelectRootRef, SelectProps>(function SelectRoot(props, ref) {
  const {
    children,
    className,
    items,
    value,
    defaultValue,
    onValueChange,
    isDisabled,
    isOpen,
    defaultOpen,
    onOpenChange,
    webProps,
  } = props;
  const isControlled = isSelectControlled(props);
  return (
    <W
      {...webProps}
      ref={ref}
      className={className}
      value={isControlled ? (value ?? null) : undefined}
      defaultValue={defaultValue}
      onChange={(key) => onValueChange?.(key == null ? undefined : String(key))}
      disabledKeys={items.filter((item) => item.isDisabled).map((item) => item.value)}
      isDisabled={isDisabled}
      isOpen={isOpen}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}>
      {children}
    </W>
  );
});
export type SelectTriggerRef = ComponentRef<typeof W.Trigger>;
const SelectTrigger = forwardRef<SelectTriggerRef, SelectTriggerProps>(function SelectTrigger(
  { children, className, webProps },
  ref
) {
  return (
    <W.Trigger {...webProps} ref={ref} className={className}>
      {children}
      <W.Indicator />
    </W.Trigger>
  );
});
export type SelectValueRef = ComponentRef<typeof W.Value>;
const SelectValue = forwardRef<SelectValueRef, SelectValueProps>(function SelectValue(
  { placeholder = 'Select an option', className, webProps },
  ref
) {
  return (
    <W.Value {...webProps} ref={ref} className={className}>
      {({ isPlaceholder, defaultChildren }) => (isPlaceholder ? placeholder : defaultChildren)}
    </W.Value>
  );
});
export type SelectContentRef = ComponentRef<typeof W.Popover>;
const SelectContent = forwardRef<SelectContentRef, SelectContentProps>(function SelectContent(
  { children, className, webProps },
  ref
) {
  return (
    <W.Popover {...webProps} ref={ref} className={className}>
      <ListBox>{children}</ListBox>
    </W.Popover>
  );
});
export type SelectItemRef = ComponentRef<typeof ListBox.Item>;
const SelectItem = forwardRef<SelectItemRef, SelectItemProps>(function SelectItem(
  { children, className, value, label, isDisabled, webProps },
  ref
) {
  return (
    <ListBox.Item
      {...webProps}
      ref={ref}
      className={className}
      id={value}
      textValue={label}
      isDisabled={isDisabled}>
      {children ?? label}
    </ListBox.Item>
  );
});
export const Select = Object.assign(SelectRoot, {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Content: SelectContent,
  Item: SelectItem,
});
