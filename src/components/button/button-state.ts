export function resolveButtonState(isDisabled = false, isLoading = false, isPending = false) {
  const loading = isLoading || isPending;
  return { isDisabled: isDisabled || loading, isLoading: loading };
}
