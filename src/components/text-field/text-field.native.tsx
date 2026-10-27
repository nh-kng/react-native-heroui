import type { TextFieldRootProps as WebTextFieldRootProps } from '@heroui/react/textfield';
import { TextField as NativeTextField, type TextFieldRootProps as NativeTextFieldRootProps } from 'heroui-native/text-field';
import type { ComponentRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef } from 'react';

type OwnedProps = 'children' | 'className' | 'isDisabled' | 'isInvalid' | 'isRequired' | 'ref';

export type TextFieldNativeProps = Omit<NativeTextFieldRootProps, OwnedProps>;
export type TextFieldWebProps = Omit<WebTextFieldRootProps, OwnedProps>;

export interface TextFieldProps {
  children?: ReactNode;
  className?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  nativeProps?: TextFieldNativeProps;
  webProps?: TextFieldWebProps;
}

export type TextFieldRef = ComponentRef<typeof NativeTextField>;

const TextFieldRoot: ForwardRefExoticComponent<TextFieldProps & RefAttributes<TextFieldRef>> = forwardRef<TextFieldRef, TextFieldProps>(function TextFieldRoot(
  { children, className, isDisabled, isInvalid, isRequired, nativeProps, webProps: _webProps },
  ref,
) {
  return (
    <NativeTextField
      {...nativeProps}
      ref={ref}
      className={className}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isRequired={isRequired}
    >
      {children}
    </NativeTextField>
  );
});

TextFieldRoot.displayName = 'TextField';

type TextFieldComponent = typeof TextFieldRoot & { Root: typeof TextFieldRoot };

export const TextField: TextFieldComponent = Object.assign(TextFieldRoot, { Root: TextFieldRoot });
