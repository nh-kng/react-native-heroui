/*
 * Derived from heroui-native/src/components/radio-group/radio-group.tsx at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { forwardRef, useCallback, useMemo } from 'react';

import { useRadioGroupRootAnimation } from './radio-group.animation.js';
import { DISPLAY_NAME } from './radio-group.constants.js';
import { RadioGroupItemProvider } from './radio-group.context.js';
import { radioGroupClassNames } from './radio-group.styles.js';
import type {
  RadioGroupItemProps,
  RadioGroupItemRenderProps,
  RadioGroupProps,
} from './radio-group.types.js';
import { useIsOnSurface } from '../../helpers/external/hooks/index.js';
import {
  AnimationSettingsProvider,
  FormFieldProvider,
} from '../../helpers/internal/contexts/index.js';
import { childrenToString } from '../../helpers/internal/utils/index.js';
import * as RadioGroupPrimitives from '../../primitives/radio-group/index.js';
import Label from '../label/label.js';
import Radio from '../radio/radio.js';

const useRadioGroup = RadioGroupPrimitives.useRadioGroupContext;

// --------------------------------------------------

const RadioGroupRoot = forwardRef<
  RadioGroupPrimitives.RootRef,
  RadioGroupProps
>((props, ref) => {
  const {
    className,
    isDisabled = false,
    isInvalid = false,
    animation,
    ...restProps
  } = props;

  const rootClassName = radioGroupClassNames.root({
    className,
  });

  const { isAllAnimationsDisabled } = useRadioGroupRootAnimation({
    animation,
  });

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  const formFieldContextValue = useMemo(
    () => ({
      isDisabled,
      isInvalid,
      isRequired: false,
      hasFieldPadding: false,
    }),
    [isDisabled, isInvalid]
  );

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <FormFieldProvider value={formFieldContextValue}>
        <RadioGroupPrimitives.Root
          ref={ref}
          className={rootClassName}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          {...restProps}
        />
      </FormFieldProvider>
    </AnimationSettingsProvider>
  );
});

// --------------------------------------------------

const RadioGroupItem = forwardRef<
  RadioGroupPrimitives.ItemRef,
  RadioGroupItemProps
>((props, ref) => {
  const {
    children,
    value,
    isDisabled,
    isInvalid,
    variant,
    className,
    ...restProps
  } = props;

  const stringifiedChildren =
    typeof children === 'function'
      ? null
      : childrenToString(children as React.ReactNode);

  const {
    value: groupValue,
    onValueChange: groupOnValueChange,
    isInvalid: groupIsInvalid,
    isDisabled: groupIsDisabled,
    variant: groupVariant,
  } = useRadioGroup();

  const isSelected = groupValue === value;
  const isDisabledValue = isDisabled ?? groupIsDisabled ?? false;
  const isInvalidValue = isInvalid ?? groupIsInvalid ?? false;

  /** Selects this item in the group (radio behavior: always selects, never deselects) */
  const handleSelectedChange = useCallback(() => {
    groupOnValueChange(value);
  }, [groupOnValueChange, value]);

  const isOnSurfaceAutoDetected = useIsOnSurface();

  const finalVariant =
    variant !== undefined
      ? variant
      : groupVariant !== undefined
        ? groupVariant
        : isOnSurfaceAutoDetected
          ? 'secondary'
          : 'primary';

  const itemClassName = radioGroupClassNames.item({
    className,
  });

  const renderProps: RadioGroupItemRenderProps = {
    isSelected,
    isDisabled: isDisabledValue,
    isInvalid: isInvalidValue,
  };

  const content = stringifiedChildren ? (
    <>
      <Label>{stringifiedChildren}</Label>
      <Radio />
    </>
  ) : typeof children === 'function' ? (
    children(renderProps)
  ) : (
    children
  );

  const contextValue = useMemo(
    () => ({
      isSelected,
      isDisabled: isDisabledValue,
      isInvalid: isInvalidValue,
      variant: finalVariant,
      onSelectedChange: handleSelectedChange,
    }),
    [
      isSelected,
      isDisabledValue,
      isInvalidValue,
      finalVariant,
      handleSelectedChange,
    ]
  );

  const formFieldContextValue = useMemo(
    () => ({
      isDisabled: isDisabledValue,
      isInvalid: isInvalidValue,
      isRequired: false,
      hasFieldPadding: false,
    }),
    [isDisabledValue, isInvalidValue]
  );

  return (
    <FormFieldProvider value={formFieldContextValue}>
      <RadioGroupItemProvider value={contextValue}>
        <RadioGroupPrimitives.Item
          ref={ref}
          value={value}
          className={itemClassName}
          isDisabled={isDisabledValue}
          {...restProps}
        >
          {content}
        </RadioGroupPrimitives.Item>
      </RadioGroupItemProvider>
    </FormFieldProvider>
  );
});

RadioGroupRoot.displayName = DISPLAY_NAME.RADIO_GROUP_ROOT;
RadioGroupItem.displayName = DISPLAY_NAME.RADIO_GROUP_ITEM;

/**
 * Compound RadioGroup component with sub-components.
 *
 * @component RadioGroup - Container that manages the selection state of RadioGroupItem components.
 * Supports both horizontal and vertical orientations.
 *
 * @component RadioGroup.Item - Individual radio option within a RadioGroup. Must be used inside
 * RadioGroup. Handles selection state and renders a default `<Radio />` indicator if text children
 * are provided. Supports render function children to access state.
 *
 * Use the `Radio` component (and its sub-components `Radio.Indicator`, `Radio.IndicatorThumb`)
 * inside RadioGroup.Item for custom indicator rendering. The Radio component automatically detects
 * the RadioGroupItem context and derives selection state from it.
 *
 * Props flow from RadioGroup to RadioGroupItem to Radio via context (variant, value, isSelected).
 * RadioGroup manages the overall selection state and orientation.
 *
 * @see Full documentation: https://heroui.com/docs/native/components/radio-group
 */
const CompoundRadioGroup = Object.assign(RadioGroupRoot, {
  /** Individual radio option within a RadioGroup */
  Item: RadioGroupItem,
});

export default CompoundRadioGroup;
export { useRadioGroup };
