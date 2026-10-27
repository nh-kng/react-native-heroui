import type { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';

import type { DescriptionProps } from './description.types.js';
import { Description as NativeDescription } from '../../primitives/native/components/description/index.js';
export type {
  DescriptionNativeProps,
  DescriptionProps,
  DescriptionWebProps,
} from './description.types.js';

export type DescriptionRef = ComponentRef<typeof NativeDescription>;

const DescriptionRoot: ForwardRefExoticComponent<DescriptionProps & RefAttributes<DescriptionRef>> =
  forwardRef<DescriptionRef, DescriptionProps>(function DescriptionRoot(
    { children, className, nativeProps, webProps: _webProps },
    ref
  ) {
    return (
      <NativeDescription {...nativeProps} ref={ref} className={className}>
        {children}
      </NativeDescription>
    );
  });

DescriptionRoot.displayName = 'Description';

type DescriptionComponent = typeof DescriptionRoot & { Root: typeof DescriptionRoot };

export const Description: DescriptionComponent = Object.assign(DescriptionRoot, {
  Root: DescriptionRoot,
});
