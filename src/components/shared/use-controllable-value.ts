import { useState } from 'react';

export function useControllableValue<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
): readonly [T, (value: T) => void] {
  const [internal, setInternal] = useState(defaultValue);
  return [
    value === undefined ? internal : value,
    (next: T) => {
      if (value === undefined) setInternal(next);
      onChange?.(next);
    },
  ];
}
