import { Children, isValidElement, forwardRef, type ComponentRef } from 'react';

import type {
  TabsProps,
  TabsListProps,
  TabsTabProps,
  TabsIndicatorProps,
  TabsPanelProps,
} from './tabs.types.js';
import * as N from '../../primitives/native/components/tabs/index.js';
import { useControllableValue } from '../shared/use-controllable-value.js';
export type * from './tabs.types.js';

export type TabsRootRef = ComponentRef<typeof N.Tabs>;
const TabsRoot = forwardRef<TabsRootRef, TabsProps>(function TabsRoot(
  { children, className, value, defaultValue, onValueChange, webProps, nativeProps },
  ref
) {
  const Target = N.Tabs;
  const [current, change] = useControllableValue(value, defaultValue ?? '', onValueChange);
  return (
    <Target {...nativeProps} ref={ref} className={className} value={current} onValueChange={change}>
      {children}
    </Target>
  );
});

export type TabsListRef = ComponentRef<typeof N.Tabs.List>;
const TabsList = forwardRef<TabsListRef, TabsListProps>(function TabsList(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = N.Tabs.List;
  return (
    <Target {...nativeProps} ref={ref} className={className}>
      {!Children.toArray(children).some(
        (child) => isValidElement(child) && child.type === TabsIndicator
      ) && <TabsIndicator />}
      {children}
    </Target>
  );
});

export type TabsTabRef = ComponentRef<typeof N.Tabs.Trigger>;
const TabsTab = forwardRef<TabsTabRef, TabsTabProps>(function TabsTab(
  { children, className, value, isDisabled, webProps, nativeProps },
  ref
) {
  const Target = N.Tabs.Trigger;
  return (
    <Target {...nativeProps} ref={ref} className={className} value={value} isDisabled={isDisabled}>
      {children}
    </Target>
  );
});

export type TabsIndicatorRef = ComponentRef<typeof N.Tabs.Indicator>;
const TabsIndicator = forwardRef<TabsIndicatorRef, TabsIndicatorProps>(function TabsIndicator(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = N.Tabs.Indicator;
  return (
    <Target {...nativeProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type TabsPanelRef = ComponentRef<typeof N.Tabs.Content>;
const TabsPanel = forwardRef<TabsPanelRef, TabsPanelProps>(function TabsPanel(
  { children, className, value, webProps, nativeProps },
  ref
) {
  const Target = N.Tabs.Content;
  return (
    <Target {...nativeProps} ref={ref} className={className} value={value}>
      {children}
    </Target>
  );
});

export const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  List: TabsList,
  Tab: TabsTab,
  Indicator: TabsIndicator,
  Panel: TabsPanel,
});
