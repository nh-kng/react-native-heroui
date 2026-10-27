import type { ComponentRef } from 'react';
import { createContext, forwardRef, useContext } from 'react';

import { resolveButtonState } from './button-state.js';
import { buttonClassNames } from './button.styles.js';
import type { ButtonBackgroundProps, ButtonLabelProps, ButtonProps } from './button.types.js';
import { Button as WebButton } from '../../primitives/web/components/button/index.js';
export type {
  ButtonBackgroundProps,
  ButtonLabelProps,
  ButtonNativeProps,
  ButtonPressEvent,
  ButtonProps,
  ButtonWebProps,
} from './button.types.js';

const ButtonSizeContext = createContext<NonNullable<ButtonProps['size']>>('md');

export type ButtonRef = ComponentRef<typeof WebButton.Root>;

const ButtonRoot = forwardRef<ButtonRef, ButtonProps>(function ButtonRoot(
  {
    children,
    className,
    fullWidth,
    isDisabled = false,
    isIconOnly,
    isLoading = false,
    isPending = false,
    nativeProps: _nativeProps,
    onPress,
    size,
    variant,
    webProps,
  },
  ref
) {
  const { isDisabled: disabled, isLoading: loading } = resolveButtonState(
    isDisabled,
    isLoading,
    isPending
  );

  return (
    <ButtonSizeContext value={size ?? 'md'}>
      <WebButton.Root
        {...webProps}
        ref={ref}
        aria-busy={loading || undefined}
        className={[className, 'relative'].filter(Boolean).join(' ')}
        fullWidth={fullWidth}
        isDisabled={disabled}
        isIconOnly={isIconOnly}
        isPending={loading}
        onPress={onPress}
        size={size}
        variant={variant}>
        {children}
      </WebButton.Root>
    </ButtonSizeContext>
  );
});

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

type ButtonBackgroundRef = React.ComponentRef<'span'>;

const ButtonBackground = forwardRef<ButtonBackgroundRef, ButtonBackgroundProps>(
  function ButtonBackground({ children, className, nativeProps: _nativeProps, webProps }, ref) {
    const size = useContext(ButtonSizeContext);
    return (
      <span
        {...webProps}
        ref={ref}
        aria-hidden
        className={buttonClassNames.background({ size, className })}>
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
