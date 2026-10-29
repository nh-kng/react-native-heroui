/*
 * Derived from heroui-react/packages/react/src/components/list-box/list-box.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import type {ComponentPropsWithRef} from "react";
import React from "react";
import {ListBox as ListBoxPrimitive} from "react-aria-components/ListBox";

import {listboxVariants} from "../../../../styles/web/index.js";
import type {ListBoxVariants} from "../../../../styles/web/index.js";
import {composeTwRenderProps} from "../../utils/index.js";

/* -------------------------------------------------------------------------------------------------
 * ListBox Root
 * -----------------------------------------------------------------------------------------------*/
interface ListBoxRootProps<T extends object>
  extends ComponentPropsWithRef<typeof ListBoxPrimitive<T>>, ListBoxVariants {
  className?: string;
}

function ListBoxRoot<T extends object>({className, variant, ...props}: ListBoxRootProps<T>) {
  const styles = React.useMemo(() => listboxVariants({variant}), [variant]);

  return (
    <ListBoxPrimitive
      className={composeTwRenderProps(className, styles)}
      data-slot="list-box"
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ListBoxRoot};

export type {ListBoxRootProps};
