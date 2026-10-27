import { TextField as WebTextField, type TextFieldRootProps as WebTextFieldRootProps } from '@heroui/react/textfield';
import type { TextFieldRootProps as NativeTextFieldRootProps } from 'heroui-native/text-field';
import type { ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';

type OwnedProps = 'children' | 'className' | 'isDisabled' | 'isInvalid' | 'isRequired' | 'ref';

export type TextFieldWebProps = Omit<WebTextFieldRootProps, OwnedProps>;
export type TextFieldNativeProps = Omit<NativeTextFieldRootProps, OwnedProps>;

export interface TextFieldProps {
  children?: ReactNode;
  className?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  nativeProps?: TextFieldNativeProps;
  webProps?: TextFieldWebProps;
}

export type TextFieldRef = ComponentRef<typeof WebTextField.Root>;

const TextFieldRoot = forwardRef<TextFieldRef, TextFieldProps>(function TextFieldRoot(
  { children, className, isDisabled, isInvalid, isRequired, nativeProps: _nativeProps, webProps },
  ref,
) {
  return (
    <WebTextField.Root
      {...webProps}
      ref={ref}
      className={className}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isRequired={isRequired}
    >
      {children}
    </WebTextField.Root>
  );
});

TextFieldRoot.displayName = 'TextField';

type TextFieldComponent = typeof TextFieldRoot & { Root: typeof TextFieldRoot };

export const TextField: TextFieldComponent = Object.assign(TextFieldRoot, { Root: TextFieldRoot });
