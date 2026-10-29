export interface RippleGeometry {
  x: number;
  y: number;
  radius: number;
}

export function rippleGeometry(
  width: number,
  height: number,
  origin = { x: width / 2, y: height / 2 }
): RippleGeometry {
  const x = Math.max(0, Math.min(width, origin.x));
  const y = Math.max(0, Math.min(height, origin.y));
  return { x, y, radius: Math.hypot(Math.max(x, width - x), Math.max(y, height - y)) };
}

export type RippleEvent =
  | { type: 'start'; geometry: RippleGeometry }
  | { type: 'release' | 'cancel' };

interface RipplePressEvent {
  target: Pick<Element, 'clientWidth' | 'clientHeight' | 'getBoundingClientRect'>;
  pointerType: string;
  x: number;
  y: number;
}

export function ripplePressHandlers(emit: (event: RippleEvent) => void) {
  let didPressUp = false;
  return {
    onPressStart(event: RipplePressEvent) {
      didPressUp = false;
      const rect = event.target.getBoundingClientRect();
      const width = event.target.clientWidth;
      const height = event.target.clientHeight;
      const origin =
        event.pointerType === 'keyboard' || event.pointerType === 'virtual'
          ? undefined
          : {
              x: rect.width ? (event.x * width) / rect.width : width / 2,
              y: rect.height ? (event.y * height) / rect.height : height / 2,
            };
      emit({ type: 'start', geometry: rippleGeometry(width, height, origin) });
    },
    onPressUp() {
      didPressUp = true;
    },
    onPressEnd() {
      emit({ type: didPressUp ? 'release' : 'cancel' });
      didPressUp = false;
    },
  };
}

interface RippleScheduler {
  now: () => number;
  schedule: (callback: () => void, delay: number) => () => void;
}

export function rippleDuration(value: string, fallback: number): number {
  const match = value.trim().match(/^(\d*\.?\d+)(ms|s)$/);
  const duration = match ? Number(match[1]) * (match[2] === 's' ? 1000 : 1) : fallback;
  return Number.isFinite(duration) ? duration : fallback;
}

export function rippleExpansionDuration(
  radius: number,
  baseDuration = 350,
  minimumDuration = 250,
  maximumDuration = 550
): number {
  return Math.max(minimumDuration, Math.min(maximumDuration, baseDuration * Math.sqrt(radius / 100)));
}

interface RipplePlayback {
  release: () => void;
  cancel: () => void;
  dispose: () => void;
}

export interface RippleTiming {
  expansionDuration: number;
  enterDuration: number;
  minimumPressDuration: number;
  releaseDuration: number;
  cancelDuration: number;
  easing: string;
}

export function animateRipple(
  surface: HTMLElement,
  timing: RippleTiming,
  reducedMotion: boolean,
  onFinish: () => void,
  scheduler: RippleScheduler = {
    now: () => performance.now(),
    schedule(callback, delay) {
      const timer = setTimeout(callback, delay);
      return () => clearTimeout(timer);
    },
  },
  readOpacity = () => getComputedStyle(surface).opacity
): RipplePlayback {
  const startedAt = scheduler.now();
  const opacity = readOpacity();
  const animations = new Set<Animation>();
  let enter: Animation | undefined;
  let clearPending: (() => void) | undefined;
  let exiting = false;
  let disposed = false;

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    clearPending?.();
    animations.forEach((animation) => {
      animation.onfinish = null;
      animation.oncancel = null;
      animation.cancel();
    });
    animations.clear();
    surface.remove();
  };
  const finish = () => {
    if (disposed) return;
    dispose();
    onFinish();
  };
  const animate = (frames: Keyframe[], duration: number, easing: string) => {
    const animation = surface.animate(frames, { duration, easing, fill: 'forwards' });
    animations.add(animation);
    animation.oncancel = finish;
    return animation;
  };

  if (!reducedMotion && typeof surface.animate === 'function') {
    animate(
      [{ transform: 'scale(0)' }, { transform: 'scale(1)' }],
      timing.expansionDuration,
      timing.easing
    );
    enter = animate([{ opacity: 0 }, { opacity }], timing.enterDuration, 'ease-out');
  }

  const exit = (duration: number, wait: number) => {
    if (disposed || exiting) return;
    exiting = true;
    const fade = () => {
      clearPending = undefined;
      if (disposed) return;
      if (reducedMotion || duration === 0) {
        finish();
        return;
      }
      if (typeof surface.animate !== 'function') {
        surface.style.transition = `opacity ${duration}ms ease-out`;
        surface.style.opacity = '0';
        clearPending = scheduler.schedule(finish, duration);
        return;
      }
      const currentOpacity = readOpacity();
      if (enter) {
        enter.oncancel = null;
        enter.cancel();
        animations.delete(enter);
      }
      const fadeOut = animate([{ opacity: currentOpacity }, { opacity: 0 }], duration, 'ease-out');
      fadeOut.onfinish = finish;
    };
    if (wait > 0) clearPending = scheduler.schedule(fade, wait);
    else fade();
  };

  return {
    release() {
      exit(
        timing.releaseDuration,
        reducedMotion
          ? 0
          : Math.max(0, timing.minimumPressDuration - (scheduler.now() - startedAt))
      );
    },
    cancel() {
      exit(timing.cancelDuration, 0);
    },
    dispose,
  };
}

export function createRippleController(
  create: (geometry: RippleGeometry, onFinish: () => void) => RipplePlayback
) {
  const ripples = new Set<RipplePlayback>();
  let active: RipplePlayback | undefined;
  return {
    start(geometry: RippleGeometry) {
      active?.cancel();
      const ripple = create(geometry, () => {
        ripples.delete(ripple);
        if (active === ripple) active = undefined;
      });
      ripples.add(ripple);
      active = ripple;
    },
    release() {
      active?.release();
      active = undefined;
    },
    cancel() {
      active?.cancel();
      active = undefined;
    },
    dispose() {
      ripples.forEach((ripple) => ripple.dispose());
      ripples.clear();
      active = undefined;
    },
  };
}
