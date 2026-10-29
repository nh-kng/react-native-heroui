import { forwardRef, type ComponentRef } from 'react';

import type { SurfaceProps } from './surface.types.js';
import * as W from '../../primitives/web/components/surface/index.js';
export type * from './surface.types.js';

export type SurfaceRootRef = ComponentRef<typeof W.Surface.Root<'div'>>;
const SurfaceRoot = forwardRef<SurfaceRootRef, SurfaceProps>(function SurfaceRoot(
  { children, className, variant, webProps, nativeProps },
  ref
) {
  const Target = W.Surface.Root<'div'>;
  return (
    <Target {...webProps} ref={ref} className={className} variant={variant}>
      {children}
    </Target>
  );
});

export const Surface = Object.assign(SurfaceRoot, { Root: SurfaceRoot });
