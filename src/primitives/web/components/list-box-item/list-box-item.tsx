/*
 * Derived from heroui-react/packages/react/src/components/list-box-item/list-box-item.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import type {ComponentPropsWithRef} from "react";
import React, {createContext, use} from "react";
import type {ListBoxItemRenderProps} from "react-aria-components/ListBox";
import {ListBoxItem as ListBoxItemPrimitive} from "react-aria-components/ListBox";

import {listboxItemVariants} from "../../../../styles/web/index.js";
import type {ListBoxItemVariants} from "../../../../styles/web/index.js";
import type {DOMRenderProps} from "../../utils/dom.js";
import {dom} from "../../utils/dom.js";
import {composeSlotClassName, composeTwRenderProps} from "../../utils/index.js";

/* -------------------------------------------------------------------------------------------------
 * ListBox Item Context
 * -----------------------------------------------------------------------------------------------*/
interface ListBoxItemContext {
  slots?: ReturnType<typeof listboxItemVariants>;
  state?: ListBoxItemRenderProps;
}

const ListBoxItemContext = createContext<ListBoxItemContext>({});

/* -------------------------------------------------------------------------------------------------
 * ListBox Item Root
 * -----------------------------------------------------------------------------------------------*/
interface ListBoxItemRootProps
  extends ComponentPropsWithRef<typeof ListBoxItemPrimitive>, ListBoxItemVariants {
  className?: string;
}

const ListBoxItemRoot = ({children, className, variant, ...props}: ListBoxItemRootProps) => {
  const slots = React.useMemo(() => listboxItemVariants({variant}), [variant]);

  return (
    <ListBoxItemPrimitive
      className={composeTwRenderProps(className, slots.item())}
      data-slot="list-box-item"
      {...props}
    >
      {(values) => (
        <ListBoxItemContext value={{slots, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </ListBoxItemContext>
      )}
    </ListBoxItemPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ListBox Item Indicator
 * -----------------------------------------------------------------------------------------------*/
interface ListBoxItemIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: React.ReactNode | ((props: ListBoxItemRenderProps) => React.ReactNode);
  className?: string;
}

const ListBoxItemIndicator = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: ListBoxItemIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ListBoxItemIndicatorProps<E>>) => {
  const {slots, state} = use(ListBoxItemContext);
  const isSelected = state?.isSelected;

  const content =
    typeof children === "function" ? (
      children(state ?? ({} as ListBoxItemRenderProps))
    ) : children ? (
      children
    ) : (
      <svg
        aria-hidden="true"
        data-slot="list-box-item-indicator--checkmark"
        fill="none"
        role="presentation"
        stroke="currentColor"
        strokeDasharray={22}
        strokeDashoffset={isSelected ? 44 : 66}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 17 18"
      >
        <polyline points="1 9 7 14 15 4" />
      </svg>
    );

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName(slots?.indicator, className)}
      data-slot="list-box-item-indicator"
      data-visible={isSelected || undefined}
      {...(props as any)}
    >
      {content}
    </dom.span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ListBoxItemRoot, ListBoxItemIndicator};

export type {ListBoxItemRootProps, ListBoxItemIndicatorProps};
