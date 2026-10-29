import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { AccessibilityInfo, PanResponder, ScrollView, View } from 'react-native';

import { Button } from '../../../../../components/button/button.native.js';
import {
  clampTableOffset,
  markdownTableDragOffset,
  markdownTableLayoutOffset,
  markdownTablePageOffset,
  markdownTableScrollMetrics,
  markdownTableTrackOffset,
} from '../../../../../components/markdown/markdown-table-scroll.js';
import { useIsRTL } from '../../../helpers/internal/hooks/use-is-rtl.js';

export function MarkdownTableScroll({
  children,
  onViewportChange,
}: {
  children: ReactNode;
  onViewportChange: (width: number) => void;
}) {
  const scrollRef = useRef<ScrollView>(null);
  const drag = useRef<{ x: number; offset: number } | null>(null);
  const [size, setSize] = useState({ viewport: 0, content: 0, offset: 0, track: 0 });
  const [reduceMotion, setReduceMotion] = useState(true);
  const isRTL = useIsRTL();
  const metrics = markdownTableScrollMetrics(
    size.viewport,
    size.content,
    size.offset,
    size.track
  );
  const previousLayout = useRef<{ maximum: number; rtl: boolean } | null>(null);

  useEffect(() => {
    let active = true;
    let changed = false;
    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      (value) => {
        changed = true;
        setReduceMotion(value);
      }
    );
    AccessibilityInfo.isReduceMotionEnabled().then(
      (value) => {
        if (active && !changed) setReduceMotion(value);
      },
      () => {}
    );
    return () => {
      active = false;
      subscription.remove();
    };
  }, []);

  function scrollTo(offset: number, animated = true) {
    const x = clampTableOffset(offset, metrics.maximum);
    scrollRef.current?.scrollTo({ x, animated: animated && !reduceMotion });
    if (!animated || reduceMotion) setSize((current) => ({ ...current, offset: x }));
  }

  useLayoutEffect(() => {
    if (size.viewport <= 0 || size.content <= 0) return;
    const position = markdownTableLayoutOffset(
      size.offset,
      metrics.maximum,
      isRTL,
      previousLayout.current
    );
    previousLayout.current = { maximum: metrics.maximum, rtl: isRTL };
    if (size.offset !== position) {
      scrollRef.current?.scrollTo({ x: position, animated: false });
      setSize((current) => ({ ...current, offset: position }));
    }
  }, [isRTL, metrics.maximum, metrics.position, size.content, size.offset, size.viewport]);

  function page(direction: number) {
    scrollTo(
      markdownTablePageOffset(metrics.position, direction, size.viewport, metrics.maximum)
    );
  }

  const current = useRef({ metrics, size, scrollTo });
  useLayoutEffect(() => {
    current.current = { metrics, size, scrollTo };
  });
  const responder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (event) => {
          const { metrics, size, scrollTo } = current.current;
          const { locationX, pageX } = event.nativeEvent;
          if (
            locationX >= metrics.thumbPosition &&
            locationX <= metrics.thumbPosition + metrics.thumb
          ) {
            drag.current = { x: pageX, offset: metrics.position };
            scrollTo(metrics.position, false);
          } else {
            drag.current = null;
            scrollTo(
              markdownTableTrackOffset(
                locationX,
                metrics.thumbPosition,
                metrics.thumb,
                metrics.position,
                size.viewport,
                metrics.maximum
              )
            );
          }
        },
        onPanResponderMove: (event) => {
          const { metrics, scrollTo } = current.current;
          const active = drag.current;
          if (active)
            scrollTo(
              markdownTableDragOffset(
                active.offset,
                event.nativeEvent.pageX - active.x,
                metrics.travel,
                metrics.maximum
              ),
              false
            );
        },
        onPanResponderRelease: () => {
          drag.current = null;
        },
        onPanResponderTerminate: () => {
          drag.current = null;
        },
      }),
    []
  );

  return (
    <>
      <ScrollView
        ref={scrollRef}
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        style={{ direction: 'ltr' }}
        onLayout={({ nativeEvent: { layout } }) => {
          setSize((current) => ({ ...current, viewport: layout.width }));
          onViewportChange(layout.width);
        }}
        onContentSizeChange={(width) =>
          setSize((current) => ({ ...current, content: width }))
        }
        onScroll={({ nativeEvent }) => {
          const offset = nativeEvent.contentOffset.x;
          setSize((current) => ({
            ...current,
            offset: clampTableOffset(offset, current.content - current.viewport),
          }));
        }}
        scrollEventThrottle={16}
        contentContainerStyle={{ minWidth: '100%' }}>
        <View style={{ direction: isRTL ? 'rtl' : 'ltr' }}>{children}</View>
      </ScrollView>
      {metrics.overflow ? (
        <View className="markdown__table-controls" style={{ direction: 'ltr' }}>
          <Button
            isIconOnly
            variant="ghost"
            isDisabled={!metrics.canScrollLeft}
            onPress={() => page(-1)}
            className="markdown__table-scroll-button"
            nativeProps={{
              accessibilityLabel: 'Scroll table left',
              style: { minWidth: 44, minHeight: 44 },
            }}>
            <Button.Label>‹</Button.Label>
          </Button>
          <View
            {...responder.panHandlers}
            className="markdown__table-scroll-track"
            accessible
            accessibilityRole="adjustable"
            accessibilityLabel="Table horizontal scroll"
            accessibilityValue={{ min: 0, max: 100, now: metrics.percent }}
            accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
            onAccessibilityAction={({ nativeEvent }) => {
              if (nativeEvent.actionName === 'increment') page(1);
              if (nativeEvent.actionName === 'decrement') page(-1);
            }}
            onLayout={({ nativeEvent: { layout } }) =>
              setSize((current) => ({ ...current, track: layout.width }))
            }>
            <View pointerEvents="none" className="markdown__table-scroll-rail" />
            <View
              pointerEvents="none"
              className="markdown__table-scroll-thumb"
              style={{ width: metrics.thumb, left: metrics.thumbPosition }}
            />
          </View>
          <Button
            isIconOnly
            variant="ghost"
            isDisabled={!metrics.canScrollRight}
            onPress={() => page(1)}
            className="markdown__table-scroll-button"
            nativeProps={{
              accessibilityLabel: 'Scroll table right',
              style: { minWidth: 44, minHeight: 44 },
            }}>
            <Button.Label>›</Button.Label>
          </Button>
        </View>
      ) : null}
    </>
  );
}
