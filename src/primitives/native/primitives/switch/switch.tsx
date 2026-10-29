/*
 * Derived from heroui-native/src/primitives/switch/switch.tsx at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { forwardRef } from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';

import type { RootProps, RootRef, ThumbProps, ThumbRef } from './switch.types.js';
import * as Slot from '../slot/index.js';

// --------------------------------------------------

const Root = forwardRef<RootRef, RootProps>(
  (
    {
      asChild,
      isSelected,
      onSelectedChange,
      isDisabled,
      'onPress': onPressProp,
      'aria-valuetext': ariaValueText,
      ...props
    },
    ref
  ) => {
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
        aria-disabled={isDisabled}
        role="switch"
        aria-checked={isSelected}
        aria-valuetext={ariaValueText ?? (isSelected ? 'on' : 'off')}
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

Root.displayName = 'HeroUINative.Primitive.Switch.Root';

// --------------------------------------------------

const Thumb = forwardRef<ThumbRef, ThumbProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;

  return <Component ref={ref} role="presentation" {...props} />;
});

Thumb.displayName = 'HeroUINative.Primitive.Switch.Thumb';

export { Root, Thumb };
