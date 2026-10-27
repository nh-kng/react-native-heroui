import type { ReactNode } from 'react';

import type { DescriptionProps as NativeDescriptionProps } from '../../primitives/native/components/description/index.js';
import type { DescriptionRootProps as WebDescriptionProps } from '../../primitives/web/components/description/index.js';

type OwnedProps = 'children' | 'className' | 'ref';

export type DescriptionWebProps = Omit<WebDescriptionProps, OwnedProps>;

export type DescriptionNativeProps = Omit<NativeDescriptionProps, OwnedProps>;

export interface DescriptionProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: DescriptionNativeProps;
  webProps?: DescriptionWebProps;
}
