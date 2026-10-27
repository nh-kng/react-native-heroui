/*
 * Derived from heroui-native/src/components/field-error/field-error.tsx at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { forwardRef } from 'react';
import Animated from 'react-native-reanimated';

import { useFieldErrorRootAnimation } from './field-error.animation.js';
import { DISPLAY_NAME } from './field-error.constants.js';
import { fieldErrorClassNames } from './field-error.styles.js';
import type { FieldErrorRootProps } from './field-error.types.js';
import { HeroText } from '../../helpers/internal/components/hero-text.js';
import { useFormField } from '../../helpers/internal/contexts/form-field-context.js';
import type { ViewRef } from '../../helpers/internal/types/primitives.js';
import { childrenToString } from '../../helpers/internal/utils/children-to-string.js';

// --------------------------------------------------

const FieldErrorRoot = forwardRef<ViewRef, FieldErrorRootProps>(
  (props, ref) => {
    const {
      children,
      className,
      classNames,
      style,
      styles,
      textProps,
      isInvalid: localIsInvalid,
      animation,
      ...restProps
    } = props;

    const formField = useFormField();

    // Merge form field state with local props (local takes precedence)
    const isInvalid =
      localIsInvalid !== undefined
        ? localIsInvalid
        : (formField?.isInvalid ?? false);

    const isInsideField = formField?.hasFieldPadding ?? false;

    const { container, text } = fieldErrorClassNames.root({
      isInsideField,
    });

    const containerClassName = container({
      className: [className, classNames?.container],
    });

    const textClassName = text({
      className: [classNames?.text, textProps?.className],
    });

    const { entering, exiting } = useFieldErrorRootAnimation({ animation });

    if (!isInvalid) return null;

    const stringifiedChildren = childrenToString(children);
    const renderedChildren = stringifiedChildren ? (
      <HeroText className={textClassName} style={styles?.text} {...textProps}>
        {stringifiedChildren}
      </HeroText>
    ) : (
      children
    );

    return (
      <Animated.View
        ref={ref}
        entering={entering}
        exiting={exiting}
        className={containerClassName}
        style={[style, styles?.container]}
        {...restProps}
      >
        {renderedChildren}
      </Animated.View>
    );
  }
);

// --------------------------------------------------

FieldErrorRoot.displayName = DISPLAY_NAME.ROOT;

/**
 * FieldError component for displaying validation errors
 *
 * @component FieldError - Error message container with entering/exiting animations.
 * Automatically wraps string children with Text component.
 * Hidden when isInvalid is false.
 */
const FieldError = FieldErrorRoot;

export default FieldError;
