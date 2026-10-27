import type { ButtonRootProps as WebButtonRootProps } from '@heroui/react/button';
import { Button as NativeButton, type ButtonRootProps as NativeButtonRootProps } from 'heroui-native/button';
import type { ComponentRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef } from 'react';
type ButtonOwnedProps =
  | 'children'
  | 'className'
  | 'fullWidth'
  | 'isDisabled'
  | 'isIconOnly'
  | 'isPending'
  | 'accessibilityState'
  | 'onPress'
  | 'ref'
  | 'size'
  | 'variant';

type EventOf<T> = T extends (event: infer Event, ...args: never[]) => unknown ? Event : never;
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

export type ButtonPressEvent = EventOf<NativeButtonRootProps['onPress']> | EventOf<WebButtonRootProps['onPress']>;

export type ButtonNativeProps = DistributiveOmit<NativeButtonRootProps, ButtonOwnedProps>;
export type ButtonWebProps = DistributiveOmit<WebButtonRootProps, ButtonOwnedProps | 'fullWidth'>;

export interface ButtonProps {
  children?: ReactNode;
  className?: string;
  fullWidth?: boolean;
  isDisabled?: boolean;
  isIconOnly?: boolean;
  isPending?: boolean;
  nativeProps?: ButtonNativeProps;
  onPress?: (event: ButtonPressEvent) => void;
  size?: NonNullable<NativeButtonRootProps['size']> & NonNullable<WebButtonRootProps['size']>;
  variant?: NonNullable<NativeButtonRootProps['variant']> & NonNullable<WebButtonRootProps['variant']>;
  webProps?: ButtonWebProps;
}

export type ButtonRef = ComponentRef<typeof NativeButton>;

const ButtonRoot: ForwardRefExoticComponent<ButtonProps & RefAttributes<ButtonRef>> = forwardRef<ButtonRef, ButtonProps>(function ButtonRoot(
  {
    children,
    className,
    fullWidth = false,
    isDisabled = false,
    isIconOnly,
    isPending = false,
    nativeProps,
    onPress,
    size,
    variant,
    webProps: _webProps,
  },
  ref,
) {
  const disabled = isDisabled || isPending;
  const resolvedClassName = [className, fullWidth ? 'w-full' : undefined].filter(Boolean).join(' ') || undefined;

  return (
    <NativeButton
      {...nativeProps}
      ref={ref}
      accessibilityState={isPending ? { disabled: true, busy: true } : undefined}
      className={resolvedClassName}
      isDisabled={disabled}
      isIconOnly={isIconOnly}
      onPress={onPress}
      size={size}
      variant={variant}
    >
      {children}
    </NativeButton>
  );
});

export interface ButtonLabelProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<React.ComponentProps<typeof NativeButton.Label>, 'children' | 'className' | 'ref'>;
  webProps?: Omit<React.ComponentPropsWithRef<'span'>, 'children' | 'className' | 'ref'>;
}

type ButtonLabelRef = ComponentRef<typeof NativeButton.Label>;

const ButtonLabel: ForwardRefExoticComponent<ButtonLabelProps & RefAttributes<ButtonLabelRef>> = forwardRef<ButtonLabelRef, ButtonLabelProps>(function ButtonLabel(
  { children, className, nativeProps, webProps: _webProps },
  ref,
) {
  return (
    <NativeButton.Label {...nativeProps} ref={ref} className={className}>
      {children}
    </NativeButton.Label>
  );
});

export interface ButtonBackgroundProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<React.ComponentProps<typeof NativeButton.Background>, 'children' | 'className' | 'ref'>;
  webProps?: Omit<React.ComponentPropsWithRef<'span'>, 'children' | 'className' | 'ref'>;
}

type ButtonBackgroundRef = ComponentRef<typeof NativeButton.Background>;

const ButtonBackground: ForwardRefExoticComponent<ButtonBackgroundProps & RefAttributes<ButtonBackgroundRef>> = forwardRef<ButtonBackgroundRef, ButtonBackgroundProps>(function ButtonBackground(
  { children, className, nativeProps, webProps: _webProps },
  ref,
) {
  return (
    <NativeButton.Background {...nativeProps} ref={ref} className={className}>
      {children}
    </NativeButton.Background>
  );
});

ButtonRoot.displayName = 'Button';
ButtonLabel.displayName = 'Button.Label';
ButtonBackground.displayName = 'Button.Background';

type ButtonComponent = typeof ButtonRoot & {
  Root: typeof ButtonRoot;
  Label: typeof ButtonLabel;
  Background: typeof ButtonBackground;
};

export const Button: ButtonComponent = Object.assign(ButtonRoot, { Root: ButtonRoot, Label: ButtonLabel, Background: ButtonBackground });
