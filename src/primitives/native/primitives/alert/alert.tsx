/*
 * Derived from heroui-native/src/primitives/alert/alert.tsx at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { createContext, forwardRef, useContext, useId } from 'react';
import { Text as RNText, View } from 'react-native';

import type {
  ContentProps,
  ContentRef,
  DescriptionProps,
  DescriptionRef,
  IndicatorProps,
  IndicatorRef,
  RootContext,
  RootProps,
  RootRef,
  TitleProps,
  TitleRef,
} from './alert.types.js';
import * as Slot from '../slot/index.js';

const AlertContext = createContext<(RootContext & { nativeID: string }) | null>(
  null
);

/**
 * Hook to access alert root context.
 * Throws when used outside Alert.Root.
 */
function useRootContext(): RootContext & { nativeID: string } {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error(
      'Alert compound components cannot be rendered outside the Alert component'
    );
  }
  return context;
}

// --------------------------------------------------

const Root = forwardRef<RootRef, RootProps>(
  ({ asChild, id, status = 'default', ...viewProps }, ref) => {
    const generatedId = useId();
    const nativeID = id != null ? String(id) : generatedId;

    const Component = asChild ? Slot.View : View;

    return (
      <AlertContext.Provider value={{ nativeID, status }}>
        <Component
          ref={ref}
          role="alert"
          aria-labelledby={`${nativeID}_label`}
          aria-describedby={`${nativeID}_desc`}
          nativeID={nativeID}
          {...viewProps}
        />
      </AlertContext.Provider>
    );
  }
);

Root.displayName = 'HeroUINative.Primitive.Alert.Root';

// --------------------------------------------------

const Indicator = forwardRef<IndicatorRef, IndicatorProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;

    return (
      <Component ref={ref} role="presentation" aria-hidden {...props} />
    );
  }
);

Indicator.displayName = 'HeroUINative.Primitive.Alert.Indicator';

// --------------------------------------------------

const Content = forwardRef<ContentRef, ContentProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;

    return <Component ref={ref} {...props} />;
  }
);

Content.displayName = 'HeroUINative.Primitive.Alert.Content';

// --------------------------------------------------

const Title = forwardRef<TitleRef, TitleProps>(({ asChild, ...props }, ref) => {
  const { nativeID } = useRootContext();

  const Component = asChild ? Slot.Text : RNText;

  return (
    <Component
      ref={ref}
      role="heading"
      aria-level={2}
      nativeID={`${nativeID}_label`}
      {...props}
    />
  );
});

Title.displayName = 'HeroUINative.Primitive.Alert.Title';

// --------------------------------------------------

const Description = forwardRef<DescriptionRef, DescriptionProps>(
  ({ asChild, ...props }, ref) => {
    const { nativeID } = useRootContext();

    const Component = asChild ? Slot.Text : RNText;

    return <Component ref={ref} nativeID={`${nativeID}_desc`} {...props} />;
  }
);

Description.displayName = 'HeroUINative.Primitive.Alert.Description';

// --------------------------------------------------

export { Content, Description, Indicator, Root, Title, useRootContext };
