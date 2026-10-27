/*
 * Derived from heroui-native/src/components/text-field/text-field.tsx at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { forwardRef, useMemo } from 'react';
import { View } from 'react-native';

import { useTextFieldRootAnimation } from './text-field.animation.js';
import { DISPLAY_NAME } from './text-field.constants.js';
import { textFieldClassNames } from './text-field.styles.js';
import type {
  TextFieldContextValue,
  TextFieldRootProps,
} from './text-field.types.js';
import { AnimationSettingsProvider } from '../../helpers/internal/contexts/animation-settings-context.js';
import { FormFieldProvider } from '../../helpers/internal/contexts/form-field-context.js';
import type { ViewRef } from '../../helpers/internal/types/primitives.js';
import { createContext } from '../../helpers/internal/utils/create-context.js';

const [TextFieldProvider, useTextField] = createContext<TextFieldContextValue>({
  name: 'TextFieldContext',
  strict: false,
});

// --------------------------------------------------

const TextFieldRoot = forwardRef<ViewRef, TextFieldRootProps>((props, ref) => {
  const {
    children,
    className,
    isDisabled = false,
    isInvalid = false,
    isRequired = false,
    animation,
    ...restProps
  } = props;

  const rootClassName = textFieldClassNames.root({ className });

  const { isAllAnimationsDisabled } = useTextFieldRootAnimation({ animation });

  const contextValue = useMemo(
    () => ({ isDisabled, isInvalid, isRequired }),
    [isDisabled, isInvalid, isRequired]
  );

  const formFieldContextValue = useMemo(
    () => ({ isDisabled, isInvalid, isRequired, hasFieldPadding: false }),
    [isDisabled, isInvalid, isRequired]
  );

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <FormFieldProvider value={formFieldContextValue}>
        <TextFieldProvider value={contextValue}>
          <View ref={ref} className={rootClassName} {...restProps}>
            {children}
          </View>
        </TextFieldProvider>
      </FormFieldProvider>
    </AnimationSettingsProvider>
  );
});

// --------------------------------------------------

TextFieldRoot.displayName = DISPLAY_NAME.ROOT;

/**
 * TextField component - Main container that provides gap-1 spacing between children.
 * Handles disabled state and validation state for the entire field.
 *
 * @see Full documentation: https://heroui.com/docs/native/components/text-field
 */
const TextField = TextFieldRoot;

export default TextField;
export { useTextField };
