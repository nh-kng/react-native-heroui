import type { ReactNode } from 'react';

import type { FieldErrorRootProps as NativeFieldErrorProps } from '../../primitives/native/components/field-error/index.js';
import type { FieldErrorRootProps as WebFieldErrorProps } from '../../primitives/web/components/field-error/index.js';

type OwnedProps = 'children' | 'className' | 'ref';

export type FieldErrorWebProps = Omit<WebFieldErrorProps, OwnedProps>;

export type FieldErrorNativeProps = Omit<NativeFieldErrorProps, OwnedProps>;

export interface FieldErrorProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: FieldErrorNativeProps;
  webProps?: FieldErrorWebProps;
}
