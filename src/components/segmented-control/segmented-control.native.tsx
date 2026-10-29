import {
  createContext, forwardRef, useCallback, useContext, useEffect, useMemo, useRef, useState,
  type ComponentRef,
} from 'react';
import { I18nManager, type LayoutChangeEvent } from 'react-native';
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { offsetSegmentBounds, sameSegmentBounds, segmentIndicatorX, type SegmentBounds } from './segmented-control-state.js';
import type {
  SegmentedControlProps, SegmentedControlListProps, SegmentedControlItemProps,
  SegmentedControlLabelProps,
} from './segmented-control.types.js';
import { useSegmentedControl } from './use-segmented-control.js';
import { TagGroup, useTagGroupItem } from '../../primitives/native/components/tag-group/index.js';
import { cn } from '../../primitives/native/helpers/external/utils/cn.js';
import { useCombinedAnimationDisabledState } from '../../primitives/native/helpers/internal/hooks/index.js';

export type * from './segmented-control.types.js';
export type SegmentedControlRef = ComponentRef<typeof TagGroup>;
export type SegmentedControlListRef = ComponentRef<typeof TagGroup.List>;
export type SegmentedControlItemRef = ComponentRef<typeof TagGroup.Item>;
export type SegmentedControlLabelRef = ComponentRef<typeof TagGroup.ItemLabel>;

const Context = createContext<{
  setList: (bounds: SegmentBounds) => void;
  setItem: (value: string, bounds: SegmentBounds | undefined) => void;
} | null>(null);

function Indicator({ bounds }: { bounds: SegmentBounds | undefined }) {
  const disabled = useCombinedAnimationDisabledState(undefined);
  const positioned = useRef(false);
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  useEffect(() => {
    if (!bounds) return;
    const animate = positioned.current && !disabled;
    const config = { duration: 250, easing: Easing.out(Easing.cubic), reduceMotion: ReduceMotion.System };
    x.set(animate ? withTiming(bounds.x, config) : bounds.x);
    y.set(animate ? withTiming(bounds.y, config) : bounds.y);
    width.set(animate ? withTiming(bounds.width, config) : bounds.width);
    height.set(animate ? withTiming(bounds.height, config) : bounds.height);
    positioned.current = true;
  }, [bounds, disabled, x, y, width, height]);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: x.get() }, { translateY: y.get() }],
    width: width.get(), height: height.get(),
  }));
  return <Animated.View accessible={false} importantForAccessibility="no-hide-descendants" pointerEvents="none"
    className="segmented-control__indicator shadow-sm shadow-surface/25"
    style={[style, { opacity: bounds ? 1 : 0 }]} />;
}

const Root = forwardRef<SegmentedControlRef, SegmentedControlProps>(function SegmentedControl(
  { children, className, isDisabled = false, nativeProps, webProps: _webProps, ...selection }, ref
) {
  const { selected, selectedKeys, onSelectionChange } = useSegmentedControl(selection);
  const [trackWidth, setTrackWidth] = useState(0);
  const [list, setListState] = useState<SegmentBounds>();
  const [items, setItems] = useState<ReadonlyMap<string, SegmentBounds>>(new Map());
  const setList = useCallback((next: SegmentBounds) => {
    setListState((previous) => sameSegmentBounds(previous, next) ? previous : next);
  }, []);
  const setItem = useCallback((value: string, next: SegmentBounds | undefined) => {
    setItems((previous) => {
      if (sameSegmentBounds(previous.get(value), next)) return previous;
      const result = new Map(previous);
      if (next) result.set(value, next);
      else result.delete(value);
      return result;
    });
  }, []);
  const item = items.get(selected);
  const isAnchorMirrored = I18nManager.isRTL && I18nManager.doLeftAndRightSwapInRTL;
  const bounds = useMemo(() => {
    if (!list || !item || trackWidth <= 0) return undefined;
    const next = offsetSegmentBounds(item, list);
    return next ? { ...next, x: segmentIndicatorX(next, trackWidth, isAnchorMirrored) } : undefined;
  }, [list, item, trackWidth, isAnchorMirrored]);
  const onLayout = (event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
    nativeProps?.onLayout?.(event);
  };
  return (
    <Context value={{ setList, setItem }}>
      <TagGroup {...nativeProps} ref={ref} className={cn('segmented-control', isDisabled && 'opacity-50', className)}
        onLayout={onLayout} isDisabled={isDisabled} selectionMode="single" selectedKeys={selectedKeys} onSelectionChange={onSelectionChange}>
        <Indicator bounds={bounds} />
        {children}
      </TagGroup>
    </Context>
  );
});

const List = forwardRef<SegmentedControlListRef, SegmentedControlListProps>(function SegmentedControlList(
  { children, className, nativeProps, webProps: _webProps }, ref
) {
  const context = useContext(Context);
  if (!context) throw new Error('SegmentedControl.List requires SegmentedControl');
  const onLayout = (event: LayoutChangeEvent) => {
    context.setList(event.nativeEvent.layout);
    nativeProps?.onLayout?.(event);
  };
  return <TagGroup.List {...nativeProps} ref={ref} className={cn('segmented-control__list', className)}
    style={[{ width: 'auto', alignSelf: 'stretch', alignItems: 'center' }, nativeProps?.style]} onLayout={onLayout}>
    {children}
  </TagGroup.List>;
});

const Item = forwardRef<SegmentedControlItemRef, SegmentedControlItemProps>(function SegmentedControlItem(
  { children, className, value, textValue, isDisabled, nativeProps, webProps: _webProps }, ref
) {
  const context = useContext(Context);
  if (!context) throw new Error('SegmentedControl.Item requires SegmentedControl');
  const { setItem } = context;
  const layout = useRef<SegmentBounds | undefined>(undefined);
  useEffect(() => {
    if (layout.current) setItem(value, layout.current);
    return () => setItem(value, undefined);
  }, [setItem, value]);
  const onLayout = (event: LayoutChangeEvent) => {
    layout.current = event.nativeEvent.layout;
    setItem(value, layout.current);
    nativeProps?.onLayout?.(event);
  };
  return <TagGroup.Item {...nativeProps} ref={ref} id={value} accessibilityLabel={textValue}
    isDisabled={isDisabled} background={null} className={cn('segmented-control__item', className)} onLayout={onLayout}>
    {() => children}
  </TagGroup.Item>;
});

const Label = forwardRef<SegmentedControlLabelRef, SegmentedControlLabelProps>(function SegmentedControlLabel(
  { children, className, nativeProps, webProps: _webProps }, ref
) {
  const { isSelected } = useTagGroupItem();
  return <TagGroup.ItemLabel {...nativeProps} ref={ref}
    className={cn('segmented-control__label', isSelected && 'segmented-control__label--selected', className)}>{children}</TagGroup.ItemLabel>;
});

export const SegmentedControl = Object.assign(Root, { Root, List, Item, Label });
