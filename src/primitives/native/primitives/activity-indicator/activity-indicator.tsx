/*
 * Derived from heroui-native/src/primitives/activity-indicator/activity-indicator.tsx at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { forwardRef } from 'react';
import { View } from 'react-native';

import type {
  IndicatorProps,
  IndicatorRef,
  RootProps,
  RootRef,
} from './activity-indicator.types.js';
import * as Slot from '../slot/index.js';

// --------------------------------------------------

const Root = forwardRef<RootRef, RootProps>(
  ({ asChild, isLoading = true, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;

    return (
      <Component
        ref={ref}
        accessible
        accessibilityRole="progressbar"
        accessibilityState={{ busy: isLoading }}
        {...props}
      />
    );
  }
);

Root.displayName = 'HeroUINative.Primitive.ActivityIndicator.Root';

// --------------------------------------------------

const Indicator = forwardRef<IndicatorRef, IndicatorProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;

    return (
      <Component
        ref={ref}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        {...props}
      />
    );
  }
);

Indicator.displayName = 'HeroUINative.Primitive.ActivityIndicator.Indicator';

export { Indicator, Root };
