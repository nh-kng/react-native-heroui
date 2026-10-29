/*
 * Derived from heroui-react/packages/react/src/components/search-field/search-field.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import type {ComponentPropsWithRef} from "react";
import React, {createContext, use} from "react";
import {Group as GroupPrimitive} from "react-aria-components/Group";
import {Input as InputPrimitive} from "react-aria-components/Input";
import {SearchField as SearchFieldPrimitive} from "react-aria-components/SearchField";

import {searchFieldVariants} from "../../../../styles/web/index.js";
import type {SearchFieldVariants} from "../../../../styles/web/index.js";
import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose.js";
import type {DOMRenderProps} from "../../utils/dom.js";
import {CloseButton} from "../close-button/index.js";
import {IconSearch} from "../icons.js";

/* -------------------------------------------------------------------------------------------------
 * SearchField Context
 * -----------------------------------------------------------------------------------------------*/
type SearchFieldContext = {
  slots?: ReturnType<typeof searchFieldVariants>;
};

const SearchFieldContext = createContext<SearchFieldContext>({});

/* -------------------------------------------------------------------------------------------------
 * SearchField Root
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldRootProps
  extends ComponentPropsWithRef<typeof SearchFieldPrimitive>, SearchFieldVariants {}

const SearchFieldRoot = ({
  children,
  className,
  fullWidth,
  variant,
  ...props
}: SearchFieldRootProps) => {
  const slots = React.useMemo(
    () => searchFieldVariants({fullWidth, variant}),
    [fullWidth, variant],
  );
  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <SearchFieldContext value={contextValue}>
      <SearchFieldPrimitive
        data-slot="search-field"
        {...props}
        className={composeTwRenderProps(className, slots?.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </SearchFieldPrimitive>
    </SearchFieldContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * SearchField Group
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldGroupProps extends ComponentPropsWithRef<typeof GroupPrimitive> {}

const SearchFieldGroup = ({children, className, ...props}: SearchFieldGroupProps) => {
  const {slots} = use(SearchFieldContext);

  return (
    <GroupPrimitive
      className={composeTwRenderProps(className, slots?.group())}
      data-slot="search-field-group"
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </GroupPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * SearchField Input
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldInputProps extends ComponentPropsWithRef<typeof InputPrimitive> {}

const SearchFieldInput = ({className, ...props}: SearchFieldInputProps) => {
  const {slots} = use(SearchFieldContext);

  return (
    <InputPrimitive
      className={composeTwRenderProps(className, slots?.input())}
      data-slot="search-field-input"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * SearchField Search Icon
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldSearchIconProps<
  E extends keyof React.JSX.IntrinsicElements = "svg",
> extends DOMRenderProps<E, undefined> {
  children?: React.ReactNode;
  className?: string;
}

const SearchFieldSearchIcon = <E extends keyof React.JSX.IntrinsicElements = "svg">({
  children,
  className,
  ...props
}: SearchFieldSearchIconProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof SearchFieldSearchIconProps<E>>) => {
  const {slots} = use(SearchFieldContext);

  if (children && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        className?: string;
        "data-slot"?: string;
      }>,
      {
        ...(props as any),
        className: composeSlotClassName(slots?.searchIcon, className),
        "data-slot": "search-field-search-icon",
      },
    );
  }

  return (
    <IconSearch
      className={composeSlotClassName(slots?.searchIcon, className)}
      data-slot="search-field-search-icon"
      {...(props as any)}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * SearchField Clear Button
 * -----------------------------------------------------------------------------------------------*/
interface SearchFieldClearButtonProps extends ComponentPropsWithRef<typeof CloseButton> {}

const SearchFieldClearButton = ({className, ...props}: SearchFieldClearButtonProps) => {
  const {slots} = use(SearchFieldContext);

  return (
    <CloseButton
      className={composeTwRenderProps(className, slots?.clearButton())}
      data-slot="search-field-clear-button"
      slot="clear"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  SearchFieldRoot,
  SearchFieldGroup,
  SearchFieldInput,
  SearchFieldSearchIcon,
  SearchFieldClearButton,
};

export type {
  SearchFieldRootProps,
  SearchFieldGroupProps,
  SearchFieldInputProps,
  SearchFieldSearchIconProps,
  SearchFieldClearButtonProps,
};
