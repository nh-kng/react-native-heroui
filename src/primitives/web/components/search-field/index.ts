/*
 * Derived from heroui-react/packages/react/src/components/search-field/index.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {ComponentProps} from "react";

import {
  SearchFieldClearButton,
  SearchFieldGroup,
  SearchFieldInput,
  SearchFieldRoot,
  SearchFieldSearchIcon,
} from "./search-field.js";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const SearchField = Object.assign(SearchFieldRoot, {
  Root: SearchFieldRoot,
  Group: SearchFieldGroup,
  Input: SearchFieldInput,
  SearchIcon: SearchFieldSearchIcon,
  ClearButton: SearchFieldClearButton,
});

export type SearchField = {
  Props: ComponentProps<typeof SearchFieldRoot>;
  RootProps: ComponentProps<typeof SearchFieldRoot>;
  GroupProps: ComponentProps<typeof SearchFieldGroup>;
  InputProps: ComponentProps<typeof SearchFieldInput>;
  SearchIconProps: ComponentProps<typeof SearchFieldSearchIcon>;
  ClearButtonProps: ComponentProps<typeof SearchFieldClearButton>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  SearchFieldClearButton,
  SearchFieldGroup,
  SearchFieldInput,
  SearchFieldRoot,
  SearchFieldSearchIcon,
};

export type {
  SearchFieldRootProps,
  SearchFieldRootProps as SearchFieldProps,
  SearchFieldGroupProps,
  SearchFieldInputProps,
  SearchFieldSearchIconProps,
  SearchFieldClearButtonProps,
} from "./search-field.js";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {searchFieldVariants} from "../../../../styles/web/index.js";

export type {SearchFieldVariants} from "../../../../styles/web/index.js";
