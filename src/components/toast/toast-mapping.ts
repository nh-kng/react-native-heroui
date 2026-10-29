import type { ToastOptions } from './toast.types.js';
export function nativeToastOptions({
  title,
  description,
  variant = 'default',
  duration = 4000,
}: ToastOptions) {
  return {
    label: title,
    description,
    variant,
    duration: duration === 0 ? ('persistent' as const) : duration,
  };
}
export function webToastOptions({
  title,
  description,
  variant = 'default',
  duration = 4000,
}: ToastOptions) {
  return { content: { title, description, variant }, options: { timeout: duration } };
}
