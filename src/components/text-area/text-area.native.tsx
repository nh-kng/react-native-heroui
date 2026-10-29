import { forwardRef, type ComponentRef } from 'react';

import type { TextAreaProps } from './text-area.types.js';
import * as N from '../../primitives/native/components/text-area/index.js';
export type * from './text-area.types.js';

export type TextAreaRootRef = ComponentRef<typeof N.TextArea>;
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
  const Target = N.TextArea;
  return (
    <Target
      {...nativeProps}
      ref={ref}
      className={className}
      value={value}
      defaultValue={defaultValue}
      onChangeText={onChangeText}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
    />
  );
});

export const TextArea = Object.assign(TextAreaRoot, { Root: TextAreaRoot });
