import { forwardRef, type ComponentRef } from 'react';

import type { RadioGroupProps, RadioGroupItemProps } from './radio-group.types.js';
import * as R from '../../primitives/web/components/radio/index.js';
import * as W from '../../primitives/web/components/radio-group/index.js';
import { useControllableValue } from '../shared/use-controllable-value.js';
export type * from './radio-group.types.js';

export type RadioGroupRootRef = ComponentRef<typeof W.RadioGroup>;
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
  const Target = W.RadioGroup;
  const [current, change] = useControllableValue(value, defaultValue ?? '', onValueChange);
  return (
    <Target
      {...webProps}
      ref={ref}
      className={className}
      value={current}
      onChange={change}
      isDisabled={isDisabled}
      isInvalid={isInvalid}>
      {children}
    </Target>
  );
});

export type RadioGroupItemRef = ComponentRef<typeof R.Radio>;
const RadioGroupItem = forwardRef<RadioGroupItemRef, RadioGroupItemProps>(function RadioGroupItem(
  { children, className, value, isDisabled, webProps, nativeProps },
  ref
) {
  const Target = R.Radio;
  return (
    <Target {...webProps} ref={ref} className={className} value={value} isDisabled={isDisabled}>
      <R.Radio.Content>
        <R.Radio.Control>
          <R.Radio.Indicator />
        </R.Radio.Control>
        {children}
      </R.Radio.Content>
    </Target>
  );
});

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
});
