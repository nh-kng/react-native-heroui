/*
 * Derived from heroui-react/packages/react/src/components/tabs/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {
  Tab,
  TabIndicator,
  TabList,
  TabListContainer,
  TabPanel,
  TabSeparator,
  TabsRoot,
} from "./tabs.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  ListContainer: TabListContainer,
  List: TabList,
  Tab,
  Indicator: TabIndicator,
  Separator: TabSeparator,
  Panel: TabPanel,
});

export type Tabs = {
  Props: ComponentProps<typeof TabsRoot>;
  RootProps: ComponentProps<typeof TabsRoot>;
  ListContainer: ComponentProps<typeof TabListContainer>;
  ListProps: ComponentProps<typeof TabList>;
  TabProps: ComponentProps<typeof Tab>;
  IndicatorProps: ComponentProps<typeof TabIndicator>;
  SeparatorProps: ComponentProps<typeof TabSeparator>;
  PanelProps: ComponentProps<typeof TabPanel>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {TabsRoot, TabListContainer, TabList, Tab, TabIndicator, TabSeparator, TabPanel};

export type {
  TabsRootProps,
  TabsRootProps as TabsProps,
  TabListContainerProps,
  TabListProps,
  TabProps,
  TabIndicatorProps,
  TabSeparatorProps,
  TabPanelProps,
} from "./tabs.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {tabsVariants} from "../../../../styles/web/index.js";

export type {TabsVariants} from "../../../../styles/web/index.js";
