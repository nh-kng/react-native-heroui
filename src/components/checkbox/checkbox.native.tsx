import { forwardRef, type ComponentRef } from 'react';

import type { CheckboxProps, CheckboxIndicatorProps } from './checkbox.types.js';
import * as N from '../../primitives/native/components/checkbox/index.js';
import { useControllableValue } from '../shared/use-controllable-value.js';
export type * from './checkbox.types.js';

export type CheckboxRootRef = ComponentRef<typeof N.Checkbox>;
const CheckboxRoot = forwardRef<CheckboxRootRef, CheckboxProps>(function CheckboxRoot(
  {
    children,
    className,
    isSelected,
    defaultSelected,
    onSelectedChange,
    isDisabled,
    isInvalid,
    webProps,
    nativeProps,
  },
  ref
) {
  const Target = N.Checkbox;
  const [selected, change] = useControllableValue(
    isSelected,
    defaultSelected ?? false,
    onSelectedChange
  );
  return (
    <Target
      {...nativeProps}
      ref={ref}
      className={className}
      isSelected={selected}
      onSelectedChange={change}
      isDisabled={isDisabled}
      isInvalid={isInvalid}>
      {children}
    </Target>
  );
});

export type CheckboxIndicatorRef = ComponentRef<typeof N.Checkbox.Indicator>;
const CheckboxIndicator = forwardRef<CheckboxIndicatorRef, CheckboxIndicatorProps>(
  function CheckboxIndicator({ children, className, webProps, nativeProps }, ref) {
    const Target = N.Checkbox.Indicator;
    return (
      <Target {...nativeProps} ref={ref} className={className}>
        {children}
      </Target>
    );
  }
);

export const Checkbox = Object.assign(CheckboxRoot, {
  Root: CheckboxRoot,
  Indicator: CheckboxIndicator,
});
