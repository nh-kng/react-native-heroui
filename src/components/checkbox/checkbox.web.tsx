import { forwardRef, type ComponentRef } from 'react';

import type { CheckboxProps, CheckboxIndicatorProps } from './checkbox.types.js';
import * as W from '../../primitives/web/components/checkbox/index.js';
import { useControllableValue } from '../shared/use-controllable-value.js';
export type * from './checkbox.types.js';

export type CheckboxRootRef = ComponentRef<typeof W.Checkbox>;
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
  const Target = W.Checkbox;
  const [selected, change] = useControllableValue(
    isSelected,
    defaultSelected ?? false,
    onSelectedChange
  );
  return (
    <Target
      {...webProps}
      ref={ref}
      className={className}
      isSelected={selected}
      onChange={change}
      isDisabled={isDisabled}
      isInvalid={isInvalid}>
      <W.Checkbox.Content>{children}</W.Checkbox.Content>
    </Target>
  );
});

export type CheckboxIndicatorRef = ComponentRef<typeof W.Checkbox.Indicator<'svg'>>;
const CheckboxIndicator = forwardRef<CheckboxIndicatorRef, CheckboxIndicatorProps>(
  function CheckboxIndicator({ children, className, webProps, nativeProps }, ref) {
    const Target = W.Checkbox.Indicator<'svg'>;
    return (
      <W.Checkbox.Control>
        <Target {...webProps} ref={ref} className={className}>
          {children}
        </Target>
      </W.Checkbox.Control>
    );
  }
);

export const Checkbox = Object.assign(CheckboxRoot, {
  Root: CheckboxRoot,
  Indicator: CheckboxIndicator,
});
