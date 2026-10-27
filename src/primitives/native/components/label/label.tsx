/*
 * Derived from heroui-native/src/components/label/label.tsx at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { forwardRef, useMemo } from 'react';

import { useLabelRootAnimation } from './label.animation.js';
import { DISPLAY_NAME } from './label.constants.js';
import { labelClassNames } from './label.styles.js';
import type {
  LabelContextValue,
  LabelProps,
  LabelTextProps,
} from './label.types.js';
import { HeroText } from '../../helpers/internal/components/hero-text.js';
import { AnimationSettingsProvider } from '../../helpers/internal/contexts/animation-settings-context.js';
import { useFormField } from '../../helpers/internal/contexts/form-field-context.js';
import type { PressableRef , TextRef } from '../../helpers/internal/types/primitives.js';
import { childrenToString } from '../../helpers/internal/utils/children-to-string.js';
import { createContext } from '../../helpers/internal/utils/create-context.js';
import * as LabelPrimitives from '../../primitives/label/index.js';
import { useControlField } from '../control-field/control-field.context.js';
import { useRadioGroupItem } from '../radio-group/radio-group.context.js';

const [LabelProvider, useLabel] = createContext<LabelContextValue>({
  name: 'LabelContext',
});

// --------------------------------------------------

const Label = forwardRef<PressableRef, LabelProps>((props, ref) => {
  const {
    children,
    isDisabled: localIsDisabled,
    isRequired: localIsRequired,
    isInvalid: localIsInvalid,
    className,
    animation,
    ...restProps
  } = props;

  const formField = useFormField();
  const controlFieldContext = useControlField();
  const radioGroupItemContext = useRadioGroupItem();

  const isInsideField = formField?.hasFieldPadding ?? false;
  const isInsideControlField =
    Boolean(controlFieldContext) || Boolean(radioGroupItemContext);

  // Merge form field state with local props (local takes precedence)
  const isDisabled =
    localIsDisabled !== undefined
      ? localIsDisabled
      : (formField?.isDisabled ?? false);
  const isRequired =
    localIsRequired !== undefined
      ? localIsRequired
      : (formField?.isRequired ?? false);
  const isInvalid =
    localIsInvalid !== undefined
      ? localIsInvalid
      : (formField?.isInvalid ?? false);

  const stringifiedChildren = childrenToString(children);

  const { isAllAnimationsDisabled } = useLabelRootAnimation({
    animation,
  });

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  const contextValue = useMemo(
    () => ({
      isDisabled,
      isRequired,
      isInvalid,
    }),
    [isDisabled, isRequired, isInvalid]
  );

  const rootClassName = labelClassNames.root({
    isDisabled,
    isInsideField,
    isInsideControlField,
    className,
  });

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <LabelProvider value={contextValue}>
        <LabelPrimitives.Root
          ref={ref}
          isDisabled={isDisabled}
          className={rootClassName}
          {...restProps}
        >
          {stringifiedChildren ? (
            <LabelText>{stringifiedChildren}</LabelText>
          ) : (
            children
          )}
        </LabelPrimitives.Root>
      </LabelProvider>
    </AnimationSettingsProvider>
  );
});

// --------------------------------------------------

const LabelText = forwardRef<TextRef, LabelTextProps>((props, ref) => {
  const { children, className, classNames, styles, style, ...restProps } =
    props;

  const { isDisabled, isRequired, isInvalid } = useLabel();

  const { text, asterisk } = labelClassNames.label({
    isDisabled,
    isInvalid,
  });

  const textClassName = text({
    className: [className, classNames?.text],
  });

  const asteriskClassName = asterisk({
    className: classNames?.asterisk,
  });

  return (
    <HeroText
      ref={ref}
      className={textClassName}
      style={[style, styles?.text]}
      {...restProps}
    >
      {children}
      {isRequired && (
        <HeroText className={asteriskClassName} style={styles?.asterisk}>
          {' '}
          *
        </HeroText>
      )}
    </HeroText>
  );
});

// --------------------------------------------------

Label.displayName = DISPLAY_NAME.LABEL_ROOT;
LabelText.displayName = DISPLAY_NAME.LABEL_TEXT;

/**
 * Compound Label component with sub-components
 *
 * @component Label - Main container that displays a label. Renders with
 * string children as Label.Text or accepts compound components for custom layouts.
 *
 * @component Label.Text - Text content of the label. When string is provided,
 * it renders as Text. Otherwise renders children as-is. Shows asterisk when required.
 *
 * Props flow from Label to sub-components via context (isDisabled, isRequired, isInvalid).
 *
 * @see Full documentation: https://heroui.com/docs/native/components/label
 */
const CompoundLabel = Object.assign(Label, {
  /** Label text - renders text or custom content with optional asterisk */
  Text: LabelText,
});

export { useLabel };
export default CompoundLabel;
