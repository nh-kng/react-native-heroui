import { forwardRef, type ComponentRef } from 'react';

import type { RadioGroupProps, RadioGroupItemProps } from './radio-group.types.js';
import * as N from '../../primitives/native/components/radio-group/index.js';
import { useControllableValue } from '../shared/use-controllable-value.js';
export type * from './radio-group.types.js';

export type RadioGroupRootRef = ComponentRef<typeof N.RadioGroup>;
const RadioGroupRoot = forwardRef<RadioGroupRootRef, RadioGroupProps>(function RadioGroupRoot(
  {
    children,
    className,
    value,
    defaultValue,
    onValueChange,
    isDisabled,
    isInvalid,
    webProps,
    nativeProps,
  },
  ref
) {
  const Target = N.RadioGroup;
  const [current, change] = useControllableValue(value, defaultValue ?? '', onValueChange);
  return (
    <Target
      {...nativeProps}
      ref={ref}
      className={className}
      value={current}
      onValueChange={change}
      isDisabled={isDisabled}
      isInvalid={isInvalid}>
      {children}
    </Target>
  );
});

export type RadioGroupItemRef = ComponentRef<typeof N.RadioGroup.Item>;
const RadioGroupItem = forwardRef<RadioGroupItemRef, RadioGroupItemProps>(function RadioGroupItem(
  { children, className, value, isDisabled, webProps, nativeProps },
  ref
) {
  const Target = N.RadioGroup.Item;
  return (
    <Target {...nativeProps} ref={ref} className={className} value={value} isDisabled={isDisabled}>
      {children}
    </Target>
  );
});

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
});
