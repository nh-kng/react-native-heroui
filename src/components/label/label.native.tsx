import type { LabelRootProps as WebLabelProps } from '@heroui/react/label';
import { Label as NativeLabel, type LabelProps as NativeLabelProps } from 'heroui-native/label';
import type { ComponentRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef } from 'react';

type OwnedProps = 'children' | 'className' | 'isDisabled' | 'isInvalid' | 'isRequired' | 'ref';

export type LabelNativeProps = Omit<NativeLabelProps, OwnedProps>;
export type LabelWebProps = Omit<WebLabelProps, OwnedProps>;

export interface LabelProps {
  children?: ReactNode;
  className?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  nativeProps?: LabelNativeProps;
  webProps?: LabelWebProps;
}

export type LabelRef = ComponentRef<typeof NativeLabel>;

const LabelRoot: ForwardRefExoticComponent<LabelProps & RefAttributes<LabelRef>> = forwardRef<LabelRef, LabelProps>(function LabelRoot(
  { children, className, isDisabled, isInvalid, isRequired, nativeProps, webProps: _webProps },
  ref,
) {
  return (
    <NativeLabel
      {...nativeProps}
      ref={ref}
      className={className}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isRequired={isRequired}
    >
      {children}
    </NativeLabel>
  );
});

LabelRoot.displayName = 'Label';

type LabelComponent = typeof LabelRoot & { Root: typeof LabelRoot };

export const Label: LabelComponent = Object.assign(LabelRoot, { Root: LabelRoot });
