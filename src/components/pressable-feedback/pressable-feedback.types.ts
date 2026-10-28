import type { ComponentProps, ReactNode } from 'react';
import type { ButtonProps as AriaButtonProps } from 'react-aria-components/Button';

import type {
  PressableFeedback as NativePressableFeedback,
  PressableFeedbackProps as NativeRootProps,
} from '../../primitives/native/components/pressable-feedback/index.js';
import type { ButtonPressEvent } from '../button/button.types.js';

type OwnedProps = 'children' | 'className' | 'ref' | 'animation';
type RootOwnedProps = OwnedProps | 'isDisabled' | 'onPress';

export type PressableFeedbackPressEvent = ButtonPressEvent;
export type PressableFeedbackNativeProps = Omit<
  NativeRootProps,
  RootOwnedProps | 'disabled' | 'aria-disabled' | 'accessibilityState' | 'asChild'
>;
export type PressableFeedbackWebProps = Omit<
  AriaButtonProps,
  RootOwnedProps | 'isPending' | 'aria-disabled' | 'type'
>;

export interface PressableFeedbackProps {
  children?: ReactNode;
  className?: string;
  isDisabled?: boolean;
  onPress?: (event: PressableFeedbackPressEvent) => void;
  animation?: boolean | 'disabled' | 'disable-all';
  nativeProps?: PressableFeedbackNativeProps;
  webProps?: PressableFeedbackWebProps;
}

interface FeedbackPartProps {
  children?: ReactNode;
  className?: string;
  animation?: boolean | 'disabled';
}

type WebPartProps = Omit<ComponentProps<'span'>, OwnedProps | 'aria-hidden' | 'role' | 'tabIndex'>;

export interface PressableFeedbackScaleProps extends FeedbackPartProps {
  nativeProps?: Omit<ComponentProps<typeof NativePressableFeedback.Scale>, OwnedProps>;
  webProps?: WebPartProps;
}

export interface PressableFeedbackHighlightProps extends Omit<FeedbackPartProps, 'children'> {
  nativeProps?: Omit<
    ComponentProps<typeof NativePressableFeedback.Highlight>,
    | OwnedProps
    | 'pointerEvents'
    | 'aria-hidden'
    | 'accessible'
    | 'accessibilityElementsHidden'
    | 'importantForAccessibility'
  >;
  webProps?: WebPartProps;
}

export interface PressableFeedbackRippleProps extends Omit<FeedbackPartProps, 'children'> {
  nativeProps?: Omit<
    ComponentProps<typeof NativePressableFeedback.Ripple>,
    | OwnedProps
    | 'pointerEvents'
    | 'aria-hidden'
    | 'accessible'
    | 'accessibilityElementsHidden'
    | 'importantForAccessibility'
  >;
  webProps?: WebPartProps;
}
