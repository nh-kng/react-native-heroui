import { spinnerColorToNative } from '../build/native/components/spinner/spinner-mapping.js';
import { normalizeExpandedKeys } from '../build/web/components/accordion/accordion-mapping.js';
import assert from 'node:assert/strict';
import test from 'node:test';
import { findSelectOption, isSelectControlled } from '../build/web/components/select/select-mapping.js';
import { nativeToastOptions, webToastOptions } from '../build/web/components/toast/toast-mapping.js';
import { createWebToastManager } from '../build/web/components/toast/toast-manager.web.js';
import { ToastQueue } from '../build/web/primitives/web/components/toast/index.js';

const families = ['Accordion','Alert','Avatar','Checkbox','CloseButton','InputGroup','InputOTP','Popover','RadioGroup','ScrollShadow','SearchField','Select','Separator','Skeleton','Slider','Spinner','Surface','Switch','Tabs','TagGroup','TextArea','Toast'];

test('new families resolve through conditional subpaths without rendering', async () => {
  for (const name of families) {
    const slug = name.replace(/[A-Z]/g, (letter, index) => `${index ? '-' : ''}${letter.toLowerCase()}`).replace('input-o-t-p', 'input-otp');
    const subpath = await import(`@nh-kng/react-native-heroui/${slug}`);
    const components = await import(`../build/web/components/${slug}/index.web.js`);
    assert.equal(subpath[name], components[name], name);
    assert.equal(components[name].Root, components[name], name);
  }
});

test('select resolves labels without inventing unknown options and distinguishes controlled emptiness', () => {
  const items = [{value:'engineering', label:'Engineering'}, {value:'design',label:'Design'}];
  assert.equal(findSelectOption(items, 'design'), items[1]);
  assert.equal(findSelectOption(items, 'missing'), undefined);
  assert.equal(findSelectOption(items, undefined), undefined);
  assert.equal(isSelectControlled({value:undefined}), true);
  assert.equal(isSelectControlled({}), false);
});

test('toast duration zero is persistent on each platform and default duration agrees', () => {
  const options = {title:'Saved',description:'Draft ready',variant:'success',duration:0};
  assert.deepEqual(nativeToastOptions(options), {label:'Saved',description:'Draft ready',variant:'success',duration:'persistent'});
  assert.deepEqual(webToastOptions(options), {content:{title:'Saved',description:'Draft ready',variant:'success'},options:{timeout:0}});
  assert.equal(nativeToastOptions({title:'Ready'}).duration, webToastOptions({title:'Ready'}).options.timeout);
});

test('toast managers isolate queues and target dismissal by returned string id', () => {
  const first = new ToastQueue({exitDuration:0});
  const second = new ToastQueue({exitDuration:0});
  try {
    const a = createWebToastManager(first);
    const b = createWebToastManager(second);
    const id = a.show({title:'First', duration:0});
    const other = b.show({title:'Second', duration:0});
    assert.equal(typeof id, 'string');
    assert.equal(first.visibleToasts[0].content.title, 'First');
    assert.equal(second.visibleToasts[0].key, other);
    a.dismiss(id);
    assert.equal(first.visibleToasts.length, 0);
    assert.equal(second.visibleToasts.length, 1);
    b.dismissAll();
    assert.equal(second.visibleToasts.length, 0);
  } finally { first.destroy(); second.destroy(); }
});

test('accordion applies the same single/multiple expansion contract to supplied sets', () => {
  const supplied = new Set(['first', 'second']);
  assert.deepEqual([...normalizeExpandedKeys(supplied, 'single')], ['first']);
  assert.deepEqual([...normalizeExpandedKeys(supplied, 'multiple')], ['first', 'second']);
  assert.deepEqual([...normalizeExpandedKeys(new Set(), 'single')], []);
  assert.equal(supplied.size, 2);
});

test('spinner maps semantic accent to the native default instead of passing an invalid color literal', () => {
  assert.equal(spinnerColorToNative('accent'), 'default');
  for (const color of ['success','warning','danger']) assert.equal(spinnerColorToNative(color), color);
});
