export const exampleNotes: Readonly<Record<string, string>> = {
  'select-required':
    'Required-field semantics are available through webProps. Native Select has no required-field option.',
  'input-types':
    'The shared numeric keyboard maps to inputMode on web; it does not expose the browser number input spinner.',
  'checkbox-with-description':
    'The adapter owns the inner control composition. Helper text is explicitly associated with aria-describedby on web and an accessibilityHint on native.',
  'checkbox-invalid':
    'The adapter owns the inner control composition. Error text is explicitly associated with aria-describedby on web and an accessibilityHint on native.',
  'spinner-speed':
    'Speed customization uses the documented web animation classes. Native retains the default speed because the public adapter does not export Spinner.Indicator.',
  'select-variants':
    'Web forwards primary and secondary variants. Native uses its default trigger; the native trigger variants are default and unstyled.',
  'select-with-clear-button':
    'A separate clear action resets the shared controlled value; Select.ClearButton is not exported by the adapter.',
  'avatar-variants':
    'Web uses the upstream soft/default variant. Native demonstrates equivalent color treatments with utility classes.',
  'button-social': 'Visual composition only. Authentication is not connected.',
  'button-custom-variants':
    'The custom treatment uses className while retaining the public Button variant contract.',
  'checkbox-form': 'Submission uses local React state in place of HTML FormData.',
  'input-group-password-with-toggle':
    'Input type is set through webProps; native uses secureTextEntry.',
  'radio-group-horizontal': 'Web sets semantic orientation; native uses a horizontal layout.',
  'scroll-shadow-visibility-change':
    'The visibility callback is available on web. Native still demonstrates scrolling and shadows.',
  'select-asynchronous-loading':
    'Data loading is simulated locally, including an empty state and a failure with retry.',
  'separator-variants':
    'Web exposes default, secondary, and tertiary variants. Native exposes thin/thick and thickness; this preview demonstrates three native thicknesses.',
  'switch-form': 'Preferences are saved in local React state for this demo.',
  'tabs-vertical':
    'Vertical orientation is supported by webProps. Native uses the existing horizontal tabs behavior.',
  'tabs-secondary-vertical':
    'Web demonstrates a vertical secondary variant. Native demonstrates the horizontal secondary variant.',
  'tabs-vertical-alignment':
    'Web supports vertical orientation and start alignment. Native uses its horizontal tabs behavior.',
  'tabs-overflow':
    'Web supplies the upstream overflow controls. Native uses a horizontal ScrollView around the public tab list.',
  'tag-group-with-list-data':
    'The list is managed with React state instead of the upstream useListData utility.',
  'textarea-rows':
    'Web demonstrates rows and vertical resizing. Native sets numberOfLines; browser-style drag resizing is unavailable.',
  'typography-prose':
    'Rich text is composed with the public typography primitives; the adapter does not expose the web prose wrapper.',
};
