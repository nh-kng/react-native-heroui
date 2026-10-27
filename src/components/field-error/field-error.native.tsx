import type { FieldErrorRootProps as WebFieldErrorProps } from '@heroui/react/field-error';
import { FieldError as NativeFieldError, type FieldErrorRootProps as NativeFieldErrorProps } from 'heroui-native/field-error';
import type { ComponentRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef } from 'react';

type OwnedProps = 'children' | 'className' | 'ref';

export type FieldErrorNativeProps = Omit<NativeFieldErrorProps, OwnedProps>;
export type FieldErrorWebProps = Omit<WebFieldErrorProps, OwnedProps>;

export interface FieldErrorProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: FieldErrorNativeProps;
  webProps?: FieldErrorWebProps;
}

export type FieldErrorRef = ComponentRef<typeof NativeFieldError>;

const FieldErrorRoot: ForwardRefExoticComponent<FieldErrorProps & RefAttributes<FieldErrorRef>> = forwardRef<FieldErrorRef, FieldErrorProps>(function FieldErrorRoot(
  { children, className, nativeProps, webProps: _webProps },
  ref,
) {
  return (
    <NativeFieldError {...nativeProps} ref={ref} className={className}>
      {children}
    </NativeFieldError>
  );
});

FieldErrorRoot.displayName = 'FieldError';

type FieldErrorComponent = typeof FieldErrorRoot & { Root: typeof FieldErrorRoot };

export const FieldError: FieldErrorComponent = Object.assign(FieldErrorRoot, { Root: FieldErrorRoot });
