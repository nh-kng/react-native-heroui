import assert from 'node:assert/strict';
import test from 'node:test';

import { keyboardTypeToInputMode } from '../build/web/components/input/input-mapping.js';
import { headingTypeToLevel, paragraphTypeToSize } from '../build/web/components/typography/typography-mapping.js';

test('keyboard types map to web input modes', () => {
  assert.equal(keyboardTypeToInputMode('email-address'), 'email');
  assert.equal(keyboardTypeToInputMode('number-pad'), 'numeric');
  assert.equal(keyboardTypeToInputMode('phone-pad'), 'tel');
  assert.equal(keyboardTypeToInputMode('url'), 'url');
  assert.equal(keyboardTypeToInputMode('default'), 'text');
  assert.equal(keyboardTypeToInputMode('visible-password'), undefined);
  assert.equal(keyboardTypeToInputMode(undefined), undefined);
});

test('typography types map to upstream levels and sizes', () => {
  assert.equal(headingTypeToLevel('h1'), 1);
  assert.equal(headingTypeToLevel('h6'), 6);
  assert.equal(paragraphTypeToSize('body'), 'base');
  assert.equal(paragraphTypeToSize('body-sm'), 'sm');
  assert.equal(paragraphTypeToSize('body-xs'), 'xs');
});
