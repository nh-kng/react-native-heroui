/*
 * Derived from heroui-react/packages/react/src/components/toast/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {ToastQueue, toast, toastQueue} from "./toast-queue.js";
import {
  ToastActionButton,
  ToastCloseButton,
  ToastContent,
  ToastDescription,
  ToastIndicator,
  ToastProvider,
  Toast as ToastRoot,
  ToastTitle,
} from "./toast.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Toast = Object.assign(ToastRoot, {
  Provider: ToastProvider,
  Content: ToastContent,
  Indicator: ToastIndicator,
  Title: ToastTitle,
  Description: ToastDescription,
  ActionButton: ToastActionButton,
  CloseButton: ToastCloseButton,
  Queue: ToastQueue,
  toast,
});

export type Toast = {
  Props: ComponentProps<typeof ToastRoot>;
  ProviderProps: ComponentProps<typeof ToastProvider>;
  ContentProps: ComponentProps<typeof ToastContent>;
  IndicatorProps: ComponentProps<typeof ToastIndicator>;
  TitleProps: ComponentProps<typeof ToastTitle>;
  DescriptionProps: ComponentProps<typeof ToastDescription>;
  ActionProps: ComponentProps<typeof ToastActionButton>;
  CloseButtonProps: ComponentProps<typeof ToastCloseButton>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  ToastProvider,
  ToastContent,
  ToastIndicator,
  ToastTitle,
  ToastDescription,
  ToastActionButton,
  ToastCloseButton,
};

export type {
  ToastCloseButtonProps,
  ToastProviderProps,
  ToastContentProps,
  ToastDescriptionProps,
  ToastIndicatorProps,
  ToastProps,
  ToastTitleProps,
} from "./toast.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {toastVariants} from "../../../../styles/web/index.js";

export type {ToastVariants} from "../../../../styles/web/index.js";

/* -------------------------------------------------------------------------------------------------
 * Utilities
 * -----------------------------------------------------------------------------------------------*/
export {ToastQueue, toast, toastQueue};

/* -------------------------------------------------------------------------------------------------
 * Constants
 * -----------------------------------------------------------------------------------------------*/
export {
  DEFAULT_EXIT_DURATION,
  DEFAULT_GAP,
  DEFAULT_HOTKEY,
  DEFAULT_MAX_VISIBLE_TOAST,
  DEFAULT_TOAST_TIMEOUT,
} from "./constants.js";

export type {
  HeroUIToastOptions,
  ToastContentValue,
  ToastPromiseOptions,
  ToastQueueOptions,
} from "./toast-queue.js";
