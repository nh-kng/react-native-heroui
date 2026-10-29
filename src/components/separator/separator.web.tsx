import { forwardRef, type ComponentRef } from 'react';

import type { SeparatorProps } from './separator.types.js';
import * as W from '../../primitives/web/components/separator/index.js';
export type * from './separator.types.js';

export type SeparatorRootRef = ComponentRef<typeof W.Separator>;
const SeparatorRoot = forwardRef<SeparatorRootRef, SeparatorProps>(function SeparatorRoot(
  { className, orientation, webProps, nativeProps },
  ref
) {
  const Target = W.Separator;
  return <Target {...webProps} ref={ref} className={className} orientation={orientation} />;
});

export const Separator = Object.assign(SeparatorRoot, { Root: SeparatorRoot });
