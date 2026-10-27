/*
 * Derived from heroui-react/packages/react/src/components/surface/surface.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import type {ReactNode} from "react";
import React, {createContext} from "react";

import type {SurfaceVariants} from '../../../../styles/web/components/surface/surface.styles.js';
import {surfaceVariants} from '../../../../styles/web/components/surface/surface.styles.js';
import type {DOMRenderProps} from "../../utils/dom.js";
import {dom} from "../../utils/dom.js";

/* ------------------------------------------------------------------------------------------------
 * Surface Context
 * --------------------------------------------------------------------------------------------- */
type SurfaceContext = {
  variant?: SurfaceVariants["variant"];
};

const SurfaceContext = createContext<SurfaceContext>({});

/* ------------------------------------------------------------------------------------------------
 * Surface Root
 * --------------------------------------------------------------------------------------------- */
interface SurfaceRootProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children: ReactNode;
  className?: string;
  /** Visual variant. @default "default" */
  variant?: SurfaceVariants["variant"];
}

const SurfaceRoot = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  variant = "default",
  ...rest
}: SurfaceRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SurfaceRootProps<E>>) => {
  const contextValue = React.useMemo(() => ({variant}), [variant]);

  return (
    <SurfaceContext value={contextValue}>
      <dom.div
        className={surfaceVariants({variant, className})}
        data-slot="surface"
        {...(rest as any)}
      >
        {children}
      </dom.div>
    </SurfaceContext>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Exports
 * --------------------------------------------------------------------------------------------- */
export {SurfaceRoot, SurfaceContext};

export type {SurfaceRootProps};
