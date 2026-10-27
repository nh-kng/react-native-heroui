import type { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';

import type { TextFieldProps } from './text-field.types.js';
import { TextField as NativeTextField } from '../../primitives/native/components/text-field/index.js';
export type {
  TextFieldNativeProps,
  TextFieldProps,
  TextFieldWebProps,
} from './text-field.types.js';

export type TextFieldRef = ComponentRef<typeof NativeTextField>;

const TextFieldRoot: ForwardRefExoticComponent<TextFieldProps & RefAttributes<TextFieldRef>> =
  forwardRef<TextFieldRef, TextFieldProps>(function TextFieldRoot(
    { children, className, isDisabled, isInvalid, isRequired, nativeProps, webProps: _webProps },
    ref
  ) {
    return (
      <NativeTextField
        {...nativeProps}
        ref={ref}
        className={className}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isRequired={isRequired}>
        {children}
      </NativeTextField>
    );
  });

TextFieldRoot.displayName = 'TextField';

type TextFieldComponent = typeof TextFieldRoot & { Root: typeof TextFieldRoot };

export const TextField: TextFieldComponent = Object.assign(TextFieldRoot, { Root: TextFieldRoot });
