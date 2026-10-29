import type { ChangeEvent } from 'react';

import { useControllableValue } from './use-controllable-value.js';
import { webTextValueProps } from './web-text-value.js';

export function useWebTextInput<T extends HTMLInputElement | HTMLTextAreaElement>(
  value: string | undefined,
  defaultValue: string | undefined,
  onChangeText?: (value: string) => void
) {
  const [current, change] = useControllableValue(value, defaultValue ?? '', onChangeText);
  const ownsValue = value !== undefined || defaultValue !== undefined;
  return {
    ...webTextValueProps(value, defaultValue, current),
    onChange:
      ownsValue || onChangeText
        ? (event: ChangeEvent<T>) => change(event.currentTarget.value)
        : undefined,
  };
}
