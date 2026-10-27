import type { ReactNode } from 'react';

import type { LabelProps as NativeLabelProps } from '../../primitives/native/components/label/index.js';
import type { LabelRootProps as WebLabelProps } from '../../primitives/web/components/label/index.js';

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
