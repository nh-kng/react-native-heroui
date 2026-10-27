import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import type { LabelProps } from './label.types.js';
import { Label as WebLabel } from '../../primitives/web/components/label/index.js';
export type { LabelNativeProps, LabelProps, LabelWebProps } from './label.types.js';

export type LabelRef = ComponentRef<typeof WebLabel.Root>;

const LabelRoot = forwardRef<LabelRef, LabelProps>(function LabelRoot(
  { children, className, isDisabled, isInvalid, isRequired, nativeProps: _nativeProps, webProps },
  ref
) {
  return (
    <WebLabel.Root
      {...webProps}
      ref={ref}
      className={className}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isRequired={isRequired}>
      {children}
    </WebLabel.Root>
  );
});

LabelRoot.displayName = 'Label';

type LabelComponent = typeof LabelRoot & { Root: typeof LabelRoot };

export const Label: LabelComponent = Object.assign(LabelRoot, { Root: LabelRoot });
