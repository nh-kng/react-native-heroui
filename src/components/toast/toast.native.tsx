import { forwardRef, type ComponentRef } from 'react';

import type {
  ToastProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastActionProps,
  ToastCloseProps,
} from './toast.types.js';
import { Toast as N } from '../../primitives/native/components/toast/index.js';
export type * from './toast.types.js';
export { useToast } from './toast-context.js';
export type ToastRootRef = ComponentRef<typeof N>;
const ToastRoot = forwardRef<ToastRootRef, ToastProps>(function ToastRoot(
  { children, className, variant, nativeProps },
  ref
) {
  if (!nativeProps)
    throw new Error(
      'Toast.Root requires the lifecycle props supplied by the platform toast renderer. Use useToast() for shared notifications.'
    );
  return (
    <N {...nativeProps} ref={ref} className={className} variant={variant}>
      {children}
    </N>
  );
});
export type ToastTitleRef = ComponentRef<typeof N.Title>;
const ToastTitle = forwardRef<ToastTitleRef, ToastTitleProps>(function ToastTitle(
  { children, className, nativeProps },
  ref
) {
  return (
    <N.Title {...nativeProps} ref={ref} className={className}>
      {children}
    </N.Title>
  );
});
export type ToastDescriptionRef = ComponentRef<typeof N.Description>;
const ToastDescription = forwardRef<ToastDescriptionRef, ToastDescriptionProps>(
  function ToastDescription({ children, className, nativeProps }, ref) {
    return (
      <N.Description {...nativeProps} ref={ref} className={className}>
        {children}
      </N.Description>
    );
  }
);
export type ToastActionRef = ComponentRef<typeof N.Action>;
const ToastAction = forwardRef<ToastActionRef, ToastActionProps>(function ToastAction(
  { children, className, nativeProps },
  ref
) {
  return (
    <N.Action {...nativeProps} ref={ref} className={className}>
      {children}
    </N.Action>
  );
});
export type ToastCloseRef = ComponentRef<typeof N.Close>;
const ToastClose = forwardRef<ToastCloseRef, ToastCloseProps>(function ToastClose(
  { children, className, nativeProps },
  ref
) {
  return (
    <N.Close {...nativeProps} ref={ref} className={className}>
      {children}
    </N.Close>
  );
});
export const Toast = Object.assign(ToastRoot, {
  Root: ToastRoot,
  Title: ToastTitle,
  Description: ToastDescription,
  Action: ToastAction,
  Close: ToastClose,
});
