import { forwardRef, type ComponentRef } from 'react';

import type {
  PopoverProps,
  PopoverTriggerProps,
  PopoverContentProps,
  PopoverArrowProps,
} from './popover.types.js';
import * as W from '../../primitives/web/components/popover/index.js';
export type * from './popover.types.js';

function PopoverRoot({
  children,
  className,
  isOpen,
  defaultOpen,
  onOpenChange,
  webProps,
  nativeProps,
}: PopoverProps) {
  const Target = W.Popover;
  return (
    <Target {...webProps} isOpen={isOpen} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <div className={className}>{children}</div>
    </Target>
  );
}

export type PopoverTriggerRef = ComponentRef<typeof W.Popover.Trigger<'div'>>;
const PopoverTrigger = forwardRef<PopoverTriggerRef, PopoverTriggerProps>(function PopoverTrigger(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = W.Popover.Trigger<'div'>;
  return (
    <Target {...webProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type PopoverContentRef = ComponentRef<typeof W.Popover.Content>;
const PopoverContent = forwardRef<PopoverContentRef, PopoverContentProps>(function PopoverContent(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = W.Popover.Content;
  return (
    <Target {...webProps} ref={ref} className={className}>
      <W.Popover.Dialog>{children}</W.Popover.Dialog>
    </Target>
  );
});

export type PopoverArrowRef = ComponentRef<typeof W.Popover.Arrow>;
const PopoverArrow = forwardRef<PopoverArrowRef, PopoverArrowProps>(function PopoverArrow(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = W.Popover.Arrow;
  return (
    <Target {...webProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export const Popover = Object.assign(PopoverRoot, {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Arrow: PopoverArrow,
});
