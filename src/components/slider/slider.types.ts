import type { ComponentProps, ReactNode } from 'react';

import * as N from '../../primitives/native/components/slider/index.js';
import * as W from '../../primitives/web/components/slider/index.js';
type PlatformOptions<T, K extends PropertyKey> = T extends unknown
  ? Omit<
      T,
      | K
      | 'render'
      | 'aria-disabled'
      | 'aria-checked'
      | 'aria-selected'
      | 'aria-invalid'
      | 'accessibilityState'
    >
  : never;

export interface SliderProps {
  children?: ReactNode;
  className?: string;
  value?: number | number[];
  defaultValue?: number | number[];
  onChange?: (value: number | number[]) => void;
  onChangeEnd?: (value: number | number[]) => void;
  minValue?: number;
  maxValue?: number;
  step?: number;
  orientation?: 'horizontal' | 'vertical';
  isDisabled?: boolean;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Slider>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'onChangeEnd'
    | 'minValue'
    | 'maxValue'
    | 'step'
    | 'orientation'
    | 'isDisabled'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Slider>,
    | 'children'
    | 'className'
    | 'ref'
    | 'asChild'
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'onChangeEnd'
    | 'minValue'
    | 'maxValue'
    | 'step'
    | 'orientation'
    | 'isDisabled'
  >;
}

export interface SliderOutputProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Slider.Output>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Slider.Output>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}

export interface SliderTrackProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Slider.Track>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Slider.Track>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}

export interface SliderFillProps {
  children?: ReactNode;
  className?: string;

  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Slider.Fill>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Slider.Fill<'div'>>,
    'children' | 'className' | 'ref' | 'asChild'
  >;
}

export interface SliderThumbProps {
  children?: ReactNode;
  className?: string;
  index?: number;
  nativeProps?: PlatformOptions<
    ComponentProps<typeof N.Slider.Thumb>,
    'children' | 'className' | 'ref' | 'asChild' | 'index'
  >;
  webProps?: PlatformOptions<
    ComponentProps<typeof W.Slider.Thumb>,
    'children' | 'className' | 'ref' | 'asChild' | 'index'
  >;
}
