/*
 * Derived from heroui-react/packages/react/src/components/tag-group/tag-group.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import type {ComponentPropsWithRef} from "react";
import {createContext, use, useMemo} from "react";
import {
  TagGroup as TagGroupPrimitive,
  TagList as TagListPrimitive,
} from "react-aria-components/TagGroup";

import {tagGroupVariants} from "../../../../styles/web/index.js";
import {composeTwRenderProps} from "../../utils/compose.js";
import {FieldSlotsGate} from "../../utils/field-slots-gate.js";
import type {TagVariants} from "../tag/index.js";

/* -------------------------------------------------------------------------------------------------
 * TagGroup Context
 * -----------------------------------------------------------------------------------------------*/
type TagGroupContext = {
  slots?: ReturnType<typeof tagGroupVariants>;
  size?: TagVariants["size"];
  variant?: TagVariants["variant"];
};

const TagGroupContext = createContext<TagGroupContext>({});

/* -------------------------------------------------------------------------------------------------
 * TagGroup Root
 * -----------------------------------------------------------------------------------------------*/
type TagGroupRootProps = ComponentPropsWithRef<typeof TagGroupPrimitive> & {
  size?: TagVariants["size"];
  variant?: TagVariants["variant"];
};

const TagGroupRoot = ({children, className, size, variant, ...restProps}: TagGroupRootProps) => {
  const slots = useMemo(() => tagGroupVariants(), []);
  const contextValue = useMemo(() => ({slots, size, variant}), [slots, size, variant]);

  return (
    <FieldSlotsGate>
      <TagGroupContext value={contextValue}>
        <TagGroupPrimitive className={slots.base({className})} data-slot="tag-group" {...restProps}>
          {children}
        </TagGroupPrimitive>
      </TagGroupContext>
    </FieldSlotsGate>
  );
};

/* -------------------------------------------------------------------------------------------------
 * TagGroup List
 * -----------------------------------------------------------------------------------------------*/
type TagGroupListProps<T extends object> = ComponentPropsWithRef<typeof TagListPrimitive<T>> & {};

const TagGroupList = <T extends object>({
  children,
  className,
  ...restProps
}: TagGroupListProps<T>) => {
  const {slots} = use(TagGroupContext);

  return (
    <TagListPrimitive
      className={composeTwRenderProps(className, slots?.list())}
      data-slot="tag-group-list"
      {...restProps}
    >
      {children}
    </TagListPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TagGroupRoot, TagGroupList, TagGroupContext};

export type {TagGroupRootProps, TagGroupListProps};
