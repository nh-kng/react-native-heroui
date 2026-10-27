import type { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';

import { resolveButtonState } from './button-state.js';
import type { ButtonBackgroundProps, ButtonLabelProps, ButtonProps } from './button.types.js';
import { Button as NativeButton } from '../../primitives/native/components/button/index.js';
export type {
  ButtonBackgroundProps,
  ButtonLabelProps,
  ButtonNativeProps,
  ButtonPressEvent,
  ButtonProps,
  ButtonWebProps,
} from './button.types.js';

export type ButtonRef = ComponentRef<typeof NativeButton>;

const ButtonRoot: ForwardRefExoticComponent<ButtonProps & RefAttributes<ButtonRef>> = forwardRef<
  ButtonRef,
  ButtonProps
>(function ButtonRoot(
  {
    children,
    className,
    fullWidth = false,
    isDisabled = false,
    isIconOnly,
    isLoading = false,
    isPending = false,
    nativeProps,
    onPress,
    size,
    variant,
    webProps: _webProps,
  },
  ref
) {
  const { isDisabled: disabled, isLoading: loading } = resolveButtonState(
    isDisabled,
    isLoading,
    isPending
  );
  const resolvedClassName =
    [className, fullWidth ? 'w-full' : undefined].filter(Boolean).join(' ') || undefined;

  return (
    <NativeButton
      {...nativeProps}
      ref={ref}
      accessibilityState={{ disabled, busy: loading }}
      className={resolvedClassName}
      isDisabled={disabled}
      isIconOnly={isIconOnly}
      onPress={onPress}
      size={size}
      variant={variant}>
      {children}
    </NativeButton>
  );
});

type ButtonLabelRef = ComponentRef<typeof NativeButton.Label>;

const ButtonLabel: ForwardRefExoticComponent<ButtonLabelProps & RefAttributes<ButtonLabelRef>> =
  forwardRef<ButtonLabelRef, ButtonLabelProps>(function ButtonLabel(
    { children, className, nativeProps, webProps: _webProps },
    ref
  ) {
    return (
      <NativeButton.Label {...nativeProps} ref={ref} className={className}>
        {children}
      </NativeButton.Label>
    );
  });

type ButtonBackgroundRef = ComponentRef<typeof NativeButton.Background>;

const ButtonBackground: ForwardRefExoticComponent<
  ButtonBackgroundProps & RefAttributes<ButtonBackgroundRef>
> = forwardRef<ButtonBackgroundRef, ButtonBackgroundProps>(function ButtonBackground(
  { children, className, nativeProps, webProps: _webProps },
  ref
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

export const Button: ButtonComponent = Object.assign(ButtonRoot, {
  Root: ButtonRoot,
  Label: ButtonLabel,
  Background: ButtonBackground,
});
