/*
 * Derived from heroui-react/packages/react/src/utils/compose.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import {composeRenderProps} from "react-aria-components/composeRenderProps";
import {cx} from "tailwind-variants";

// Re-export utility classes from @heroui/styles for backward compatibility
export {disabledClasses, focusRingClasses, ariaDisabledClasses} from "../../../styles/web/index.js";

function composeTwRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tailwind?: string | ((v: T) => string | undefined),
): string | ((v: T) => string) {
  return composeRenderProps(className, (className, renderProps): string => {
    const tw = typeof tailwind === "function" ? (tailwind(renderProps) ?? "") : (tailwind ?? "");
    const cls = className ?? "";

    return cx(tw, cls) ?? "";
  });
}

export const composeSlotClassName = (
  slotFn: ((args?: {className?: string; [key: string]: any}) => string) | undefined,
  className?: string,
  variants?: Record<string, any>,
): string | undefined => {
  return typeof slotFn === "function" ? slotFn({...(variants ?? {}), className}) : className;
};

export {composeTwRenderProps};
