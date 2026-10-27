import type { ReactNode } from 'react';

import type {
  Button as NativeButton,
  ButtonRootProps as NativeButtonRootProps,
} from '../../primitives/native/components/button/index.js';
import type { ButtonRootProps as WebButtonRootProps } from '../../primitives/web/components/button/index.js';

type ButtonOwnedProps =
  | 'children'
  | 'className'
  | 'fullWidth'
  | 'isDisabled'
  | 'isIconOnly'
  | 'isPending'
  | 'isLoading'
  | 'onPress'
  | 'ref'
  | 'size'
  | 'variant';

type EventOf<T> = T extends (event: infer Event, ...args: never[]) => unknown ? Event : never;

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

export type ButtonPressEvent =
  EventOf<NativeButtonRootProps['onPress']> | EventOf<WebButtonRootProps['onPress']>;

export type ButtonWebProps = DistributiveOmit<WebButtonRootProps, ButtonOwnedProps | 'aria-busy'>;

export type ButtonNativeProps = DistributiveOmit<
  NativeButtonRootProps,
  ButtonOwnedProps | 'accessibilityState'
>;

export interface ButtonProps {
  children?: ReactNode;
  className?: string;
  fullWidth?: boolean;
  isDisabled?: boolean;
  isIconOnly?: boolean;
  isLoading?: boolean;
  /** @deprecated Use isLoading. */
  isPending?: boolean;
  nativeProps?: ButtonNativeProps;
  onPress?: (event: ButtonPressEvent) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: NonNullable<WebButtonRootProps['variant']> &
    NonNullable<NativeButtonRootProps['variant']>;
  webProps?: ButtonWebProps;
}

export interface ButtonLabelProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<
    React.ComponentProps<typeof NativeButton.Label>,
    'children' | 'className' | 'ref'
  >;
  webProps?: Omit<React.ComponentPropsWithRef<'span'>, 'children' | 'className' | 'ref'>;
}

export interface ButtonBackgroundProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<
    React.ComponentProps<typeof NativeButton.Background>,
    'children' | 'className' | 'ref'
  >;
  webProps?: Omit<React.ComponentPropsWithRef<'span'>, 'children' | 'className' | 'ref' | 'aria-hidden'>;
}
