/*
 * Derived from heroui-react/packages/styles/src/components/link/link.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const linkVariants = tv({
  slots: {
    base: "link",
    icon: "link__icon",
  },
});

// Render props that should be excluded from LinkVariants (framework-specific)
type LinkRenderPropsKeys =
  "isCurrent" | "isHovered" | "isPressed" | "isFocused" | "isFocusVisible" | "isDisabled";

export type LinkVariants = Omit<VariantProps<typeof linkVariants>, LinkRenderPropsKeys>;
