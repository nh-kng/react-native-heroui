import type { LoadingTextProps } from './loading-text.types.js';

export const loadingTextDuration = 2000;

export function resolveLoadingText(
  { text = 'Thinking', variant = 'shimmer', size = 'sm' }: LoadingTextProps = {},
  isAnimationDisabled = false
) {
  const label = text.replace(/\r\n?|\n/g, ' ');
  return {
    text: label,
    size,
    variant: isAnimationDisabled || !label ? 'none' as const : variant,
  };
}

export function loadingTextSweep(width: number, isRTL: boolean): [number, number] {
  return isRTL ? [width, -width] : [-width, width];
}
