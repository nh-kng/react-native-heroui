import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import type { TextFieldProps } from './text-field.types.js';
import { TextField as WebTextField } from '../../primitives/web/components/textfield/index.js';
export type {
  TextFieldNativeProps,
  TextFieldProps,
  TextFieldWebProps,
} from './text-field.types.js';

export type TextFieldRef = ComponentRef<typeof WebTextField.Root>;

const TextFieldRoot = forwardRef<TextFieldRef, TextFieldProps>(function TextFieldRoot(
  { children, className, isDisabled, isInvalid, isRequired, nativeProps: _nativeProps, webProps },
  ref
) {
  return (
    <WebTextField.Root
      {...webProps}
      ref={ref}
      className={className}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isRequired={isRequired}>
      {children}
    </WebTextField.Root>
  );
});

TextFieldRoot.displayName = 'TextField';

type TextFieldComponent = typeof TextFieldRoot & { Root: typeof TextFieldRoot };

export const TextField: TextFieldComponent = Object.assign(TextFieldRoot, { Root: TextFieldRoot });
