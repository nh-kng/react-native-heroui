/*
 * Derived from heroui-react/packages/styles/src/components/chip/chip.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type { VariantProps } from 'tailwind-variants';

import { chipClassNames } from '../../../../components/chip/chip.styles.js';
export type ChipVariants = VariantProps<typeof chipClassNames.root>;
export function chipVariants(props: ChipVariants = {}) {
  return {
    base: ({ className }: { className?: string } = {}) => chipClassNames.root({ ...props, className }),
    label: ({ className }: { className?: string } = {}) => chipClassNames.label({ ...props, className }),
  };
}
