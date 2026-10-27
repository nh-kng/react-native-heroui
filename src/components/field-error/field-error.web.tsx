import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import type { FieldErrorProps } from './field-error.types.js';
import { FieldError as WebFieldError } from '../../primitives/web/components/field-error/index.js';
export type {
  FieldErrorNativeProps,
  FieldErrorProps,
  FieldErrorWebProps,
} from './field-error.types.js';

export type FieldErrorRef = ComponentRef<typeof WebFieldError.Root>;

const FieldErrorRoot = forwardRef<FieldErrorRef, FieldErrorProps>(function FieldErrorRoot(
  { children, className, nativeProps: _nativeProps, webProps },
  ref
) {
  return (
    <WebFieldError.Root {...webProps} ref={ref} className={className}>
      {children}
    </WebFieldError.Root>
  );
});

FieldErrorRoot.displayName = 'FieldError';

type FieldErrorComponent = typeof FieldErrorRoot & { Root: typeof FieldErrorRoot };

export const FieldError: FieldErrorComponent = Object.assign(FieldErrorRoot, {
  Root: FieldErrorRoot,
});
