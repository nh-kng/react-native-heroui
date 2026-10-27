/*
 * Derived from heroui-native/src/helpers/internal/contexts/form-field-context.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { createContext } from '../utils/create-context.js';

/**
 * Combined context value for form field state and layout (shared across form field components).
 *
 * Providers: TextField, SearchField, ControlField, RadioGroup.
 * Consumers: Label, Description, FieldError, Input.
 */
export interface FormFieldContextValue {
  /**
   * Whether the form field is required
   */
  isRequired: boolean;
  /**
   * Whether the form field is disabled
   */
  isDisabled: boolean;
  /**
   * Whether the form field is in an invalid state
   */
  isInvalid: boolean;
  /**
   * When true, child components (Label, Description, FieldError) apply
   * additional horizontal padding (`px-1.5`) for consistent field layout.
   *
   * Set to `true` by container components like TextField and SearchField.
   */
  hasFieldPadding: boolean;
}

const [FormFieldProvider, useFormField] = createContext<FormFieldContextValue>({
  name: 'FormFieldContext',
  strict: false,
});

export { FormFieldProvider, useFormField };
