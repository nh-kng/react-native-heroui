import {
  createContext, forwardRef, useCallback, useContext, useLayoutEffect, useRef, useState,
  type ComponentRef, type Ref,
} from 'react';
import { Tag, TagGroup, TagList } from 'react-aria-components/TagGroup';

import { sameSegmentBounds, segmentBounds, type SegmentBounds } from './segmented-control-state.js';
import type {
  SegmentedControlProps, SegmentedControlListProps, SegmentedControlItemProps,
  SegmentedControlLabelProps,
} from './segmented-control.types.js';
import { useSegmentedControl } from './use-segmented-control.js';

export type * from './segmented-control.types.js';
export type SegmentedControlRef = ComponentRef<typeof TagGroup>;
export type SegmentedControlListRef = ComponentRef<typeof TagList>;
export type SegmentedControlItemRef = ComponentRef<typeof Tag>;
export type SegmentedControlLabelRef = HTMLSpanElement;

function assignRef(ref: Ref<HTMLDivElement>, node: HTMLDivElement | null) {
  if (typeof ref === 'function') return ref(node);
  if (ref) ref.current = node;
}

const Context = createContext<{
  register: (value: string, node: HTMLDivElement | null) => void;
  isDisabled: boolean;
} | null>(null);

const Root = forwardRef<SegmentedControlRef, SegmentedControlProps>(function SegmentedControl(
  { children, className, isDisabled = false, webProps, nativeProps: _nativeProps, ...selection }, ref
) {
  const { selected, selectedKeys, onSelectionChange } = useSegmentedControl(selection);
  const wrapper = useRef<HTMLDivElement>(null);
  const items = useRef(new Map<string, HTMLDivElement>());
  const [version, setVersion] = useState(0);
  const [bounds, setBounds] = useState<SegmentBounds>();
  const [animate, setAnimate] = useState(false);
  const isPositioned = bounds !== undefined;
  const register = useCallback((value: string, node: HTMLDivElement | null) => {
    if (node) items.current.set(value, node);
    else items.current.delete(value);
    setVersion((current) => current + 1);
  }, []);

  useLayoutEffect(() => {
    const container = wrapper.current;
    if (!container) return;
    const measure = () => {
      const node = items.current.get(selected);
      const outer = container.getBoundingClientRect();
      const inner = node?.getBoundingClientRect();
      const next = inner ? segmentBounds(
        { x: inner.left, y: inner.top, width: inner.width, height: inner.height },
        { x: outer.left + container.clientLeft, y: outer.top + container.clientTop, width: outer.width, height: outer.height }
      ) : undefined;
      setBounds((previous) => sameSegmentBounds(previous, next) ? previous : next);
    };
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(measure);
    observer?.observe(container);
    for (const node of items.current.values()) observer?.observe(node);
    window.addEventListener('resize', measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [selected, version]);

  useLayoutEffect(() => {
    if (!isPositioned) return;
    const frame = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(frame);
  }, [isPositioned]);

  return (
    <Context value={{ register, isDisabled }}>
      <div ref={wrapper} className={['segmented-control', className].filter(Boolean).join(' ')} data-disabled={isDisabled || undefined}>
        <div
          aria-hidden="true"
          className="segmented-control__indicator"
          data-animate={animate || undefined}
          style={{
            visibility: bounds ? 'visible' : 'hidden',
            transform: `translate(${bounds?.x ?? 0}px, ${bounds?.y ?? 0}px)`,
            width: bounds?.width ?? 0,
            height: bounds?.height ?? 0,
          }}
        />
        <TagGroup
          {...webProps}
          ref={ref}
          className="segmented-control__group"
          aria-disabled={isDisabled || undefined}
          selectionMode="single"
          selectionBehavior="replace"
          disallowEmptySelection
          selectedKeys={selectedKeys}
          onSelectionChange={(keys) => { if (keys !== 'all') onSelectionChange(keys); }}>
          {children}
        </TagGroup>
      </div>
    </Context>
  );
});

const List = forwardRef<SegmentedControlListRef, SegmentedControlListProps>(function SegmentedControlList(
  { children, className, webProps, nativeProps: _nativeProps }, ref
) {
  return <TagList {...webProps} ref={ref} className={['segmented-control__list', className].filter(Boolean).join(' ')}>{children}</TagList>;
});

const Item = forwardRef<SegmentedControlItemRef, SegmentedControlItemProps>(function SegmentedControlItem(
  { children, className, value, textValue, isDisabled, webProps, nativeProps: _nativeProps }, ref
) {
  const context = useContext(Context);
  if (!context) throw new Error('SegmentedControl.Item requires SegmentedControl');
  const { register } = context;
  const setRef = useCallback((node: HTMLDivElement | null) => {
    register(value, node);
    const cleanup = assignRef(ref, node);
    return () => {
      register(value, null);
      if (typeof cleanup === 'function') cleanup();
      else assignRef(ref, null);
    };
  }, [register, value, ref]);
  return (
    <Tag {...webProps} ref={setRef} id={value} textValue={textValue} isDisabled={isDisabled || context.isDisabled}
      className={['segmented-control__item', className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  );
});

const Label = forwardRef<SegmentedControlLabelRef, SegmentedControlLabelProps>(function SegmentedControlLabel(
  { children, className, webProps, nativeProps: _nativeProps }, ref
) {
  return <span {...webProps} ref={ref} className={['segmented-control__label', className].filter(Boolean).join(' ')}>{children}</span>;
});

export const SegmentedControl = Object.assign(Root, { Root, List, Item, Label });
