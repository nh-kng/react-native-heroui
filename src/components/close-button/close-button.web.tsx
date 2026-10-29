import { forwardRef, type ComponentRef } from 'react';

import type { CloseButtonProps } from './close-button.types.js';
import * as W from '../../primitives/web/components/close-button/index.js';
export type * from './close-button.types.js';

export type CloseButtonRootRef = ComponentRef<typeof W.CloseButton>;
const CloseButtonRoot = forwardRef<CloseButtonRootRef, CloseButtonProps>(function CloseButtonRoot(
  { children, className, isDisabled, onPress, webProps, nativeProps },
  ref
) {
  const Target = W.CloseButton;
  return (
    <Target {...webProps} ref={ref} className={className} isDisabled={isDisabled} onPress={onPress}>
      {children}
    </Target>
  );
});

export const CloseButton = Object.assign(CloseButtonRoot, { Root: CloseButtonRoot });
