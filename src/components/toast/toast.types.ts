import type { ComponentProps, ReactNode } from 'react';

import { Toast as N } from '../../primitives/native/components/toast/index.js';
import { Toast as W } from '../../primitives/web/components/toast/index.js';
export type ToastVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger';
export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}
export interface ToastManager {
  show(options: ToastOptions): string;
  dismiss(id: string): void;
  dismissAll(): void;
}
type PlatformOptions<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
type Part<N, W> = {
  children?: ReactNode;
  className?: string;
  nativeProps?: PlatformOptions<N, 'children' | 'className' | 'ref' | 'asChild'>;
  webProps?: Omit<W, 'children' | 'className' | 'ref'>;
};
export interface ToastProps {
  children?: ReactNode;
  className?: string;
  variant?: ToastVariant;
  nativeProps?: Omit<ComponentProps<typeof N>, 'children' | 'className' | 'ref' | 'variant'>;
  webProps?: Omit<ComponentProps<typeof W>, 'children' | 'className' | 'ref' | 'variant'>;
}
export type ToastTitleProps = Part<ComponentProps<typeof N.Title>, ComponentProps<typeof W.Title>>;
export type ToastDescriptionProps = Part<
  ComponentProps<typeof N.Description>,
  ComponentProps<typeof W.Description>
>;
export type ToastActionProps = Part<
  ComponentProps<typeof N.Action>,
  ComponentProps<typeof W.ActionButton>
>;
export type ToastCloseProps = Part<
  ComponentProps<typeof N.Close>,
  ComponentProps<typeof W.CloseButton>
>;
