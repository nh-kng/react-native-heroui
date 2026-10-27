import { Label as WebLabel, type LabelRootProps as WebLabelProps } from '@heroui/react/label';
import type { LabelProps as NativeLabelProps } from 'heroui-native/label';
import type { ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';

type OwnedProps = 'children' | 'className' | 'isDisabled' | 'isInvalid' | 'isRequired' | 'ref';

export type LabelWebProps = Omit<WebLabelProps, OwnedProps>;
export type LabelNativeProps = Omit<NativeLabelProps, OwnedProps>;

export interface LabelProps {
  children?: ReactNode;
  className?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  nativeProps?: LabelNativeProps;
  webProps?: LabelWebProps;
}

export type LabelRef = ComponentRef<typeof WebLabel.Root>;

const LabelRoot = forwardRef<LabelRef, LabelProps>(function LabelRoot(
  { children, className, isDisabled, isInvalid, isRequired, nativeProps: _nativeProps, webProps },
  ref,
) {
  return (
    <WebLabel.Root
      {...webProps}
      ref={ref}
      className={className}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isRequired={isRequired}
    >
      {children}
    </WebLabel.Root>
  );
});

LabelRoot.displayName = 'Label';

type LabelComponent = typeof LabelRoot & { Root: typeof LabelRoot };

export const Label: LabelComponent = Object.assign(LabelRoot, { Root: LabelRoot });
