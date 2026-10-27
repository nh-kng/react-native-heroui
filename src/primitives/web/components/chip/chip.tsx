/*
 * Derived from heroui-react/packages/react/src/components/chip/chip.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import type {ReactNode} from "react";
import React, {createContext, use} from "react";

import type {ChipVariants} from '../../../../styles/web/components/chip/chip.styles.js';
import {chipVariants} from '../../../../styles/web/components/chip/chip.styles.js';
import {composeSlotClassName} from "../../utils/compose.js";
import type {DOMRenderProps} from "../../utils/dom.js";
import {dom} from "../../utils/dom.js";

/* -------------------------------------------------------------------------------------------------
 * Chip Context
 * -----------------------------------------------------------------------------------------------*/
type ChipContext = {
  slots?: ReturnType<typeof chipVariants>;
};

const ChipContext = createContext<ChipContext>({});

/* -------------------------------------------------------------------------------------------------
 * Chip Root
 * -----------------------------------------------------------------------------------------------*/
interface ChipRootProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children: ReactNode;
  className?: string;
  /** Chip color. */
  color?: ChipVariants["color"];
  /** Chip size. */
  size?: ChipVariants["size"];
  /** Chip variant. */
  variant?: ChipVariants["variant"];
}

const ChipRoot = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  color,
  size,
  variant,
  ...props
}: ChipRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ChipRootProps<E>>) => {
  const slots = React.useMemo(() => chipVariants({color, size, variant}), [color, size, variant]);

  const chipChildren = React.useMemo(() => {
    if (typeof children === "string" || typeof children === "number") {
      return <ChipLabel>{children}</ChipLabel>;
    }

    return children;
  }, [children]);

  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <ChipContext value={contextValue}>
      <dom.span
        {...(props as any)}
        className={composeSlotClassName(slots.base, className)}
        data-slot="chip"
      >
        {chipChildren}
      </dom.span>
    </ChipContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Chip Label
 * -----------------------------------------------------------------------------------------------*/
interface ChipLabelProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const ChipLabel = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: ChipLabelProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ChipLabelProps<E>>) => {
  const {slots} = use(ChipContext);

  return (
    <dom.span
      className={composeSlotClassName(slots?.label, className)}
      data-slot="chip-label"
      {...(props as any)}
    >
      {children}
    </dom.span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ChipRoot, ChipLabel};

export type {ChipRootProps, ChipLabelProps};
