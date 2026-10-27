/*
 * Derived from heroui-native/src/primitives/label/label.tsx at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { forwardRef } from 'react';
import { Pressable, Text as RNText } from 'react-native';

import type { RootProps, RootRef, TextProps, TextRef } from './label.types.js';
import * as Slot from '../slot/index.js';

const Root = forwardRef<RootRef, RootProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : Pressable;

  return <Component ref={ref} {...props} />;
});

Root.displayName = 'HeroUINative.Primitive.Label.Root';

// --------------------------------------------------

const Text = forwardRef<TextRef, TextProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;

  return <Component ref={ref} {...props} />;
});

Text.displayName = 'HeroUINative.Primitive.Label.Text';

export { Root, Text };
