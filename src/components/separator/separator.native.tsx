import { forwardRef, type ComponentRef } from 'react';

import type { SeparatorProps } from './separator.types.js';
import * as N from '../../primitives/native/components/separator/index.js';
export type * from './separator.types.js';

export type SeparatorRootRef = ComponentRef<typeof N.Separator>;
const SeparatorRoot = forwardRef<SeparatorRootRef, SeparatorProps>(function SeparatorRoot(
  { className, orientation, webProps, nativeProps },
  ref
) {
  const Target = N.Separator;
  return <Target {...nativeProps} ref={ref} className={className} orientation={orientation} />;
});

export const Separator = Object.assign(SeparatorRoot, { Root: SeparatorRoot });
