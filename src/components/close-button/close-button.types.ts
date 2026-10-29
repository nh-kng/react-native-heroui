import type { ComponentProps, ReactNode } from 'react';

import * as N from '../../primitives/native/components/close-button/index.js';
import * as W from '../../primitives/web/components/close-button/index.js';
type PlatformOptions<T, K extends PropertyKey> = T extends unknown
  ? Omit<
      T,
      | K
      | 'render'
      | 'aria-disabled'
      | 'aria-checked'
      | 'aria-selected'
      | 'aria-invalid'
      | 'accessibilityState'
    >
  : never;

export interface CloseButtonProps {
  children?: ReactNode;
  className?: string;
  isDisabled?: boolean;
  onPress?: (event: import('../button/button.types.js').ButtonPressEvent) => void;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.CloseButton>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'isDisabled'
    | 'onPress'
    | 'disabled'
    | 'accessibilityState'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.CloseButton>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'isDisabled'
    | 'onPress'
    | 'disabled'
    | 'accessibilityState'
  >;
}
