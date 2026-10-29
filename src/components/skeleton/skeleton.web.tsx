import { forwardRef, type ComponentRef } from 'react';

import type { SkeletonProps } from './skeleton.types.js';
import * as W from '../../primitives/web/components/skeleton/index.js';
export type * from './skeleton.types.js';

export type SkeletonRootRef = ComponentRef<typeof W.Skeleton.Root<'div'>>;
const SkeletonRoot = forwardRef<SkeletonRootRef, SkeletonProps>(function SkeletonRoot(
  { children, className, isLoading = true, webProps, nativeProps },
  ref
) {
  const Target = W.Skeleton.Root<'div'>;
  return isLoading === false ? (
    <div {...webProps} ref={ref} className={className}>
      {children}
    </div>
  ) : (
    <Target {...webProps} ref={ref} className={className} aria-busy="true" />
  );
});

export const Skeleton = Object.assign(SkeletonRoot, { Root: SkeletonRoot });
