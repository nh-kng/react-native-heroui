import { forwardRef, type ComponentRef } from 'react';

import type { SwitchProps, SwitchThumbProps } from './switch.types.js';
import * as W from '../../primitives/web/components/switch/index.js';
import { useControllableValue } from '../shared/use-controllable-value.js';
export type * from './switch.types.js';

export type SwitchRootRef = ComponentRef<typeof W.Switch>;
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
  const Target = W.Switch;
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
      isDisabled={isDisabled}>
      <W.Switch.Content>{children}</W.Switch.Content>
    </Target>
  );
});

export type SwitchThumbRef = ComponentRef<typeof W.Switch.Thumb<'span'>>;
const SwitchThumb = forwardRef<SwitchThumbRef, SwitchThumbProps>(function SwitchThumb(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = W.Switch.Thumb<'span'>;
  return (
    <W.Switch.Control>
      <Target {...webProps} ref={ref} className={className}>
        {children}
      </Target>
    </W.Switch.Control>
  );
});

export const Switch = Object.assign(SwitchRoot, { Root: SwitchRoot, Thumb: SwitchThumb });
