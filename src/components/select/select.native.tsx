import { use, forwardRef, type ComponentRef } from 'react';

import { SelectItemsContext } from './select-context.js';
import { findSelectOption, isSelectControlled } from './select-mapping.js';
import type {
  SelectProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectContentProps,
  SelectItemProps,
} from './select.types.js';
import { Select as N } from '../../primitives/native/components/select/index.js';
export type * from './select.types.js';

export type SelectRootRef = ComponentRef<typeof N<'single'>>;
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
    nativeProps,
  } = props;
  const isControlled = isSelectControlled(props);
  return (
    <N<'single'>
      {...nativeProps}
      ref={ref}
      className={className}
      selectionMode="single"
      isValueControlled={isControlled}
      value={findSelectOption(items, value)}
      defaultValue={findSelectOption(items, defaultValue)}
      onValueChange={(option) => onValueChange?.(option?.value)}
      isDisabled={isDisabled}
      isOpen={isOpen}
      isDefaultOpen={defaultOpen}
      onOpenChange={onOpenChange}>
      <SelectItemsContext value={items}>{children}</SelectItemsContext>
    </N>
  );
});
export type SelectTriggerRef = ComponentRef<typeof N.Trigger>;
const SelectTrigger = forwardRef<SelectTriggerRef, SelectTriggerProps>(function SelectTrigger(
  { children, className, nativeProps },
  ref
) {
  return (
    <N.Trigger {...nativeProps} ref={ref} className={className}>
      {children}
      <N.TriggerIndicator />
    </N.Trigger>
  );
});
export type SelectValueRef = ComponentRef<typeof N.Value>;
const SelectValue = forwardRef<SelectValueRef, SelectValueProps>(function SelectValue(
  { placeholder, className, nativeProps },
  ref
) {
  return (
    <N.Value
      {...nativeProps}
      ref={ref}
      className={className}
      placeholder={placeholder ?? 'Select an option'}
    />
  );
});
export type SelectContentRef = ComponentRef<typeof N.Content>;
const SelectContent = forwardRef<SelectContentRef, SelectContentProps>(function SelectContent(
  { children, className, nativeProps },
  ref
) {
  const contentProps = nativeProps ?? { presentation: 'popover' as const };
  return (
    <N.Portal>
      <N.Overlay />
      <N.Content {...contentProps} ref={ref} className={className}>
        {children}
      </N.Content>
    </N.Portal>
  );
});
export type SelectItemRef = ComponentRef<typeof N.Item>;
const SelectItem = forwardRef<SelectItemRef, SelectItemProps>(function SelectItem(
  { children, className, value, label, isDisabled, nativeProps },
  ref
) {
  const items = use(SelectItemsContext);
  const disabled = isDisabled || items.find((item) => item.value === value)?.isDisabled;
  return (
    <N.Item
      {...nativeProps}
      ref={ref}
      className={className}
      value={value}
      label={label}
      disabled={disabled}>
      {children}
    </N.Item>
  );
});
export const Select = Object.assign(SelectRoot, {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Content: SelectContent,
  Item: SelectItem,
});
