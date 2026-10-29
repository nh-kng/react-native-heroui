import { forwardRef, type ComponentRef } from 'react';

import type {
  AlertProps,
  AlertIndicatorProps,
  AlertContentProps,
  AlertTitleProps,
  AlertDescriptionProps,
} from './alert.types.js';
import * as W from '../../primitives/web/components/alert/index.js';
export type * from './alert.types.js';

export type AlertRootRef = ComponentRef<typeof W.Alert.Root<'div'>>;
const AlertRoot = forwardRef<AlertRootRef, AlertProps>(function AlertRoot(
  { children, className, status = 'default', webProps, nativeProps },
  ref
) {
  const Target = W.Alert.Root<'div'>;
  return (
    <Target {...webProps} ref={ref} className={className} status={status}>
      {children}
    </Target>
  );
});

export type AlertIndicatorRef = ComponentRef<typeof W.Alert.Indicator<'div'>>;
const AlertIndicator = forwardRef<AlertIndicatorRef, AlertIndicatorProps>(function AlertIndicator(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = W.Alert.Indicator<'div'>;
  return (
    <Target {...webProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type AlertContentRef = ComponentRef<typeof W.Alert.Content<'div'>>;
const AlertContent = forwardRef<AlertContentRef, AlertContentProps>(function AlertContent(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = W.Alert.Content<'div'>;
  return (
    <Target {...webProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type AlertTitleRef = ComponentRef<typeof W.Alert.Title<'div'>>;
const AlertTitle = forwardRef<AlertTitleRef, AlertTitleProps>(function AlertTitle(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = W.Alert.Title<'div'>;
  return (
    <Target {...webProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type AlertDescriptionRef = ComponentRef<typeof W.Alert.Description<'div'>>;
const AlertDescription = forwardRef<AlertDescriptionRef, AlertDescriptionProps>(
  function AlertDescription({ children, className, webProps, nativeProps }, ref) {
    const Target = W.Alert.Description<'div'>;
    return (
      <Target {...webProps} ref={ref} className={className}>
        {children}
      </Target>
    );
  }
);

export const Alert = Object.assign(AlertRoot, {
  Root: AlertRoot,
  Indicator: AlertIndicator,
  Content: AlertContent,
  Title: AlertTitle,
  Description: AlertDescription,
});
