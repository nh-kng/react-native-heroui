import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

import type { ChipLabelProps, ChipProps } from './chip.types.js';
import { Chip as WebChip } from '../../primitives/web/components/chip/index.js';
export type { ChipLabelProps, ChipNativeProps, ChipProps, ChipWebProps } from './chip.types.js';
export type ChipRef = ComponentRef<typeof WebChip.Root<'span'>>;

const ChipRoot = forwardRef<ChipRef, ChipProps>(function ChipRoot(
  {
    children,
    className,
    color = 'accent',
    size = 'md',
    variant = 'primary',
    webProps,
    nativeProps: _nativeProps,
  },
  ref
) {
  return (
    <WebChip.Root<'span'>
      {...webProps}
      ref={ref}
      className={className}
      color={color}
      size={size}
      variant={variant}>
      {children}
    </WebChip.Root>
  );
});
const ChipLabel = forwardRef<ComponentRef<typeof WebChip.Label<'span'>>, ChipLabelProps>(
  function ChipLabel({ children, className, webProps, nativeProps: _nativeProps }, ref) {
    return (
      <WebChip.Label<'span'> {...webProps} ref={ref} className={className}>
        {children}
      </WebChip.Label>
    );
  }
);
export const Chip = Object.assign(ChipRoot, { Root: ChipRoot, Label: ChipLabel });
