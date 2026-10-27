import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import type { DescriptionProps } from './description.types.js';
import { Description as WebDescription } from '../../primitives/web/components/description/index.js';
export type {
  DescriptionNativeProps,
  DescriptionProps,
  DescriptionWebProps,
} from './description.types.js';

export type DescriptionRef = ComponentRef<typeof WebDescription.Root>;

const DescriptionRoot = forwardRef<DescriptionRef, DescriptionProps>(function DescriptionRoot(
  { children, className, nativeProps: _nativeProps, webProps },
  ref
) {
  return (
    <WebDescription.Root {...webProps} ref={ref} className={className}>
      {children}
    </WebDescription.Root>
  );
});

DescriptionRoot.displayName = 'Description';

type DescriptionComponent = typeof DescriptionRoot & { Root: typeof DescriptionRoot };

export const Description: DescriptionComponent = Object.assign(DescriptionRoot, {
  Root: DescriptionRoot,
});
