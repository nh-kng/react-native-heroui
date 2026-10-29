import { forwardRef, type ComponentRef } from 'react';

import { ScrollGradient } from './gradient.native.js';
import type { ScrollShadowProps } from './scroll-shadow.types.js';
import * as N from '../../primitives/native/components/scroll-shadow/index.js';
export type * from './scroll-shadow.types.js';

export type ScrollShadowRootRef = ComponentRef<typeof N.ScrollShadow>;
const ScrollShadowRoot = forwardRef<ScrollShadowRootRef, ScrollShadowProps>(
  function ScrollShadowRoot(
    {
      children,
      className,
      orientation = 'vertical',
      size = 40,
      isEnabled = true,
      webProps,
      nativeProps,
    },
    ref
  ) {
    const Target = N.ScrollShadow;
    return (
      <Target
        {...nativeProps}
        ref={ref}
        LinearGradientComponent={nativeProps?.LinearGradientComponent ?? ScrollGradient}
        className={className}
        orientation={orientation}
        size={size}
        isEnabled={isEnabled}>
        {children}
      </Target>
    );
  }
);

export const ScrollShadow = Object.assign(ScrollShadowRoot, { Root: ScrollShadowRoot });
