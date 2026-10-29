import {
  Children,
  createContext,
  isValidElement,
  use,
  forwardRef,
  type ComponentRef,
  type Ref,
} from 'react';

import type {
  TabsProps,
  TabsListProps,
  TabsTabProps,
  TabsIndicatorProps,
  TabsPanelProps,
} from './tabs.types.js';
import * as W from '../../primitives/web/components/tabs/index.js';
import { useControllableValue } from '../shared/use-controllable-value.js';
const IndicatorOptions = createContext<
  (TabsIndicatorProps & { ref?: Ref<ComponentRef<typeof W.Tabs.Indicator>> }) | undefined
>(undefined);
export type * from './tabs.types.js';

export type TabsRootRef = ComponentRef<typeof W.Tabs>;
const TabsRoot = forwardRef<TabsRootRef, TabsProps>(function TabsRoot(
  { children, className, value, defaultValue, onValueChange, webProps, nativeProps },
  ref
) {
  const Target = W.Tabs;
  const [current, change] = useControllableValue(value, defaultValue ?? '', onValueChange);
  return (
    <Target
      {...webProps}
      ref={ref}
      className={className}
      selectedKey={current}
      onSelectionChange={(key) => change(String(key))}>
      {children}
    </Target>
  );
});

export type TabsListRef = ComponentRef<typeof W.Tabs.List>;
const TabsList = forwardRef<TabsListRef, TabsListProps>(function TabsList(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = W.Tabs.List;
  const elements = Children.toArray(children);
  const marker = elements.find((child) => isValidElement(child) && child.type === TabsIndicator);
  const options = isValidElement<TabsIndicatorProps & { ref?: Ref<TabsIndicatorRef> }>(marker)
    ? marker.props
    : undefined;
  return (
    <IndicatorOptions value={options}>
      <W.Tabs.ListContainer>
        <Target {...webProps} ref={ref} className={className}>
          {elements.filter((child) => !isValidElement(child) || child.type !== TabsIndicator)}
        </Target>
      </W.Tabs.ListContainer>
    </IndicatorOptions>
  );
});

export type TabsTabRef = ComponentRef<typeof W.Tabs.Tab>;
const TabsTab = forwardRef<TabsTabRef, TabsTabProps>(function TabsTab(
  { children, className, value, isDisabled, webProps, nativeProps },
  ref
) {
  const Target = W.Tabs.Tab;
  const indicator = use(IndicatorOptions);
  return (
    <Target {...webProps} ref={ref} className={className} id={value} isDisabled={isDisabled}>
      {children}
      <TabsIndicator {...indicator} />
    </Target>
  );
});

export type TabsIndicatorRef = ComponentRef<typeof W.Tabs.Indicator>;
const TabsIndicator = forwardRef<TabsIndicatorRef, TabsIndicatorProps>(function TabsIndicator(
  { children, className, webProps, nativeProps },
  ref
) {
  const Target = W.Tabs.Indicator;
  return (
    <Target {...webProps} ref={ref} className={className}>
      {children}
    </Target>
  );
});

export type TabsPanelRef = ComponentRef<typeof W.Tabs.Panel>;
const TabsPanel = forwardRef<TabsPanelRef, TabsPanelProps>(function TabsPanel(
  { children, className, value, webProps, nativeProps },
  ref
) {
  const Target = W.Tabs.Panel;
  return (
    <Target {...webProps} ref={ref} className={className} id={value}>
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
