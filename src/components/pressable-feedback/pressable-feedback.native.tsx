import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import type {
  PressableFeedbackHighlightProps,
  PressableFeedbackProps,
  PressableFeedbackRippleProps,
  PressableFeedbackScaleProps,
} from './pressable-feedback.types.js';
import { PressableFeedback as NativeFeedback } from '../../primitives/native/components/pressable-feedback/index.js';

export type * from './pressable-feedback.types.js';
export type PressableFeedbackRef = ComponentRef<typeof NativeFeedback>;

const Root = forwardRef<PressableFeedbackRef, PressableFeedbackProps>(function PressableFeedback(
  { children, className, isDisabled = false, onPress, animation, nativeProps, webProps: _webProps },
  ref
) {
  return (
    <NativeFeedback
      {...nativeProps}
      ref={ref}
      accessibilityRole={nativeProps?.accessibilityRole ?? 'button'}
      accessibilityState={{ disabled: isDisabled }}
      className={className}
      isDisabled={isDisabled}
      onPress={onPress}
      animation={animation}>
      {children}
    </NativeFeedback>
  );
});

const Scale = forwardRef<ComponentRef<typeof NativeFeedback.Scale>, PressableFeedbackScaleProps>(
  function PressableFeedbackScale(
    { children, className, animation, nativeProps, webProps: _webProps },
    ref
  ) {
    return (
      <NativeFeedback.Scale {...nativeProps} ref={ref} className={className} animation={animation}>
        {children}
      </NativeFeedback.Scale>
    );
  }
);

const Highlight = forwardRef<
  ComponentRef<typeof NativeFeedback.Highlight>,
  PressableFeedbackHighlightProps
>(function PressableFeedbackHighlight(
  { className, animation, nativeProps, webProps: _webProps },
  ref
) {
  return (
    <NativeFeedback.Highlight
      {...nativeProps}
      ref={ref}
      className={className}
      animation={animation}
      pointerEvents="none"
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    />
  );
});

const Ripple = forwardRef<ComponentRef<typeof NativeFeedback.Ripple>, PressableFeedbackRippleProps>(
  function PressableFeedbackRipple(
    { className, animation, nativeProps, webProps: _webProps },
    ref
  ) {
    return (
      <NativeFeedback.Ripple
        {...nativeProps}
        ref={ref}
        className={className}
        animation={animation}
        accessible={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      />
    );
  }
);

export const PressableFeedback = Object.assign(Root, { Root, Scale, Highlight, Ripple });
