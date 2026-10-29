import { forwardRef, type ComponentRef } from 'react';

import type {
  AlertProps,
  AlertIndicatorProps,
  AlertContentProps,
  AlertTitleProps,
  AlertDescriptionProps,
} from './alert.types.js';
import * as N from '../../primitives/native/components/alert/index.js';
export type * from './alert.types.js';

export type AlertRootRef = ComponentRef<typeof N.Alert>;
const AlertRoot = forwardRef<AlertRootRef, AlertProps>(function AlertRoot(
  { children, className, status = 'default', webProps, nativeProps },
  ref
) {
  const Target = N.Alert;
  return (
    <Target {...nativeProps} ref={ref} className={className} status={status}>
      {children}
    </Target>
  );
});

export type AlertIndicatorRef = ComponentRef<typeof N.Alert.Indicator>;
const AlertIndicator = forwardRef<AlertIndicatorRef, AlertIndicatorProps>(function AlertIndicator(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = N.Alert.Indicator;
  return (
    <Target {...nativeProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type AlertContentRef = ComponentRef<typeof N.Alert.Content>;
const AlertContent = forwardRef<AlertContentRef, AlertContentProps>(function AlertContent(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = N.Alert.Content;
  return (
    <Target {...nativeProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type AlertTitleRef = ComponentRef<typeof N.Alert.Title>;
const AlertTitle = forwardRef<AlertTitleRef, AlertTitleProps>(function AlertTitle(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = N.Alert.Title;
  return (
    <Target {...nativeProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type AlertDescriptionRef = ComponentRef<typeof N.Alert.Description>;
const AlertDescription = forwardRef<AlertDescriptionRef, AlertDescriptionProps>(
  function AlertDescription({ children, className, webProps, nativeProps }, ref) {
    const Target = N.Alert.Description;
    return (
      <Target {...nativeProps} ref={ref} className={className}>
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
