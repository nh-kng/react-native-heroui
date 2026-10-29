/*
 * Derived from heroui-react/packages/styles/src/components/tabs/tabs.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const tabsVariants = tv({
  defaultVariants: {
    align: "center",
    variant: "primary",
  },
  slots: {
    base: "tabs__root",
    scrollNext: "tabs__list-container__scroll-next",
    scrollPrev: "tabs__list-container__scroll-prev",
    scroller: "tabs__list-container__scroller",
    separator: "tabs__separator",
    tab: "tabs__trigger",
    tabIndicator: "tabs__indicator",
    tabList: "tabs__list",
    tabListContainer: "tabs__list-container",
    tabPanel: "tabs__panel",
  },
  variants: {
    align: {
      center: {}, // No class as the base already centers tab content
      end: {
        base: "tabs--align-end",
      },
      start: {
        base: "tabs--align-start",
      },
    },
    variant: {
      primary: {},
      secondary: {
        base: "tabs--secondary",
      },
    },
  },
});

// Render props that should be excluded from TabsVariants (framework-specific)
type TabsRenderPropsKeys = "selectedKey";

export type TabsVariants = Omit<VariantProps<typeof tabsVariants>, TabsRenderPropsKeys>;
