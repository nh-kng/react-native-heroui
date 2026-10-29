import { forwardRef, type ComponentRef } from 'react';

import type {
  SliderProps,
  SliderOutputProps,
  SliderTrackProps,
  SliderFillProps,
  SliderThumbProps,
} from './slider.types.js';
import * as N from '../../primitives/native/components/slider/index.js';
export type * from './slider.types.js';

export type SliderRootRef = ComponentRef<typeof N.Slider>;
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
  const Target = N.Slider;
  return (
    <Target
      {...nativeProps}
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

export type SliderOutputRef = ComponentRef<typeof N.Slider.Output>;
const SliderOutput = forwardRef<SliderOutputRef, SliderOutputProps>(function SliderOutput(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = N.Slider.Output;
  return (
    <Target {...nativeProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type SliderTrackRef = ComponentRef<typeof N.Slider.Track>;
const SliderTrack = forwardRef<SliderTrackRef, SliderTrackProps>(function SliderTrack(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = N.Slider.Track;
  return (
    <Target {...nativeProps} ref={ref} className={className}>
      <N.Slider.TrackBackground />
      {children}
    </Target>
  );
});

export type SliderFillRef = ComponentRef<typeof N.Slider.Fill>;
const SliderFill = forwardRef<SliderFillRef, SliderFillProps>(function SliderFill(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = N.Slider.Fill;
  return (
    <Target {...nativeProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type SliderThumbRef = ComponentRef<typeof N.Slider.Thumb>;
const SliderThumb = forwardRef<SliderThumbRef, SliderThumbProps>(function SliderThumb(
  { children, className, index = 0, webProps, nativeProps },
  ref
) {
  const Target = N.Slider.Thumb;
  return (
    <Target {...nativeProps} ref={ref} className={className} index={index}>
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
