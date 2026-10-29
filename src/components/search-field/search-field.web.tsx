import { forwardRef, type ComponentRef } from 'react';

import type {
  SearchFieldProps,
  SearchFieldGroupProps,
  SearchFieldInputProps,
  SearchFieldSearchIconProps,
  SearchFieldClearButtonProps,
} from './search-field.types.js';
import * as W from '../../primitives/web/components/search-field/index.js';
import { useControllableValue } from '../shared/use-controllable-value.js';
export type * from './search-field.types.js';

export type SearchFieldRootRef = ComponentRef<typeof W.SearchField>;
const SearchFieldRoot = forwardRef<SearchFieldRootRef, SearchFieldProps>(function SearchFieldRoot(
  {
    children,
    className,
    value,
    defaultValue,
    onChangeText,
    isDisabled,
    isInvalid,
    webProps,
    nativeProps,
  },
  ref
) {
  const Target = W.SearchField;
  const [text, change] = useControllableValue(value, defaultValue ?? '', onChangeText);
  return (
    <Target
      {...webProps}
      ref={ref}
      className={className}
      value={text}
      onChange={change}
      isDisabled={isDisabled}
      isInvalid={isInvalid}>
      {children}
    </Target>
  );
});

export type SearchFieldGroupRef = ComponentRef<typeof W.SearchField.Group>;
const SearchFieldGroup = forwardRef<SearchFieldGroupRef, SearchFieldGroupProps>(
  function SearchFieldGroup({ children, className, webProps, nativeProps }, ref) {
    const Target = W.SearchField.Group;
    return (
      <Target {...webProps} ref={ref} className={className}>
        {children}
      </Target>
    );
  }
);

export type SearchFieldInputRef = ComponentRef<typeof W.SearchField.Input>;
const SearchFieldInput = forwardRef<SearchFieldInputRef, SearchFieldInputProps>(
  function SearchFieldInput({ className, placeholder, webProps, nativeProps }, ref) {
    const Target = W.SearchField.Input;
    return <Target {...webProps} ref={ref} className={className} placeholder={placeholder} />;
  }
);

export type SearchFieldSearchIconRef = ComponentRef<typeof W.SearchField.SearchIcon<'span'>>;
const SearchFieldSearchIcon = forwardRef<SearchFieldSearchIconRef, SearchFieldSearchIconProps>(
  function SearchFieldSearchIcon({ children, className, webProps, nativeProps }, ref) {
    const Target = W.SearchField.SearchIcon<'span'>;
    return (
      <Target {...webProps} ref={ref} className={className}>
        {children}
      </Target>
    );
  }
);

export type SearchFieldClearButtonRef = ComponentRef<typeof W.SearchField.ClearButton>;
const SearchFieldClearButton = forwardRef<SearchFieldClearButtonRef, SearchFieldClearButtonProps>(
  function SearchFieldClearButton({ children, className, webProps, nativeProps }, ref) {
    const Target = W.SearchField.ClearButton;
    return (
      <Target {...webProps} ref={ref} className={className}>
        {children}
      </Target>
    );
  }
);

export const SearchField = Object.assign(SearchFieldRoot, {
  Root: SearchFieldRoot,
  Group: SearchFieldGroup,
  Input: SearchFieldInput,
  SearchIcon: SearchFieldSearchIcon,
  ClearButton: SearchFieldClearButton,
});
