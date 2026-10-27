import type { ComponentProps, ReactNode } from 'react';

import type { Chip as NativeChip } from '../../primitives/native/components/chip/index.js';
import type { Chip as WebChip } from '../../primitives/web/components/chip/index.js';

type OwnedProps = 'children' | 'className' | 'color' | 'size' | 'variant' | 'ref';
export type ChipNativeProps = Omit<ComponentProps<typeof NativeChip>, OwnedProps>;
export type ChipWebProps = Omit<ComponentProps<typeof WebChip.Root<'span'>>, OwnedProps>;
export interface ChipProps {
  children?: ReactNode;
  className?: string;
  color?: 'accent' | 'default' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'soft';
  nativeProps?: ChipNativeProps;
  webProps?: ChipWebProps;
}
export interface ChipLabelProps {
  children?: ReactNode;
  className?: string;
  nativeProps?: Omit<ComponentProps<typeof NativeChip.Label>, 'children' | 'className' | 'ref'>;
  webProps?: Omit<ComponentProps<typeof WebChip.Label<'span'>>, 'children' | 'className' | 'ref'>;
}
