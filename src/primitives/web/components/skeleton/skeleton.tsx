/*
 * Derived from heroui-react/packages/react/src/components/skeleton/skeleton.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import React from "react";

import type {SkeletonVariants} from "../../../../styles/web/index.js";
import {skeletonVariants} from "../../../../styles/web/index.js";
import {useCSSVariable} from "../../hooks/use-css-variable.js";
import type {DOMRenderProps} from "../../utils/dom.js";
import {dom} from "../../utils/dom.js";

/* -------------------------------------------------------------------------------------------------
 * Skeleton Root
 * -----------------------------------------------------------------------------------------------*/
interface SkeletonRootProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  className?: string;
  /** Animation type. */
  animationType?: SkeletonVariants["animationType"];
}

const SkeletonRoot = <E extends keyof React.JSX.IntrinsicElements = "div">({
  animationType,
  className,
  ...props
}: SkeletonRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SkeletonRootProps<E>>) => {
  // Use the new hook to get CSS variable value with SSR support
  const resolvedAnimationType = useCSSVariable("--skeleton-animation", animationType);
  const slots = React.useMemo(
    () =>
      skeletonVariants({
        animationType: resolvedAnimationType as SkeletonVariants["animationType"],
      }),
    [resolvedAnimationType],
  );

  return <dom.div className={slots.base({className})} {...(props as any)} />;
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SkeletonRoot};

export type {SkeletonRootProps};
