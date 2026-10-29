/*
 * Derived from heroui-native/src/components/tabs/tabs.constants.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { WithSpringConfig } from 'react-native-reanimated';

export const DISPLAY_NAME = {
  ROOT: 'HeroUINative.Tabs.Root',
  LIST: 'HeroUINative.Tabs.List',
  LIST_BACKGROUND: 'HeroUINative.Tabs.ListBackground',
  SCROLL_VIEW: 'HeroUINative.Tabs.ScrollView',
  TRIGGER: 'HeroUINative.Tabs.Trigger',
  LABEL: 'HeroUINative.Tabs.Label',
  INDICATOR: 'HeroUINative.Tabs.Indicator',
  SEPARATOR: 'HeroUINative.Tabs.Separator',
  CONTENT: 'HeroUINative.Tabs.Content',
} as const;

export const DEFAULT_INDICATOR_SPRING_CONFIG: WithSpringConfig = {
  stiffness: 1200,
  damping: 120,
};
