import { forwardRef, type ComponentRef } from 'react';

import { spinnerColorToNative } from './spinner-mapping.js';
import type { SpinnerProps } from './spinner.types.js';
import * as N from '../../primitives/native/components/spinner/index.js';
export type * from './spinner.types.js';

export type SpinnerRootRef = ComponentRef<typeof N.Spinner>;
const SpinnerRoot = forwardRef<SpinnerRootRef, SpinnerProps>(function SpinnerRoot(
  { className, size = 'md', color = 'accent', isLoading, webProps, nativeProps },
  ref
) {
  const Target = N.Spinner;
  return (
    <Target
      {...nativeProps}
      ref={ref}
      className={className}
      size={size}
      color={spinnerColorToNative(color)}
      isLoading={isLoading}
    />
  );
});

export const Spinner = Object.assign(SpinnerRoot, { Root: SpinnerRoot });
