import { useMemo, useState } from 'react';

import { changedSegment, segmentKeys } from './segmented-control-state.js';
import type { SegmentedControlProps } from './segmented-control.types.js';

export function useSegmentedControl({ value, defaultValue, onValueChange }: SegmentedControlProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? value ?? '');
  const selected = value ?? internalValue;
  const selectedKeys = useMemo(() => segmentKeys(selected), [selected]);
  const onSelectionChange = (keys: Iterable<string | number>) => {
    const next = changedSegment(selected, keys);
    if (next === undefined) return;
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  };
  return { selected, selectedKeys, onSelectionChange };
}
