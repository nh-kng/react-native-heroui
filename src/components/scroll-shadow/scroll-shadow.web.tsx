import { forwardRef, type ComponentRef } from 'react';

import type { ScrollShadowProps } from './scroll-shadow.types.js';
import * as W from '../../primitives/web/components/scroll-shadow/index.js';
export type * from './scroll-shadow.types.js';

export type ScrollShadowRootRef = ComponentRef<typeof W.ScrollShadow>;
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
    const Target = W.ScrollShadow;
    return (
      <Target
        {...webProps}
        ref={ref}
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
