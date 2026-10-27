/*
 * Derived from heroui-native/src/components/description/description.tsx at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { forwardRef } from 'react';
import Animated from 'react-native-reanimated';

import { useDescriptionAnimation } from './description.animation.js';
import { DISPLAY_NAME } from './description.constants.js';
import { descriptionClassNames } from './description.styles.js';
import type { DescriptionProps } from './description.types.js';
import { HeroText } from '../../helpers/internal/components/hero-text.js';
import { useFormField } from '../../helpers/internal/contexts/form-field-context.js';
import type { TextRef } from '../../helpers/internal/types/primitives.js';

const AnimatedText = Animated.createAnimatedComponent(HeroText);

// --------------------------------------------------

const Description = forwardRef<TextRef, DescriptionProps>((props, ref) => {
  const {
    children,
    className,
    nativeID,
    isInvalid: localIsInvalid,
    isDisabled: localIsDisabled,
    hideOnInvalid = false,
    animation,
    ...restProps
  } = props;

  const formField = useFormField();

  const isInvalid =
    localIsInvalid !== undefined
      ? localIsInvalid
      : (formField?.isInvalid ?? false);

  const isDisabled =
    localIsDisabled !== undefined
      ? localIsDisabled
      : (formField?.isDisabled ?? false);

  const isInsideField = formField?.hasFieldPadding ?? false;

  const rootClassName = descriptionClassNames.root({
    isInvalid,
    isDisabled,
    isInsideField,
    className,
  });

  const { entering, exiting } = useDescriptionAnimation({
    animation,
    hideOnInvalid,
  });

  if (isInvalid && hideOnInvalid) return null;

  return (
    <AnimatedText
      ref={ref}
      entering={entering}
      exiting={exiting}
      className={rootClassName}
      nativeID={nativeID}
      {...restProps}
    >
      {children}
    </AnimatedText>
  );
});

// --------------------------------------------------

Description.displayName = DISPLAY_NAME.DESCRIPTION;

/**
 * Description component for form fields and other UI elements.
 *
 * Provides accessible description text with proper styling. Can be linked to
 * form fields via the nativeID prop for accessibility support.
 *
 * @see Full documentation: https://heroui.com/docs/native/components/description
 */
export default Description;
