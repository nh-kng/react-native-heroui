import assert from 'node:assert/strict';
import test from 'node:test';

import { webTextValueProps } from '../build/web/components/shared/web-text-value.js';
import { mouseBoundary } from '../build/web/components/shared/mouse-boundary.web.js';

test('text leaves inherit field state unless value or defaultValue is supplied', () => {
  assert.deepEqual(webTextValueProps(undefined, undefined, 'unused'), {});
  assert.deepEqual(webTextValueProps('controlled', undefined, 'controlled'), {value:'controlled'});
  assert.deepEqual(webTextValueProps(undefined, 'initial', 'edited'), {value:'edited'});
  assert.deepEqual(webTextValueProps(undefined, '', ''), {value:''});
  assert.deepEqual(webTextValueProps('controlled', 'initial', 'controlled'), {value:'controlled'});
  assert.equal('defaultValue' in webTextValueProps(undefined, 'initial', 'edited'), false);
});

function withPointerEvents(enabled, run) {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'PointerEvent');
  if (enabled) Object.defineProperty(globalThis, 'PointerEvent', {value:class PointerEvent {}, configurable:true});
  else Reflect.deleteProperty(globalThis, 'PointerEvent');
  try { run(); } finally {
    if (previous) Object.defineProperty(globalThis, 'PointerEvent', previous);
    else Reflect.deleteProperty(globalThis, 'PointerEvent');
  }
}

test('modern primary mouse events stay paired at the control boundary and preserve callbacks', () => {
  withPointerEvents(true, () => {
    const calls = [];
    const event = {button:0, stopPropagation() { calls.push('stop'); }};
    const handlers = mouseBoundary({onMouseDown:received => {assert.equal(received,event); calls.push('down');},onMouseUp:received => {assert.equal(received,event); calls.push('up');}});
    handlers.onMouseDown(event);
    handlers.onMouseUp(event);
    assert.deepEqual(calls, ['stop','down','stop','up']);
  });
});

test('mouse boundary preserves document mouse handling in the legacy fallback and for other buttons', () => {
  withPointerEvents(false, () => {
    const calls = [];
    const event = {button:0,stopPropagation() {calls.push('stop');}};
    const handlers = mouseBoundary({onMouseDown:() => calls.push('down'),onMouseUp:() => calls.push('up')});
    handlers.onMouseDown(event);
    handlers.onMouseUp(event);
    assert.deepEqual(calls, ['down','up']);
  });
  withPointerEvents(true, () => {
    let stopped = false;
    const event = {button:2,stopPropagation() {stopped=true;}};
    const handlers = mouseBoundary();
    handlers.onMouseDown(event);
    handlers.onMouseUp(event);
    assert.equal(stopped,false);
  });
});
