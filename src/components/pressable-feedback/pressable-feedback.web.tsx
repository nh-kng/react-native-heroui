import { createContext, forwardRef, useContext } from 'react';
import { Button } from 'react-aria-components/Button';

import type {
  PressableFeedbackHighlightProps,
  PressableFeedbackProps,
  PressableFeedbackRippleProps,
  PressableFeedbackScaleProps,
} from './pressable-feedback.types.js';
import { mouseBoundary } from '../shared/mouse-boundary.web.js';

export type * from './pressable-feedback.types.js';
export type PressableFeedbackRef = HTMLButtonElement;

const FeedbackContext = createContext({
  isActive: false,
  isHovered: false,
  isAnimationDisabled: false,
});

const Root = forwardRef<PressableFeedbackRef, PressableFeedbackProps>(function PressableFeedback(
  {
    children,
    className,
    isDisabled = false,
    onPress,
    animation,
    nativeProps: _nativeProps,
    webProps,
  },
  ref
) {
  return (
    <Button
      {...webProps}
      {...mouseBoundary(webProps)}
      ref={ref}
      type="button"
      className={['pressable-feedback__root', 'pressable-feedback__web-root', className]
        .filter(Boolean)
        .join(' ')}
      data-slot="pressable-feedback"
      data-scale={
        (animation !== false && animation !== 'disabled' && animation !== 'disable-all') ||
        undefined
      }
      isDisabled={isDisabled}
      onPress={onPress}>
      {({ isPressed, isHovered }) => (
        <FeedbackContext
          value={{
            isActive: !isDisabled && isPressed,
            isHovered: !isDisabled && isHovered,
            isAnimationDisabled: animation === 'disable-all',
          }}>
          {children}
        </FeedbackContext>
      )}
    </Button>
  );
});

const Scale = forwardRef<HTMLSpanElement, PressableFeedbackScaleProps>(
  function PressableFeedbackScale(
    { children, className, animation, nativeProps: _nativeProps, webProps },
    ref
  ) {
    const { isActive, isAnimationDisabled } = useContext(FeedbackContext);
    return (
      <span
        {...webProps}
        ref={ref}
        className={['pressable-feedback__web-scale', className].filter(Boolean).join(' ')}
        data-active={
          (isActive && !isAnimationDisabled && animation !== false && animation !== 'disabled') ||
          undefined
        }>
        {children}
      </span>
    );
  }
);

const Highlight = forwardRef<HTMLSpanElement, PressableFeedbackHighlightProps>(
  function PressableFeedbackHighlight(
    { className, animation, nativeProps: _nativeProps, webProps },
    ref
  ) {
    const { isActive, isHovered, isAnimationDisabled } = useContext(FeedbackContext);
    return (
      <span
        {...webProps}
        ref={ref}
        aria-hidden
        className={['pressable-feedback__highlight', 'pressable-feedback__web-highlight', className]
          .filter(Boolean)
          .join(' ')}
        data-active={
          (isActive && !isAnimationDisabled && animation !== false && animation !== 'disabled') ||
          undefined
        }
        data-hovered={
          (isHovered && !isAnimationDisabled && animation !== false && animation !== 'disabled') ||
          undefined
        }
      />
    );
  }
);

const Ripple = forwardRef<HTMLSpanElement, PressableFeedbackRippleProps>(
  function PressableFeedbackRipple(
    { className, animation, nativeProps: _nativeProps, webProps },
    ref
  ) {
    const { isActive, isAnimationDisabled } = useContext(FeedbackContext);
    return (
      <span
        {...webProps}
        ref={ref}
        aria-hidden
        className={[
          'pressable-feedback__ripple-container',
          'pressable-feedback__web-ripple',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        data-active={
          (isActive && !isAnimationDisabled && animation !== false && animation !== 'disabled') ||
          undefined
        }
      />
    );
  }
);

export const PressableFeedback = Object.assign(Root, { Root, Scale, Highlight, Ripple });
