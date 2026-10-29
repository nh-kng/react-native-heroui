import { forwardRef, type ComponentRef } from 'react';

import type { SurfaceProps } from './surface.types.js';
import * as N from '../../primitives/native/components/surface/index.js';
export type * from './surface.types.js';

export type SurfaceRootRef = ComponentRef<typeof N.Surface>;
const SurfaceRoot = forwardRef<SurfaceRootRef, SurfaceProps>(function SurfaceRoot(
  { children, className, variant, webProps, nativeProps },
  ref
) {
  const Target = N.Surface;
  return (
    <Target {...nativeProps} ref={ref} className={className} variant={variant}>
      {children}
    </Target>
  );
});

export const Surface = Object.assign(SurfaceRoot, { Root: SurfaceRoot });
