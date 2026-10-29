import { mergeRefs } from '@react-aria/utils';
import { createContext, forwardRef, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from 'react-aria-components/Button';

import {
  animateRipple,
  createRippleController,
  rippleExpansionDuration,
  rippleDuration,
  ripplePressHandlers,
  type RippleEvent,
} from './pressable-feedback-ripple.web.js';
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
  isDisabled: false,
  listeners: new Set<(event: RippleEvent) => void>(),
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
  const [listeners] = useState(() => new Set<(event: RippleEvent) => void>());
  const [pressHandlers] = useState(() =>
    ripplePressHandlers((event) => listeners.forEach((listener) => listener(event)))
  );
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
      onPressStart={(event) => {
        pressHandlers.onPressStart(event);
        webProps?.onPressStart?.(event);
      }}
      onPressUp={(event) => {
        pressHandlers.onPressUp();
        webProps?.onPressUp?.(event);
      }}
      onPressEnd={(event) => {
        pressHandlers.onPressEnd();
        webProps?.onPressEnd?.(event);
      }}
      onPress={onPress}>
      {({ isPressed, isHovered }) => (
        <FeedbackContext
          value={{
            isActive: !isDisabled && isPressed,
            isHovered: !isDisabled && isHovered,
            isAnimationDisabled: animation === 'disable-all',
            isDisabled,
            listeners,
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
    const { isActive, isHovered, isDisabled, isAnimationDisabled } = useContext(FeedbackContext);
    const disabled =
      isDisabled || isAnimationDisabled || animation === false || animation === 'disabled';
    return (
      <span
        {...webProps}
        ref={ref}
        aria-hidden
        className={['pressable-feedback__highlight', 'pressable-feedback__web-highlight', className]
          .filter(Boolean)
          .join(' ')}
        data-active={(isActive && !disabled) || undefined}
        data-hovered={(isHovered && !disabled) || undefined}
        data-feedback-disabled={disabled || undefined}
      />
    );
  }
);

const Ripple = forwardRef<HTMLSpanElement, PressableFeedbackRippleProps>(
  function PressableFeedbackRipple(
    { className, animation, nativeProps: _nativeProps, webProps },
    ref
  ) {
    const { isHovered, isDisabled, isAnimationDisabled, listeners } = useContext(FeedbackContext);
    const element = useRef<HTMLSpanElement>(null);
    const mergedRef = useMemo(() => mergeRefs(ref, element), [ref]);
    const disabled =
      isDisabled || isAnimationDisabled || animation === false || animation === 'disabled';

    useEffect(() => {
      const container = element.current;
      if (disabled || !container) return;
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      const controller = createRippleController((geometry, onFinish) => {
        const surface = document.createElement('span');
        surface.className = 'pressable-feedback__web-ripple-surface';
        Object.assign(surface.style, {
          left: `${geometry.x - geometry.radius}px`,
          top: `${geometry.y - geometry.radius}px`,
          width: `${geometry.radius * 2}px`,
          height: `${geometry.radius * 2}px`,
        });
        container.append(surface);
        const style = getComputedStyle(surface);
        const duration = (name: string, fallback: number) =>
          rippleDuration(style.getPropertyValue(`--pressable-feedback-ripple-${name}`), fallback);
        const easing = style.getPropertyValue('--pressable-feedback-ripple-easing').trim();
        return animateRipple(
          surface,
          {
            expansionDuration: duration(
              'duration',
              rippleExpansionDuration(
                geometry.radius,
                duration('base-duration', 350),
                duration('min-duration', 250),
                duration('max-duration', 550)
              )
            ),
            enterDuration: duration('enter-duration', 90),
            minimumPressDuration: duration('minimum-press-duration', 120),
            releaseDuration: duration('release-duration', 220),
            cancelDuration: duration('cancel-duration', 100),
            easing: CSS.supports('animation-timing-function', easing)
              ? easing
              : 'cubic-bezier(0.2, 0, 0, 1)',
          },
          motion.matches,
          onFinish
        );
      });
      const reset = () => controller.dispose();
      motion.addEventListener('change', reset);
      const listener = (event: RippleEvent) => {
        if (event.type === 'start') controller.start(event.geometry);
        else if (event.type === 'release') controller.release();
        else controller.cancel();
      };
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
        motion.removeEventListener('change', reset);
        controller.dispose();
      };
    }, [disabled, listeners]);

    return (
      <span
        {...webProps}
        ref={mergedRef}
        aria-hidden
        className={[
          'pressable-feedback__ripple-container',
          'pressable-feedback__web-ripple',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        data-hovered={(isHovered && !disabled) || undefined}
        data-feedback-disabled={disabled || undefined}
      />
    );
  }
);

export const PressableFeedback = Object.assign(Root, { Root, Scale, Highlight, Ripple });
