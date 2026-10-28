import type * as Web from '../../build/web/index.web.js';
import type * as Native from '../../build/native/index.native.js';

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type Assert<T extends true> = T;
export type SharedContracts = [
  Assert<Equal<Web.PressableFeedbackProps, Native.PressableFeedbackProps>>,
  Assert<Equal<Web.PressableFeedbackScaleProps, Native.PressableFeedbackScaleProps>>,
  Assert<Equal<Web.PressableFeedbackHighlightProps, Native.PressableFeedbackHighlightProps>>,
  Assert<Equal<Web.PressableFeedbackRippleProps, Native.PressableFeedbackRippleProps>>,
  Assert<Equal<Web.ButtonProps, Native.ButtonProps>>,
  Assert<Equal<Web.CardProps, Native.CardProps>>,
  Assert<Equal<Web.ChipProps, Native.ChipProps>>,
  Assert<Equal<Web.InputProps, Native.InputProps>>,
  Assert<Equal<Web.TextFieldProps, Native.TextFieldProps>>,
  Assert<Equal<Web.LabelProps, Native.LabelProps>>,
  Assert<Equal<Web.DescriptionProps, Native.DescriptionProps>>,
  Assert<Equal<Web.FieldErrorProps, Native.FieldErrorProps>>,
  Assert<Equal<Web.TypographyProps, Native.TypographyProps>>,
  Assert<Equal<Web.HeroUIProviderProps, Native.HeroUIProviderProps>>,
];

// @ts-expect-error Root press handling cannot be replaced through platform props.
export const invalidFeedbackPress: Web.PressableFeedbackProps = { webProps: { onPress: () => {} } };
export const invalidFeedbackAnimation: Native.PressableFeedbackProps = {
  // @ts-expect-error Root animation is owned by the shared contract.
  nativeProps: { animation: false },
};
// @ts-expect-error DOM refs cannot be smuggled through platform props.
export const invalidFeedbackRef: Web.PressableFeedbackProps = { webProps: { ref: null } };
export const invalidFeedbackDisabled: Native.PressableFeedbackProps = {
  // @ts-expect-error Native disabled state is owned by the shared contract.
  nativeProps: { isDisabled: false },
};
export const invalidFeedbackAccessibility: Native.PressableFeedbackProps = {
  // @ts-expect-error Native disabled accessibility state is owned by the shared contract.
  nativeProps: { accessibilityState: { disabled: false } },
};
export const invalidFeedbackAsChild: Native.PressableFeedbackProps = {
  // @ts-expect-error A different native host would change the declared ref contract.
  nativeProps: { asChild: true },
};

// @ts-expect-error Loading is owned by the shared contract.
export const invalidLoadingOverride: Web.ButtonProps = { webProps: { isLoading: true } };
export const invalidBusyOverride: Native.ButtonProps = {
  // @ts-expect-error Native busy/disabled accessibility state is owned by Button.
  nativeProps: { accessibilityState: { busy: true } },
};
// @ts-expect-error Shared chip size cannot be overridden inside platform props.
export const invalidChipSize: Web.ChipProps = { webProps: { size: 'lg' } };
// @ts-expect-error Ref targets remain platform-specific.
export const invalidChipRef: Native.ChipProps = { webProps: { ref: null } };
export const invalidEditableOverride: Native.InputProps = {
  isDisabled: true,
  // @ts-expect-error Native editability is owned by the shared disabled state.
  nativeProps: { editable: true },
};
export const invalidReadOnlyOverride: Native.InputProps = {
  isDisabled: true,
  // @ts-expect-error React Native readOnly also overrides the computed editable state.
  nativeProps: { readOnly: false },
};
