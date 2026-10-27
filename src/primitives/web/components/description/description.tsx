/*
 * Derived from heroui-react/packages/react/src/components/description/description.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import type {ComponentPropsWithRef} from "react";
import type {TextProps} from "react-aria-components/Text";
import {Text} from "react-aria-components/Text";

import {descriptionVariants} from '../../../../styles/web/components/description/description.styles.js';
import type {DescriptionVariants} from '../../../../styles/web/components/description/description.styles.js';
import {useHasTextSlot} from "../../utils/use-has-text-slot.js";

/* -------------------------------------------------------------------------------------------------
 * Description Root
 * -----------------------------------------------------------------------------------------------*/
interface DescriptionRootProps
  extends ComponentPropsWithRef<typeof Text>, TextProps, DescriptionVariants {}

const DescriptionRoot = ({children, className, ...rest}: DescriptionRootProps) => {
  if (!useHasTextSlot("description")) {
    return null;
  }

  return (
    <Text
      className={descriptionVariants({className})}
      data-slot="description"
      slot="description"
      {...rest}
    >
      {children}
    </Text>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {DescriptionRoot};

export type {DescriptionRootProps};
