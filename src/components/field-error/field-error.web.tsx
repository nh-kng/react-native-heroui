import { FieldError as WebFieldError, type FieldErrorRootProps as WebFieldErrorProps } from '@heroui/react/field-error';
import type { FieldErrorRootProps as NativeFieldErrorProps } from 'heroui-native/field-error';
import type { ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';

type OwnedProps = 'children' | 'className' | 'ref';

export type FieldErrorWebProps = Omit<WebFieldErrorProps, OwnedProps>;
export type FieldErrorNativeProps = Omit<NativeFieldErrorProps, OwnedProps>;

export interface FieldErrorProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: FieldErrorNativeProps;
  webProps?: FieldErrorWebProps;
}

export type FieldErrorRef = ComponentRef<typeof WebFieldError.Root>;

const FieldErrorRoot = forwardRef<FieldErrorRef, FieldErrorProps>(function FieldErrorRoot(
  { children, className, nativeProps: _nativeProps, webProps },
  ref,
) {
  return (
    <WebFieldError.Root {...webProps} ref={ref} className={className}>
      {children}
    </WebFieldError.Root>
  );
});

FieldErrorRoot.displayName = 'FieldError';

type FieldErrorComponent = typeof FieldErrorRoot & { Root: typeof FieldErrorRoot };

export const FieldError: FieldErrorComponent = Object.assign(FieldErrorRoot, { Root: FieldErrorRoot });
