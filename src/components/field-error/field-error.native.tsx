import type { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';

import type { FieldErrorProps } from './field-error.types.js';
import { FieldError as NativeFieldError } from '../../primitives/native/components/field-error/index.js';
export type {
  FieldErrorNativeProps,
  FieldErrorProps,
  FieldErrorWebProps,
} from './field-error.types.js';

export type FieldErrorRef = ComponentRef<typeof NativeFieldError>;

const FieldErrorRoot: ForwardRefExoticComponent<FieldErrorProps & RefAttributes<FieldErrorRef>> =
  forwardRef<FieldErrorRef, FieldErrorProps>(function FieldErrorRoot(
    { children, className, nativeProps, webProps: _webProps },
    ref
  ) {
    return (
      <NativeFieldError {...nativeProps} ref={ref} className={className}>
        {children}
      </NativeFieldError>
    );
  });

FieldErrorRoot.displayName = 'FieldError';

type FieldErrorComponent = typeof FieldErrorRoot & { Root: typeof FieldErrorRoot };

export const FieldError: FieldErrorComponent = Object.assign(FieldErrorRoot, {
  Root: FieldErrorRoot,
});
