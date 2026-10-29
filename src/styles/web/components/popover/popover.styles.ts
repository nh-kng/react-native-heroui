/*
 * Derived from heroui-react/packages/styles/src/components/popover/popover.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const popoverVariants = tv({
  slots: {
    base: "popover__content",
    dialog: "popover__dialog",
    heading: "popover__label",
    trigger: "popover__trigger",
  },
});

export type PopoverVariants = VariantProps<typeof popoverVariants>;
