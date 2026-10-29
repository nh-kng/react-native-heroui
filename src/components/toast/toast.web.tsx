import { forwardRef, type ComponentRef } from 'react';

import type {
  ToastProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastActionProps,
  ToastCloseProps,
} from './toast.types.js';
import { Toast as W } from '../../primitives/web/components/toast/index.js';
export type * from './toast.types.js';
export { useToast } from './toast-context.js';
export type ToastRootRef = ComponentRef<typeof W>;
const ToastRoot = forwardRef<ToastRootRef, ToastProps>(function ToastRoot(
  { children, className, variant, webProps },
  ref
) {
  if (!webProps)
    throw new Error(
      'Toast.Root requires the lifecycle props supplied by the platform toast renderer. Use useToast() for shared notifications.'
    );
  return (
    <W {...webProps} ref={ref} className={className} variant={variant}>
      {children}
    </W>
  );
});
export type ToastTitleRef = ComponentRef<typeof W.Title>;
const ToastTitle = forwardRef<ToastTitleRef, ToastTitleProps>(function ToastTitle(
  { children, className, webProps },
  ref
) {
  return (
    <W.Title {...webProps} ref={ref} className={className}>
      {children}
    </W.Title>
  );
});
export type ToastDescriptionRef = ComponentRef<typeof W.Description>;
const ToastDescription = forwardRef<ToastDescriptionRef, ToastDescriptionProps>(
  function ToastDescription({ children, className, webProps }, ref) {
    return (
      <W.Description {...webProps} ref={ref} className={className}>
        {children}
      </W.Description>
    );
  }
);
export type ToastActionRef = ComponentRef<typeof W.ActionButton>;
const ToastAction = forwardRef<ToastActionRef, ToastActionProps>(function ToastAction(
  { children, className, webProps },
  ref
) {
  return (
    <W.ActionButton {...webProps} ref={ref} className={className}>
      {children}
    </W.ActionButton>
  );
});
export type ToastCloseRef = ComponentRef<typeof W.CloseButton>;
const ToastClose = forwardRef<ToastCloseRef, ToastCloseProps>(function ToastClose(
  { children, className, webProps },
  ref
) {
  return (
    <W.CloseButton {...webProps} ref={ref} className={className}>
      {children}
    </W.CloseButton>
  );
});
export const Toast = Object.assign(ToastRoot, {
  Root: ToastRoot,
  Title: ToastTitle,
  Description: ToastDescription,
  Action: ToastAction,
  Close: ToastClose,
});
