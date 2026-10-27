import type { ReactNode } from 'react';

import type { TextFieldRootProps as NativeTextFieldRootProps } from '../../primitives/native/components/text-field/index.js';
import type { TextFieldRootProps as WebTextFieldRootProps } from '../../primitives/web/components/textfield/index.js';

type OwnedProps = 'children' | 'className' | 'isDisabled' | 'isInvalid' | 'isRequired' | 'ref';

export type TextFieldWebProps = Omit<WebTextFieldRootProps, OwnedProps>;

export type TextFieldNativeProps = Omit<NativeTextFieldRootProps, OwnedProps>;

export interface TextFieldProps {
  children?: ReactNode;
  className?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  nativeProps?: TextFieldNativeProps;
  webProps?: TextFieldWebProps;
}
