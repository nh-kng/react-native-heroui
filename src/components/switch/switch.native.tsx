import { forwardRef, type ComponentRef } from 'react';

import type { SwitchProps, SwitchThumbProps } from './switch.types.js';
import * as N from '../../primitives/native/components/switch/index.js';
import { useControllableValue } from '../shared/use-controllable-value.js';
export type * from './switch.types.js';

export type SwitchRootRef = ComponentRef<typeof N.Switch>;
const SwitchRoot = forwardRef<SwitchRootRef, SwitchProps>(function SwitchRoot(
  {
    children,
    className,
    isSelected,
    defaultSelected,
    onSelectedChange,
    isDisabled,
    webProps,
    nativeProps,
  },
  ref
) {
  const Target = N.Switch;
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
      isDisabled={isDisabled}>
      {children}
    </Target>
  );
});

export type SwitchThumbRef = ComponentRef<typeof N.Switch.Thumb>;
const SwitchThumb = forwardRef<SwitchThumbRef, SwitchThumbProps>(function SwitchThumb(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = N.Switch.Thumb;
  return (
    <Target {...nativeProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export const Switch = Object.assign(SwitchRoot, { Root: SwitchRoot, Thumb: SwitchThumb });
