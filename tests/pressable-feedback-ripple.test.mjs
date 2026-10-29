import assert from 'node:assert/strict';
import test from 'node:test';

import {
  animateRipple,
  createRippleController,
  rippleExpansionDuration,
  rippleDuration,
  rippleGeometry,
  ripplePressHandlers,
} from '../build/web/components/pressable-feedback/pressable-feedback-ripple.web.js';

const geometry = rippleGeometry(100, 60, {x:10, y:20});
const timing = {
  expansionDuration:350, enterDuration:90, minimumPressDuration:120,
  releaseDuration:220, cancelDuration:100, easing:'cubic-bezier(0.2, 0, 0, 1)',
};

function harness({reducedMotion = false, supportsAnimations = true, durations = timing} = {}) {
  let now = 0;
  const timers = new Map();
  const surfaces = [];
  const scheduler = {
    now: () => now,
    schedule(callback, delay) {
      const timer = {callback, at:now + delay};
      timers.set(timer,timer);
      return () => timers.delete(timer);
    },
  };
  const controller = createRippleController((geometry, onFinish) => {
    const surface = {
      geometry, style:{}, animations:[], opacity:'0.12', removed:false,
      remove() { this.removed = true; },
      animate(frames, options) {
        const animation = {
          frames, options, cancelled:false, onfinish:null, oncancel:null,
          cancel() { this.cancelled = true; this.oncancel?.(); },
          finish() { this.onfinish?.(); },
        };
        this.animations.push(animation);
        return animation;
      },
    };
    if (!supportsAnimations) surface.animate = undefined;
    surfaces.push(surface);
    return animateRipple(surface, durations, reducedMotion, onFinish, scheduler, () => surface.opacity);
  });
  return {
    controller, timers, surfaces,
    advance(duration) {
      const until = now + duration;
      while (true) {
        const next = [...timers.values()].sort((a,b) => a.at - b.at)[0];
        if (!next || next.at > until) break;
        now = next.at;
        timers.delete(next);
        next.callback();
      }
      now = until;
    },
  };
}

test('ripple reaches every corner from its pointer origin and clamps out-of-bounds origins', () => {
  assert.deepEqual(geometry, {x:10, y:20, radius:Math.hypot(90, 40)});
  for (const [x, y] of [[0,0], [100,0], [0,60], [100,60]]) {
    assert.ok(Math.hypot(x - geometry.x, y - geometry.y) <= geometry.radius);
  }
  assert.deepEqual(rippleGeometry(100, 60), {x:50, y:30, radius:Math.hypot(50, 30)});
  assert.deepEqual(rippleGeometry(100, 60, {x:-10,y:80}), {x:0,y:60,radius:Math.hypot(100,60)});
  assert.deepEqual(rippleGeometry(0, 0), {x:0, y:0, radius:0});
});

test('public press callbacks normalize scaled pointer coordinates, center keyboard/virtual presses and distinguish cancellation', () => {
  const events = [];
  const handlers = ripplePressHandlers((event) => events.push(event));
  const target = {clientWidth:100, clientHeight:60, getBoundingClientRect:() => ({width:50, height:30})};
  for (const pointerType of ['mouse', 'touch', 'pen']) {
    handlers.onPressStart({target, x:5, y:10, pointerType});
    assert.deepEqual(events.at(-1), {type:'start',geometry});
    handlers.onPressUp();
    handlers.onPressEnd();
    assert.deepEqual(events.at(-1), {type:'release'});
  }
  for (const pointerType of ['keyboard', 'virtual']) {
    handlers.onPressStart({target, x:0, y:0, pointerType});
    assert.deepEqual(events.at(-1), {type:'start',geometry:rippleGeometry(100,60)});
    handlers.onPressEnd();
    assert.deepEqual(events.at(-1), {type:'cancel'});
  }
  handlers.onPressStart({target, x:5, y:10, pointerType:'mouse'});
  handlers.onPressEnd();
  assert.deepEqual(events.at(-1), {type:'cancel'}, 'Previous successful releases do not leak into a canceled press');
});

test('quick taps wait only for minimum visibility, then fade without restarting expansion', () => {
  const h = harness();
  h.controller.start(geometry);
  const surface = h.surfaces[0];
  const expansion = surface.animations[0];
  assert.deepEqual(expansion.frames, [{transform:'scale(0)'},{transform:'scale(1)'}]);
  assert.deepEqual(surface.animations[1].frames, [{opacity:0},{opacity:'0.12'}]);
  h.controller.release();
  h.advance(119);
  assert.equal(surface.animations.length,2);
  surface.opacity = '0.08';
  h.advance(1);
  assert.equal(surface.animations.length,3);
  assert.equal(expansion.cancelled,false);
  const fade = surface.animations[2];
  assert.deepEqual(fade.frames,[{opacity:'0.08'},{opacity:0}]);
  assert.equal(fade.options.duration,220);
  assert.equal(surface.removed,false);
  fade.finish();
  assert.equal(surface.removed,true);
  assert.ok(surface.animations.every((animation) => animation.cancelled));
  assert.equal(h.timers.size,0);
});

test('long presses fade immediately and duplicate release cannot extend their exit', () => {
  const h = harness();
  h.controller.start(geometry);
  h.advance(1000);
  assert.equal(h.timers.size,0);
  h.controller.release();
  h.controller.release();
  assert.equal(h.surfaces[0].animations.length,3);
  assert.equal(h.timers.size,0);
  h.surfaces[0].animations[2].finish();
  assert.equal(h.surfaces[0].removed,true);
});

test('rapid taps have independent surfaces and completion cannot remove the next ripple', () => {
  const h = harness();
  for (let i=0;i<3;i++) {
    h.controller.start(geometry);
    h.controller.release();
    h.advance(40);
  }
  h.advance(120);
  assert.equal(h.surfaces.length,3);
  assert.ok(h.surfaces.every((surface) => !surface.removed));
  h.surfaces[0].animations.at(-1).finish();
  assert.equal(h.surfaces[0].removed,true);
  assert.equal(h.surfaces[1].removed,false);
  assert.equal(h.surfaces[2].removed,false);
  h.controller.dispose();
  assert.ok(h.surfaces.every((surface) => surface.removed));
});

test('cancellation fades immediately with the shorter duration; interrupted presses also exit', () => {
  const h = harness();
  h.controller.start(geometry);
  h.advance(40);
  h.controller.cancel();
  assert.equal(h.timers.size,0);
  assert.equal(h.surfaces[0].animations.at(-1).options.duration,100);
  h.surfaces[0].animations.at(-1).finish();
  assert.equal(h.surfaces[0].removed,true);
  h.controller.start(geometry);
  h.controller.start(geometry);
  assert.equal(h.surfaces[1].animations.at(-1).options.duration,100);
  assert.equal(h.surfaces[2].animations.length,2);
  h.controller.dispose();
});

test('disposal clears all animations and pending timers without later work', () => {
  const h = harness();
  h.controller.start(geometry);
  h.controller.release();
  h.controller.start(geometry);
  h.controller.dispose();
  assert.equal(h.timers.size,0);
  assert.ok(h.surfaces.every((surface) => surface.removed));
  assert.ok(h.surfaces.flatMap((surface) => surface.animations).every((animation) => animation.cancelled && !animation.onfinish && !animation.oncancel));
  h.advance(1000);
  h.controller.dispose();
});

test('externally cancelled animations clean up their surface without leaking the controller', () => {
  const h = harness();
  h.controller.start(geometry);
  h.controller.release();
  h.surfaces[0].animations[0].cancel();
  assert.equal(h.surfaces[0].removed,true);
  assert.equal(h.timers.size,0);
  h.controller.start(geometry);
  assert.equal(h.surfaces[1].removed,false);
  h.controller.dispose();
});

test('reduced motion shows immediate feedback without expansion, timers or a delayed exit', () => {
  for (const action of ['release','cancel']) {
    const h = harness({reducedMotion:true});
    h.controller.start(geometry);
    assert.equal(h.surfaces[0].removed,false);
    assert.equal(h.surfaces[0].animations.length,0);
    h.controller[action]();
    assert.equal(h.surfaces[0].removed,true);
    assert.equal(h.timers.size,0);
  }
});

test('missing WAAPI retains opacity feedback and cleans up with a timer fallback', () => {
  const h = harness({supportsAnimations:false});
  h.controller.start(geometry);
  h.controller.release();
  h.advance(120);
  assert.equal(h.surfaces[0].style.opacity,'0');
  h.advance(220);
  assert.equal(h.surfaces[0].removed,true);
  assert.equal(h.timers.size,0);
});

test('size-aware expansion is clamped and existing duration overrides remain parseable', () => {
  assert.equal(rippleExpansionDuration(0),250);
  assert.equal(rippleExpansionDuration(100),350);
  assert.equal(rippleExpansionDuration(1000),550);
  assert.equal(rippleExpansionDuration(100,600,400,800),600);
  assert.equal(rippleDuration(' 350ms ',225),350);
  assert.equal(rippleDuration('.4s',200),400);
  assert.equal(rippleDuration('0ms',200),0);
  for (const value of ['', '-1ms', 'NaN', '100', 'calc(200ms + 1ms)', '9'.repeat(400)+'s']) {
    assert.equal(rippleDuration(value,200),200);
  }
});

test('zero timing overrides remove on release without leaving animations or timers', () => {
  const h = harness({durations:{...timing, expansionDuration:0, enterDuration:0, minimumPressDuration:0, releaseDuration:0, cancelDuration:0}});
  h.controller.start(geometry);
  h.controller.release();
  assert.equal(h.surfaces[0].removed,true);
  assert.equal(h.timers.size,0);
  assert.ok(h.surfaces[0].animations.every((animation) => animation.cancelled));
});

test('separate ripple instances never share active surfaces or cleanup', () => {
  const first = harness();
  const second = harness();
  first.controller.start(geometry);
  second.controller.start(rippleGeometry(300,200));
  first.controller.dispose();
  assert.equal(first.surfaces[0].removed,true);
  assert.equal(second.surfaces[0].removed,false);
  second.advance(200);
  second.controller.release();
  second.surfaces[0].animations.at(-1).finish();
  assert.equal(second.surfaces[0].removed,true);
});
