import type { MouseEventHandler } from 'react';

type MouseHandlers<T extends Element> = {
  onMouseDown?: MouseEventHandler<T>;
  onMouseUp?: MouseEventHandler<T>;
};

export function mouseBoundary<T extends Element>(handlers?: MouseHandlers<T>): MouseHandlers<T> {
  const isolate =
    (handler?: MouseEventHandler<T>): MouseEventHandler<T> =>
    (event) => {
      if (typeof PointerEvent !== 'undefined' && event.button === 0) event.stopPropagation();
      handler?.(event);
    };
  return { onMouseDown: isolate(handlers?.onMouseDown), onMouseUp: isolate(handlers?.onMouseUp) };
}
