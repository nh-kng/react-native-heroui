/*
 * Derived from heroui-react/packages/styles/src/components/disclosure/disclosure.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const disclosureVariants = tv({
  defaultVariants: {},
  slots: {
    base: "disclosure",
    body: "disclosure__body",
    bodyInner: "disclosure__body-inner",
    content: "disclosure__content",
    heading: "disclosure__heading",
    indicator: "disclosure__indicator",
    trigger: "disclosure__trigger",
  },
  variants: {},
});

// Render props that should be excluded from DisclosureVariants (framework-specific)
type DisclosureRenderPropsKeys = "isExpanded" | "isDisabled" | "state";

export type DisclosureVariants = Omit<
  VariantProps<typeof disclosureVariants>,
  DisclosureRenderPropsKeys
>;
