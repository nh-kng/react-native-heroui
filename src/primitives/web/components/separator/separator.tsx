/*
 * Derived from heroui-react/packages/react/src/components/separator/separator.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import type {ComponentPropsWithRef} from "react";
import {SeparatorContext, Separator as SeparatorPrimitive} from "react-aria-components/Separator";
import {useSlottedContext} from "react-aria-components/slots";

import {separatorVariants} from "../../../../styles/web/index.js";
import type {SeparatorVariants} from "../../../../styles/web/index.js";

/* -------------------------------------------------------------------------------------------------
 * Separator Root
 * -----------------------------------------------------------------------------------------------*/
interface SeparatorRootProps
  extends ComponentPropsWithRef<typeof SeparatorPrimitive>, SeparatorVariants {}

const SeparatorRoot = ({className, orientation, variant, ...props}: SeparatorRootProps) => {
  const context = useSlottedContext(SeparatorContext);
  const resolvedOrientation = orientation ?? context?.orientation ?? "horizontal";

  return (
    <SeparatorPrimitive
      data-orientation={resolvedOrientation}
      data-slot="separator"
      orientation={resolvedOrientation}
      className={separatorVariants({
        orientation: resolvedOrientation,
        variant,
        className,
      })}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SeparatorRoot};

export type {SeparatorRootProps};
