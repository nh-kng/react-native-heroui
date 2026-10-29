// Entries track upstream examples that require APIs outside the public adapter.
export const limitations: Readonly<Record<string, string>> = {
  'accordion-render-function':
    'The adapter accepts ReactNode children and omits the upstream render callback.',
  'avatar-custom-image-component':
    'The upstream demo composes Next.js Image with asChild. Avatar.Image owns its image element and accepts src and alt.',
  'button-render-function':
    'The DOM render override is web-specific; there is no shared custom-element rendering contract.',
  'button-ripple-effect':
    'The upstream demo uses the external DOM-only m3-ripple custom element. See PressableFeedback for the adapter ripple API.',
  'checkbox-render-props':
    'The public Checkbox children type is ReactNode, without upstream render-state callbacks.',
  'checkbox-render-function': 'The adapter omits the upstream render callback.',
  'checkbox-indeterminate':
    'Indeterminate state is available through webProps.isIndeterminate; the native adapter has no equivalent state.',
  'input-group-with-copy-suffix':
    'The upstream example uses the browser clipboard API. The example app has no cross-platform clipboard dependency.',
  'input-group-with-icon-prefix-and-copy-suffix':
    'The upstream example uses the browser clipboard API. The example app has no cross-platform clipboard dependency.',
  'input-group-with-keyboard-shortcut':
    'The upstream keyboard shortcut requires DOM refs and document keyboard events.',
  'input-group-with-textarea':
    'InputGroup exposes Input, Prefix, and Suffix; the upstream TextArea compound part is not exported by the adapter.',
  'popover-render-function': 'The adapter omits the upstream render callback.',
  'radio-group-custom-indicator':
    'The adapter owns the item control and indicator; a custom indicator compound part is not exported.',
  'radio-group-render-function': 'The adapter omits the upstream render callback.',
  'search-field-with-keyboard-shortcut':
    'The upstream shortcut uses a DOM input ref and window keyboard events.',
  'search-field-render-function': 'The adapter omits the upstream render callback.',
  'select-multiple-select':
    'The public Select contract supports one string value and single selection only.',
  'select-controlled-multiple':
    'The public Select contract supports one string value and single selection only.',
  'select-with-sections': 'The adapter does not export ListBox section and heading compound parts.',
  'select-custom-indicator':
    'Select.Trigger owns the upstream indicator; the adapter does not export an indicator override.',
  'select-custom-value':
    'Select.Value accepts a placeholder, without children or a custom value renderer.',
  'select-render-function': 'The adapter omits the upstream render callback.',
  'separator-render-function': 'The adapter omits the upstream render callback.',
  'skeleton-single-shimmer':
    'The upstream Skeleton compound grouping API is not exported; independent placeholders do not reproduce one shared shimmer.',
  'slider-render-function': 'The adapter omits the upstream render callback.',
  'switch-sizes':
    'The upstream React size prop has no native equivalent in the current Switch contract.',
  'switch-render-props':
    'The public Switch children type is ReactNode, without upstream render-state callbacks.',
  'switch-render-function': 'The adapter omits the upstream render callback.',
  'tabs-with-separator': 'The adapter does not export Tabs.Separator.',
  'tabs-render-function': 'The adapter omits the upstream render callback.',
  'tag-group-sizes':
    'The native tag group has no size prop corresponding to the upstream React sizes.',
  'tag-group-variants':
    'The native tag group has no variant prop corresponding to the upstream React variants.',
  'tag-group-with-error-message':
    'The upstream ErrorMessage component is not exported by this package. FieldError is a field-context component.',
  'tag-group-render-function': 'The adapter omits the upstream render callback.',
  'textfield-render-function':
    'The DOM render override is web-specific; there is no shared custom-element rendering contract.',
  'toast-placements':
    'useToast exposes show, dismiss, and dismissAll; placement belongs to the provider-owned hosts.',
  'toast-expanded': 'The public notification manager does not expose expanded-stack configuration.',
  'toast-custom-indicator': 'ToastOptions does not accept a custom indicator.',
  'toast-custom-toast':
    'ToastOptions does not accept a custom renderer. Direct Toast roots require platform lifecycle props.',
  'toast-promise': 'The public manager has no promise or update API.',
  'toast-callbacks': 'ToastOptions does not expose onClose or other lifecycle callbacks.',
  'toast-custom-queue': 'The public manager does not expose custom queues.',
  'toast-custom-styles':
    'The provider owns managed toast rendering; ToastOptions has no className option.',
  'typography-render-props':
    'The public Typography children type is ReactNode; the upstream polymorphic DOM render override is web-specific.',
};
