/*
 * Derived from heroui-native/src/primitives/checkbox/checkbox.tsx at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { createContext, forwardRef, useContext } from 'react';
import { type GestureResponderEvent, Pressable, View } from 'react-native';

import type {
  IndicatorProps,
  IndicatorRef,
  RootProps,
  RootRef,
} from './checkbox.types.js';
import type {
  PressableRef,
  SlottablePressableProps,
} from '../../helpers/internal/types/index.js';
import * as Slot from '../slot/index.js';

interface RootContext extends RootProps {
  nativeID?: string;
}

const CheckboxContext = createContext<RootContext | null>(null);

const Root = forwardRef<RootRef, RootProps>(
  (
    {
      isDisabled = false,
      isSelected,
      onSelectedChange,
      isInvalid = false,
      nativeID,
      ...props
    },
    ref
  ) => {
    return (
      <CheckboxContext.Provider
        value={{
          isDisabled,
          isSelected,
          onSelectedChange,
          isInvalid,
          nativeID,
        }}
      >
        <Trigger ref={ref} {...props} />
      </CheckboxContext.Provider>
    );
  }
);

Root.displayName = 'HeroUINative.Primitive.Checkbox.Root';

function useCheckboxContext() {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error(
      'Checkbox compound components cannot be rendered outside the Checkbox component'
    );
  }
  return context;
}

// --------------------------------------------------

const Trigger = forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, ...props }, ref) => {
    const { isDisabled, isSelected, onSelectedChange, nativeID } =
      useCheckboxContext();

    function onPress(ev: GestureResponderEvent) {
      if (isDisabled) return;
      const newValue = !isSelected;
      onSelectedChange?.(newValue);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <Component
        ref={ref}
        nativeID={nativeID}
        aria-disabled={isDisabled}
        role="checkbox"
        aria-checked={isSelected}
        onPress={onPress}
        accessibilityState={{
          checked: isSelected,
          disabled: isDisabled,
        }}
        disabled={isDisabled}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'HeroUINative.Primitive.Checkbox.Trigger';

// --------------------------------------------------

const Indicator = forwardRef<IndicatorRef, IndicatorProps>(
  ({ asChild, ...props }, ref) => {
    const { isSelected, isDisabled } = useCheckboxContext();

    const Component = asChild ? Slot.View : View;
    return (
      <Component
        ref={ref}
        aria-disabled={isDisabled}
        aria-hidden={!isSelected}
        role="presentation"
        {...props}
      />
    );
  }
);

Indicator.displayName = 'HeroUINative.Primitive.Checkbox.Indicator';

export { Indicator, Root, useCheckboxContext };
