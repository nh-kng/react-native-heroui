import type { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';

import type { LabelProps } from './label.types.js';
import { Label as NativeLabel } from '../../primitives/native/components/label/index.js';
export type { LabelNativeProps, LabelProps, LabelWebProps } from './label.types.js';

export type LabelRef = ComponentRef<typeof NativeLabel>;

const LabelRoot: ForwardRefExoticComponent<LabelProps & RefAttributes<LabelRef>> = forwardRef<
  LabelRef,
  LabelProps
>(function LabelRoot(
  { children, className, isDisabled, isInvalid, isRequired, nativeProps, webProps: _webProps },
  ref
) {
  return (
    <NativeLabel
      {...nativeProps}
      ref={ref}
      className={className}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isRequired={isRequired}>
      {children}
    </NativeLabel>
  );
});

LabelRoot.displayName = 'Label';

type LabelComponent = typeof LabelRoot & { Root: typeof LabelRoot };

export const Label: LabelComponent = Object.assign(LabelRoot, { Root: LabelRoot });
