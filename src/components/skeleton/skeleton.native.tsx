import type { SkeletonProps } from './skeleton.types.js';
import * as N from '../../primitives/native/components/skeleton/index.js';
export type * from './skeleton.types.js';

function SkeletonRoot({
  children,
  className,
  isLoading = true,
  webProps,
  nativeProps,
}: SkeletonProps) {
  const Target = N.Skeleton;
  return (
    <Target {...nativeProps} className={className} isLoading={isLoading}>
      {children}
    </Target>
  );
}

export const Skeleton = Object.assign(SkeletonRoot, { Root: SkeletonRoot });
