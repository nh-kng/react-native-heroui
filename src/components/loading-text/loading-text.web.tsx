import { forwardRef } from 'react';

import { resolveLoadingText } from './loading-text-state.js';
import type { LoadingTextProps } from './loading-text.types.js';

export type * from './loading-text.types.js';
export type LoadingTextRef = HTMLSpanElement;

const Root = forwardRef<LoadingTextRef, LoadingTextProps>(function LoadingText(
  { text, variant, size, className, nativeProps: _nativeProps, webProps },
  ref
) {
  const state = resolveLoadingText({ text, variant, size });

  return (
    <span
      role="status"
      aria-live="polite"
      aria-atomic="true"
      {...webProps}
      ref={ref}
      className={['loading-text', `loading-text--${state.size}`, className].filter(Boolean).join(' ')}
      data-slot="loading-text"
      data-variant={state.variant}>
      {state.text}
    </span>
  );
});

export const LoadingText = Object.assign(Root, { Root });
