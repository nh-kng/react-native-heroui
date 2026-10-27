import type { DescriptionRootProps as WebDescriptionProps } from '@heroui/react/description';
import { Description as NativeDescription, type DescriptionProps as NativeDescriptionProps } from 'heroui-native/description';
import type { ComponentRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef } from 'react';

type OwnedProps = 'children' | 'className' | 'ref';

export type DescriptionNativeProps = Omit<NativeDescriptionProps, OwnedProps>;
export type DescriptionWebProps = Omit<WebDescriptionProps, OwnedProps>;

export interface DescriptionProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: DescriptionNativeProps;
  webProps?: DescriptionWebProps;
}

export type DescriptionRef = ComponentRef<typeof NativeDescription>;

const DescriptionRoot: ForwardRefExoticComponent<DescriptionProps & RefAttributes<DescriptionRef>> = forwardRef<DescriptionRef, DescriptionProps>(function DescriptionRoot(
  { children, className, nativeProps, webProps: _webProps },
  ref,
) {
  return (
    <NativeDescription {...nativeProps} ref={ref} className={className}>
      {children}
    </NativeDescription>
  );
});

DescriptionRoot.displayName = 'Description';

type DescriptionComponent = typeof DescriptionRoot & { Root: typeof DescriptionRoot };

export const Description: DescriptionComponent = Object.assign(DescriptionRoot, { Root: DescriptionRoot });
