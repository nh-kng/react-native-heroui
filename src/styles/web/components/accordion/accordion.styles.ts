/*
 * Derived from heroui-react/packages/styles/src/components/accordion/accordion.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const accordionVariants = tv({
  slots: {
    base: "accordion__root-container",
    body: "accordion__content",
    bodyInner: "accordion__body-inner",
    heading: "accordion__heading",
    indicator: "accordion__indicator",
    item: "accordion__item",
    panel: "accordion__panel",
    trigger: "accordion__trigger",
  },
  variants: {
    variant: {
      default: {},
      surface: {
        base: "accordion__root-container--variant-surface",
      },
    },
  },
});

// Render props that should be excluded from AccordionVariants (framework-specific)
type DisclosureRenderPropsKeys = "isExpanded" | "isDisabled" | "state";

export type AccordionVariants = Omit<
  VariantProps<typeof accordionVariants>,
  DisclosureRenderPropsKeys
>;
