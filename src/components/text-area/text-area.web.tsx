import { forwardRef, type ComponentRef } from 'react';

import type { TextAreaProps } from './text-area.types.js';
import * as W from '../../primitives/web/components/textarea/index.js';
import { useWebTextInput } from '../shared/use-web-text-input.js';
export type * from './text-area.types.js';

export type TextAreaRootRef = ComponentRef<typeof W.TextArea>;
const TextAreaRoot = forwardRef<TextAreaRootRef, TextAreaProps>(function TextAreaRoot(
  {
    className,
    value,
    defaultValue,
    onChangeText,
    placeholder,
    isDisabled,
    isInvalid,
    webProps,
    nativeProps,
  },
  ref
) {
  const Target = W.TextArea;
  const valueProps = useWebTextInput<HTMLTextAreaElement>(value, defaultValue, onChangeText);
  return (
    <Target
      {...webProps}
      ref={ref}
      className={className}
      {...valueProps}
      placeholder={placeholder}
      disabled={isDisabled}
      aria-invalid={isInvalid}
    />
  );
});

export const TextArea = Object.assign(TextAreaRoot, { Root: TextAreaRoot });
