import { forwardRef, type ComponentRef } from 'react';

import type { SpinnerProps } from './spinner.types.js';
import * as W from '../../primitives/web/components/spinner/index.js';
export type * from './spinner.types.js';

export type SpinnerRootRef = ComponentRef<typeof W.Spinner.Root<'span'>>;
const SpinnerRoot = forwardRef<SpinnerRootRef, SpinnerProps>(function SpinnerRoot(
  { className, size = 'md', color = 'accent', isLoading, webProps, nativeProps },
  ref
) {
  const Target = W.Spinner.Root<'span'>;
  return isLoading === false ? null : (
    <Target {...webProps} ref={ref} className={className} size={size} color={color} />
  );
});

export const Spinner = Object.assign(SpinnerRoot, { Root: SpinnerRoot });
