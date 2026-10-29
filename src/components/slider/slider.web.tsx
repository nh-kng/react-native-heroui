import { forwardRef, type ComponentRef } from 'react';

import type {
  SliderProps,
  SliderOutputProps,
  SliderTrackProps,
  SliderFillProps,
  SliderThumbProps,
} from './slider.types.js';
import * as W from '../../primitives/web/components/slider/index.js';
export type * from './slider.types.js';

export type SliderRootRef = ComponentRef<typeof W.Slider>;
const SliderRoot = forwardRef<SliderRootRef, SliderProps>(function SliderRoot(
  {
    children,
    className,
    value,
    defaultValue,
    onChange,
    onChangeEnd,
    minValue = 0,
    maxValue = 100,
    step = 1,
    orientation = 'horizontal',
    isDisabled,
    webProps,
    nativeProps,
  },
  ref
) {
  const Target = W.Slider;
  return (
    <Target
      {...webProps}
      ref={ref}
      className={className}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onChangeEnd={onChangeEnd}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      orientation={orientation}
      isDisabled={isDisabled}>
      {children}
    </Target>
  );
});

export type SliderOutputRef = ComponentRef<typeof W.Slider.Output>;
const SliderOutput = forwardRef<SliderOutputRef, SliderOutputProps>(function SliderOutput(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = W.Slider.Output;
  return (
    <Target {...webProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type SliderTrackRef = ComponentRef<typeof W.Slider.Track>;
const SliderTrack = forwardRef<SliderTrackRef, SliderTrackProps>(function SliderTrack(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = W.Slider.Track;
  return (
    <Target {...webProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type SliderFillRef = ComponentRef<typeof W.Slider.Fill<'div'>>;
const SliderFill = forwardRef<SliderFillRef, SliderFillProps>(function SliderFill(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = W.Slider.Fill<'div'>;
  return (
    <Target {...webProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type SliderThumbRef = ComponentRef<typeof W.Slider.Thumb>;
const SliderThumb = forwardRef<SliderThumbRef, SliderThumbProps>(function SliderThumb(
  { children, className, index = 0, webProps, nativeProps },
  ref
) {
  const Target = W.Slider.Thumb;
  return (
    <Target {...webProps} ref={ref} className={className} index={index}>
      {children}
    </Target>
  );
});

export const Slider = Object.assign(SliderRoot, {
  Root: SliderRoot,
  Output: SliderOutput,
  Track: SliderTrack,
  Fill: SliderFill,
  Thumb: SliderThumb,
});
