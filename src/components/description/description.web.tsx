import { Description as WebDescription, type DescriptionRootProps as WebDescriptionProps } from '@heroui/react/description';
import type { DescriptionProps as NativeDescriptionProps } from 'heroui-native/description';
import type { ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';

type OwnedProps = 'children' | 'className' | 'ref';

export type DescriptionWebProps = Omit<WebDescriptionProps, OwnedProps>;
export type DescriptionNativeProps = Omit<NativeDescriptionProps, OwnedProps>;

export interface DescriptionProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: DescriptionNativeProps;
  webProps?: DescriptionWebProps;
}

export type DescriptionRef = ComponentRef<typeof WebDescription.Root>;

const DescriptionRoot = forwardRef<DescriptionRef, DescriptionProps>(function DescriptionRoot(
  { children, className, nativeProps: _nativeProps, webProps },
  ref,
) {
  return (
    <WebDescription.Root {...webProps} ref={ref} className={className}>
      {children}
    </WebDescription.Root>
  );
});

DescriptionRoot.displayName = 'Description';

type DescriptionComponent = typeof DescriptionRoot & { Root: typeof DescriptionRoot };

export const Description: DescriptionComponent = Object.assign(DescriptionRoot, { Root: DescriptionRoot });
