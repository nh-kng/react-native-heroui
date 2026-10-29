import type { SpinnerProps } from './spinner.types.js';
export function spinnerColorToNative(color: NonNullable<SpinnerProps['color']>) {
  return color === 'accent' ? 'default' : color;
}
