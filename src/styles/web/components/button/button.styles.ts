/*
 * Derived from heroui-react/packages/styles/src/components/button/button.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { buttonClassNames } from '../../../../components/button/button.styles.js';

const layout = tv({ variants: { fullWidth: { true: 'w-full' } } });
export type ButtonVariants = VariantProps<typeof buttonClassNames.root> & { fullWidth?: boolean };
export function buttonVariants({ fullWidth, ...props }: ButtonVariants = {}) {
  return [buttonClassNames.root(props), buttonClassNames.label(props), layout({ fullWidth })].filter(Boolean).join(' ');
}
