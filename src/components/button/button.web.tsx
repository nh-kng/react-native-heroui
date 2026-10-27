import {
  Button as WebButton,
  type ButtonRootProps as WebButtonRootProps,
} from '@heroui/react/button';
import type {
  Button as NativeButton,
  ButtonRootProps as NativeButtonRootProps,
} from 'heroui-native/button';
import type { ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';

type ButtonOwnedProps =
  | 'children'
  | 'className'
  | 'fullWidth'
  | 'isDisabled'
  | 'isIconOnly'
  | 'isPending'
  | 'onPress'
  | 'ref'
  | 'size'
  | 'variant';

type EventOf<T> = T extends (event: infer Event, ...args: never[]) => unknown ? Event : never;
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

export type ButtonPressEvent =
  | EventOf<NativeButtonRootProps['onPress']>
  | EventOf<WebButtonRootProps['onPress']>;

export type ButtonWebProps = DistributiveOmit<WebButtonRootProps, ButtonOwnedProps>;
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
  isPending?: boolean;
  nativeProps?: ButtonNativeProps;
  onPress?: (event: ButtonPressEvent) => void;
  size?: NonNullable<WebButtonRootProps['size']> & NonNullable<NativeButtonRootProps['size']>;
  variant?: NonNullable<WebButtonRootProps['variant']> &
    NonNullable<NativeButtonRootProps['variant']>;
  webProps?: ButtonWebProps;
}

export type ButtonRef = ComponentRef<typeof WebButton.Root>;

const ButtonRoot = forwardRef<ButtonRef, ButtonProps>(function ButtonRoot(
  {
    children,
    className,
    fullWidth,
    isDisabled = false,
    isIconOnly,
    isPending = false,
    nativeProps: _nativeProps,
    onPress,
    size,
    variant,
    webProps,
  },
  ref
) {
  const disabled = isDisabled || isPending;

  return (
    <WebButton.Root
      {...webProps}
      ref={ref}
      aria-busy={isPending || undefined}
      className={[className, 'relative'].filter(Boolean).join(' ')}
      fullWidth={fullWidth}
      isDisabled={disabled}
      isIconOnly={isIconOnly}
      isPending={isPending}
      onPress={onPress}
      size={size}
      variant={variant}>
      {children}
    </WebButton.Root>
  );
});

export interface ButtonLabelProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<
    React.ComponentProps<typeof NativeButton.Label>,
    'children' | 'className' | 'ref'
  >;
  webProps?: Omit<React.ComponentPropsWithRef<'span'>, 'children' | 'className' | 'ref'>;
}

type ButtonLabelRef = React.ComponentRef<'span'>;

const ButtonLabel = forwardRef<ButtonLabelRef, ButtonLabelProps>(function ButtonLabel(
  { children, className, nativeProps: _nativeProps, webProps },
  ref
) {
  return (
    <span
      {...webProps}
      ref={ref}
      className={['pointer-events-none', className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
});

export interface ButtonBackgroundProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<
    React.ComponentProps<typeof NativeButton.Background>,
    'children' | 'className' | 'ref'
  >;
  webProps?: Omit<React.ComponentPropsWithRef<'span'>, 'children' | 'className' | 'ref'>;
}

type ButtonBackgroundRef = React.ComponentRef<'span'>;

const ButtonBackground = forwardRef<ButtonBackgroundRef, ButtonBackgroundProps>(
  function ButtonBackground({ children, className, nativeProps: _nativeProps, webProps }, ref) {
    return (
      <span {...webProps} ref={ref} className={className}>
        {children}
      </span>
    );
  }
);

ButtonRoot.displayName = 'Button';
ButtonLabel.displayName = 'Button.Label';
ButtonBackground.displayName = 'Button.Background';

type ButtonComponent = typeof ButtonRoot & {
  Root: typeof ButtonRoot;
  Label: typeof ButtonLabel;
  Background: typeof ButtonBackground;
};

export const Button: ButtonComponent = Object.assign(ButtonRoot, {
  Root: ButtonRoot,
  Label: ButtonLabel,
  Background: ButtonBackground,
});
