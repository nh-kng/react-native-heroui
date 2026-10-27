import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import type { ChipLabelProps, ChipProps } from './chip.types.js';
import { Chip as NativeChip } from '../../primitives/native/components/chip/index.js';
export type { ChipLabelProps, ChipNativeProps, ChipProps, ChipWebProps } from './chip.types.js';
export type ChipRef = ComponentRef<typeof NativeChip>;

const ChipRoot = forwardRef<ChipRef, ChipProps>(function ChipRoot(
  {
    children,
    className,
    color = 'accent',
    size = 'md',
    variant = 'primary',
    nativeProps,
    webProps: _webProps,
  },
  ref
) {
  return (
    <NativeChip
      {...nativeProps}
      ref={ref}
      className={className}
      color={color}
      size={size}
      variant={variant}>
      {children}
    </NativeChip>
  );
});
const ChipLabel = forwardRef<ComponentRef<typeof NativeChip.Label>, ChipLabelProps>(
  function ChipLabel({ children, className, nativeProps, webProps: _webProps }, ref) {
    return (
      <NativeChip.Label {...nativeProps} ref={ref} className={className}>
        {children}
      </NativeChip.Label>
    );
  }
);
export const Chip = Object.assign(ChipRoot, { Root: ChipRoot, Label: ChipLabel });
