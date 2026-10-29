import { forwardRef, type ComponentRef } from 'react';

import type {
  PopoverProps,
  PopoverTriggerProps,
  PopoverContentProps,
  PopoverArrowProps,
} from './popover.types.js';
import * as N from '../../primitives/native/components/popover/index.js';
export type * from './popover.types.js';

export type PopoverRootRef = ComponentRef<typeof N.Popover>;
const PopoverRoot = forwardRef<PopoverRootRef, PopoverProps>(function PopoverRoot(
  { children, className, isOpen, defaultOpen, onOpenChange, webProps, nativeProps },
  ref
) {
  const Target = N.Popover;
  return (
    <Target
      {...nativeProps}
      ref={ref}
      className={className}
      isOpen={isOpen}
      isDefaultOpen={defaultOpen}
      onOpenChange={onOpenChange}>
      {children}
    </Target>
  );
});

export type PopoverTriggerRef = ComponentRef<typeof N.Popover.Trigger>;
const PopoverTrigger = forwardRef<PopoverTriggerRef, PopoverTriggerProps>(function PopoverTrigger(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = N.Popover.Trigger;
  return (
    <Target {...nativeProps} ref={ref} className={className} asChild>
      {children}
    </Target>
  );
});

export type PopoverContentRef = ComponentRef<typeof N.Popover.Content>;
const PopoverContent = forwardRef<PopoverContentRef, PopoverContentProps>(function PopoverContent(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = N.Popover.Content;
  return (
    <N.Popover.Portal>
      <N.Popover.Overlay />
      <Target presentation="popover" {...nativeProps} ref={ref} className={className}>
        {children}
      </Target>
    </N.Popover.Portal>
  );
});

export type PopoverArrowRef = ComponentRef<typeof N.Popover.Arrow>;
const PopoverArrow = forwardRef<PopoverArrowRef, PopoverArrowProps>(function PopoverArrow(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = N.Popover.Arrow;
  return (
    <Target {...nativeProps} ref={ref} className={className}>
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
