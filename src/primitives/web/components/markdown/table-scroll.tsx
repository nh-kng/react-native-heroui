import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';

import {
  clampTableOffset,
  markdownTableDragOffset,
  markdownTablePageOffset,
  markdownTableScrollMetrics,
  markdownTableTrackOffset,
  markdownTableWebOffset,
  markdownTableWebScrollLeft,
} from '../../../../components/markdown/markdown-table-scroll.js';

export function MarkdownTableScroll({ children }: { children: ReactNode }) {
  const id = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ pointer: number; x: number; offset: number } | null>(null);
  const [size, setSize] = useState({ viewport: 0, content: 0, offset: 0, track: 0 });
  const metrics = markdownTableScrollMetrics(
    size.viewport,
    size.content,
    size.offset,
    size.track
  );

  function measure() {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const maximum = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const next = {
      viewport: viewport.clientWidth,
      content: viewport.scrollWidth,
      offset: markdownTableWebOffset(
        viewport.scrollLeft,
        maximum,
        getComputedStyle(viewport).direction === 'rtl'
      ),
      track: trackRef.current?.clientWidth ?? 0,
    };
    setSize((current) =>
      current.viewport === next.viewport &&
      current.content === next.content &&
      current.offset === next.offset &&
      current.track === next.track
        ? current
        : next
    );
  }

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    if (viewport.firstElementChild) observer.observe(viewport.firstElementChild);
    if (trackRef.current) observer.observe(trackRef.current);
    const directionObserver = new MutationObserver(measure);
    for (let parent: HTMLElement | null = viewport; parent; parent = parent.parentElement) {
      directionObserver.observe(parent, {
        attributes: true,
        attributeFilter: ['dir', 'class', 'style'],
      });
    }
    const onWheel = (event: WheelEvent) => {
      if (!event.shiftKey || event.deltaX !== 0 || event.deltaY === 0) return;
      const maximum = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const rtl = getComputedStyle(viewport).direction === 'rtl';
      const current = markdownTableWebOffset(viewport.scrollLeft, maximum, rtl);
      const unit =
        event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientWidth : 1;
      const offset = clampTableOffset(current + event.deltaY * unit, maximum);
      if (offset === current) return;
      event.preventDefault();
      viewport.scrollTo({
        left: markdownTableWebScrollLeft(offset, maximum, rtl),
        behavior: 'instant',
      });
    };
    viewport.addEventListener('wheel', onWheel, { passive: false });
    measure();
    return () => {
      observer.disconnect();
      directionObserver.disconnect();
      viewport.removeEventListener('wheel', onWheel);
    };
  }, []);

  useEffect(() => {
    measure();
  });

  function scrollTo(offset: number, animated = true) {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const maximum = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    viewport.scrollTo({
      left: markdownTableWebScrollLeft(
        offset,
        maximum,
        getComputedStyle(viewport).direction === 'rtl'
      ),
      behavior:
        animated && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'smooth'
          : 'instant',
    });
    measure();
  }

  function page(direction: number) {
    scrollTo(
      markdownTablePageOffset(metrics.position, direction, size.viewport, metrics.maximum)
    );
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let offset: number;
    switch (event.key) {
      case 'ArrowLeft':
        offset = metrics.position - 40;
        break;
      case 'ArrowRight':
        offset = metrics.position + 40;
        break;
      case 'PageUp':
        offset = markdownTablePageOffset(
          metrics.position,
          -1,
          size.viewport,
          metrics.maximum
        );
        break;
      case 'PageDown':
        offset = markdownTablePageOffset(
          metrics.position,
          1,
          size.viewport,
          metrics.maximum
        );
        break;
      case 'Home':
        offset = 0;
        break;
      case 'End':
        offset = metrics.maximum;
        break;
      default:
        return;
    }
    event.preventDefault();
    scrollTo(offset);
  }

  return (
    <div className="markdown__table-container">
      <div
        id={id}
        ref={viewportRef}
        className="markdown__table-scroll"
        tabIndex={0}
        role="region"
        aria-label="Table"
        onScroll={measure}>
        {children}
      </div>
      <div className="markdown__table-controls" hidden={!metrics.overflow}>
        <button
          type="button"
          className="markdown__table-scroll-button"
          aria-label="Scroll table left"
          aria-controls={id}
          disabled={!metrics.canScrollLeft}
          onClick={() => page(-1)}>
          ‹
        </button>
        <div
          ref={trackRef}
          className="markdown__table-scroll-track"
          role="scrollbar"
          tabIndex={0}
          aria-label="Table horizontal scroll"
          aria-controls={id}
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={metrics.percent}
          onKeyDown={onKeyDown}
          onPointerDown={(event) => {
            if (!event.isPrimary || event.button !== 0) return;
            event.preventDefault();
            event.currentTarget.focus();
            const point = event.clientX - event.currentTarget.getBoundingClientRect().left;
            if (
              point >= metrics.thumbPosition &&
              point <= metrics.thumbPosition + metrics.thumb
            ) {
              drag.current = {
                pointer: event.pointerId,
                x: event.clientX,
                offset: metrics.position,
              };
              scrollTo(metrics.position, false);
              event.currentTarget.setPointerCapture(event.pointerId);
            } else {
              scrollTo(
                markdownTableTrackOffset(
                  point,
                  metrics.thumbPosition,
                  metrics.thumb,
                  metrics.position,
                  size.viewport,
                  metrics.maximum
                )
              );
            }
          }}
          onPointerMove={(event) => {
            const active = drag.current;
            if (active?.pointer === event.pointerId)
              scrollTo(
                markdownTableDragOffset(
                  active.offset,
                  event.clientX - active.x,
                  metrics.travel,
                  metrics.maximum
                ),
                false
              );
          }}
          onPointerUp={(event) => {
            if (drag.current?.pointer !== event.pointerId) return;
            drag.current = null;
            event.currentTarget.releasePointerCapture(event.pointerId);
          }}
          onPointerCancel={() => {
            drag.current = null;
          }}
          onLostPointerCapture={() => {
            drag.current = null;
          }}>
          <div className="markdown__table-scroll-rail" />
          <div
            className="markdown__table-scroll-thumb"
            style={{ width: metrics.thumb, left: metrics.thumbPosition }}
          />
        </div>
        <button
          type="button"
          className="markdown__table-scroll-button"
          aria-label="Scroll table right"
          aria-controls={id}
          disabled={!metrics.canScrollRight}
          onClick={() => page(1)}>
          ›
        </button>
      </div>
    </div>
  );
}
