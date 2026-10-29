import assert from 'node:assert/strict';
import { createElement, createRef, Fragment } from 'react';
import test from 'node:test';

import { mapTagGroupChildren } from '../build/web/components/tag-group/tag-group-children.web.js';
import { TagGroup } from '../build/web/components/tag-group/tag-group.web.js';
import { Tag } from '../build/web/primitives/web/components/tag/index.js';
import { pickChildren } from '../build/web/primitives/web/utils/children.js';

test('tag removal recognizes the public compound button and preserves its props and ref', () => {
  const ref = createRef();
  const children = [
    createElement('span', { key: 'label' }, 'Design'),
    createElement(TagGroup.RemoveButton, {
      key: 'remove',
      ref,
      className: 'custom-remove',
      webProps: { 'aria-label': 'Remove Design' },
    }, 'Custom icon'),
  ];
  const [labels, buttons] = pickChildren(
    mapTagGroupChildren(children, TagGroup.RemoveButton), Tag.RemoveButton
  );
  assert.equal(labels.length, 1);
  assert.equal(buttons.length, 1);
  assert.equal(buttons[0].props.ref, ref);
  assert.equal(buttons[0].props.className, 'custom-remove');
  assert.equal(buttons[0].props['aria-label'], 'Remove Design');
  assert.equal(buttons[0].props.children, 'Custom icon');
});

test('fragment removal buttons are recognized and absent buttons retain automatic removal', () => {
  const [, buttons] = pickChildren(mapTagGroupChildren(
    createElement(Fragment, null, 'Design', createElement(TagGroup.RemoveButton)),
    TagGroup.RemoveButton
  ), Tag.RemoveButton);
  assert.equal(buttons.length, 1);
  const [labels, absent] = pickChildren(mapTagGroupChildren('Design', TagGroup.RemoveButton), Tag.RemoveButton);
  assert.deepEqual(labels, ['Design']);
  assert.equal(absent, undefined);
});
