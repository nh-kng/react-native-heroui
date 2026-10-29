import * as React from 'react';
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

export type AddedSharedContracts = [
  Assert<Equal<Web.AccordionProps, Native.AccordionProps>>,
  Assert<Equal<Web.AccordionItemProps, Native.AccordionItemProps>>,
  Assert<Equal<Web.AccordionTriggerProps, Native.AccordionTriggerProps>>,
  Assert<Equal<Web.AccordionIndicatorProps, Native.AccordionIndicatorProps>>,
  Assert<Equal<Web.AccordionContentProps, Native.AccordionContentProps>>,
  Assert<Equal<Web.AlertProps, Native.AlertProps>>,
  Assert<Equal<Web.AlertIndicatorProps, Native.AlertIndicatorProps>>,
  Assert<Equal<Web.AlertContentProps, Native.AlertContentProps>>,
  Assert<Equal<Web.AlertTitleProps, Native.AlertTitleProps>>,
  Assert<Equal<Web.AlertDescriptionProps, Native.AlertDescriptionProps>>,
  Assert<Equal<Web.AvatarProps, Native.AvatarProps>>,
  Assert<Equal<Web.AvatarImageProps, Native.AvatarImageProps>>,
  Assert<Equal<Web.AvatarFallbackProps, Native.AvatarFallbackProps>>,
  Assert<Equal<Web.CheckboxProps, Native.CheckboxProps>>,
  Assert<Equal<Web.CheckboxIndicatorProps, Native.CheckboxIndicatorProps>>,
  Assert<Equal<Web.CloseButtonProps, Native.CloseButtonProps>>,
  Assert<Equal<Web.InputGroupProps, Native.InputGroupProps>>,
  Assert<Equal<Web.InputGroupInputProps, Native.InputGroupInputProps>>,
  Assert<Equal<Web.InputGroupPrefixProps, Native.InputGroupPrefixProps>>,
  Assert<Equal<Web.InputGroupSuffixProps, Native.InputGroupSuffixProps>>,
  Assert<Equal<Web.InputOTPProps, Native.InputOTPProps>>,
  Assert<Equal<Web.InputOTPGroupProps, Native.InputOTPGroupProps>>,
  Assert<Equal<Web.InputOTPSlotProps, Native.InputOTPSlotProps>>,
  Assert<Equal<Web.InputOTPSeparatorProps, Native.InputOTPSeparatorProps>>,
  Assert<Equal<Web.PopoverProps, Native.PopoverProps>>,
  Assert<Equal<Web.PopoverTriggerProps, Native.PopoverTriggerProps>>,
  Assert<Equal<Web.PopoverContentProps, Native.PopoverContentProps>>,
  Assert<Equal<Web.PopoverArrowProps, Native.PopoverArrowProps>>,
  Assert<Equal<Web.RadioGroupProps, Native.RadioGroupProps>>,
  Assert<Equal<Web.RadioGroupItemProps, Native.RadioGroupItemProps>>,
  Assert<Equal<Web.ScrollShadowProps, Native.ScrollShadowProps>>,
  Assert<Equal<Web.SearchFieldProps, Native.SearchFieldProps>>,
  Assert<Equal<Web.SearchFieldGroupProps, Native.SearchFieldGroupProps>>,
  Assert<Equal<Web.SearchFieldInputProps, Native.SearchFieldInputProps>>,
  Assert<Equal<Web.SearchFieldSearchIconProps, Native.SearchFieldSearchIconProps>>,
  Assert<Equal<Web.SearchFieldClearButtonProps, Native.SearchFieldClearButtonProps>>,
  Assert<Equal<Web.SelectProps, Native.SelectProps>>,
  Assert<Equal<Web.SelectTriggerProps, Native.SelectTriggerProps>>,
  Assert<Equal<Web.SelectValueProps, Native.SelectValueProps>>,
  Assert<Equal<Web.SelectContentProps, Native.SelectContentProps>>,
  Assert<Equal<Web.SelectItemProps, Native.SelectItemProps>>,
  Assert<Equal<Web.SeparatorProps, Native.SeparatorProps>>,
  Assert<Equal<Web.SkeletonProps, Native.SkeletonProps>>,
  Assert<Equal<Web.SliderProps, Native.SliderProps>>,
  Assert<Equal<Web.SliderOutputProps, Native.SliderOutputProps>>,
  Assert<Equal<Web.SliderTrackProps, Native.SliderTrackProps>>,
  Assert<Equal<Web.SliderFillProps, Native.SliderFillProps>>,
  Assert<Equal<Web.SliderThumbProps, Native.SliderThumbProps>>,
  Assert<Equal<Web.SpinnerProps, Native.SpinnerProps>>,
  Assert<Equal<Web.SurfaceProps, Native.SurfaceProps>>,
  Assert<Equal<Web.SwitchProps, Native.SwitchProps>>,
  Assert<Equal<Web.SwitchThumbProps, Native.SwitchThumbProps>>,
  Assert<Equal<Web.TabsProps, Native.TabsProps>>,
  Assert<Equal<Web.TabsListProps, Native.TabsListProps>>,
  Assert<Equal<Web.TabsTabProps, Native.TabsTabProps>>,
  Assert<Equal<Web.TabsIndicatorProps, Native.TabsIndicatorProps>>,
  Assert<Equal<Web.TabsPanelProps, Native.TabsPanelProps>>,
  Assert<Equal<Web.TagGroupProps, Native.TagGroupProps>>,
  Assert<Equal<Web.TagGroupListProps, Native.TagGroupListProps>>,
  Assert<Equal<Web.TagGroupItemProps, Native.TagGroupItemProps>>,
  Assert<Equal<Web.TagGroupLabelProps, Native.TagGroupLabelProps>>,
  Assert<Equal<Web.TagGroupRemoveButtonProps, Native.TagGroupRemoveButtonProps>>,
  Assert<Equal<Web.TextAreaProps, Native.TextAreaProps>>,
  Assert<Equal<Web.ToastProps, Native.ToastProps>>,
  Assert<Equal<Web.ToastTitleProps, Native.ToastTitleProps>>,
  Assert<Equal<Web.ToastDescriptionProps, Native.ToastDescriptionProps>>,
  Assert<Equal<Web.ToastActionProps, Native.ToastActionProps>>,
  Assert<Equal<Web.ToastCloseProps, Native.ToastCloseProps>>,
];

// @ts-expect-error Selection belongs to the shared contract.
export const checkboxOverride: Web.CheckboxProps = { webProps: { onChange: () => {} } };
export const switchOverride: Native.SwitchProps = {
  // @ts-expect-error Native accessibility state cannot override shared selection.
  nativeProps: { accessibilityState: { checked: true } },
};
// @ts-expect-error Native editability cannot override shared disabled state.
export const textAreaOverride: Native.TextAreaProps = { nativeProps: { editable: true } };
export const selectOverride: Web.SelectProps = {
  items: [],
  // @ts-expect-error Multiple selection is outside the shared Select contract.
  webProps: { selectionMode: 'multiple' },
};
// @ts-expect-error OTP slots require a zero-based index.
export const missingSlotIndex: Web.InputOTPSlotProps = {};
// @ts-expect-error Unsupported shared spinner size.
export const invalidSpinnerSize: Web.SpinnerProps = { size: 'xl' };
// @ts-expect-error Collection identities are strings.
export const invalidTabValue: Native.TabsTabProps = { value: 1 };

// @ts-expect-error Checked accessibility belongs to the shared selected state.
export const checkedOverride: Native.CheckboxProps = { nativeProps: { 'aria-checked': true } };
export const invalidNativeTextAreaRef: React.ComponentProps<typeof Native.TextArea> = {
  // @ts-expect-error Native focus APIs cannot be replaced with DOM refs.
  ref: React.createRef<HTMLTextAreaElement>(),
};
