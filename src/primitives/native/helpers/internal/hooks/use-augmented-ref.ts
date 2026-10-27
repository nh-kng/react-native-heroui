/*
 * Derived from heroui-native/src/helpers/internal/hooks/use-augmented-ref.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import * as React from 'react';
import { useImperativeHandle, useRef } from 'react';

interface AugmentRefProps<T> {
  ref: React.Ref<T>;
  methods?: Record<string, (...args: any[]) => any>;
  deps?: any[];
}

export function useAugmentedRef<T>({
  ref,
  methods,
  deps = [],
}: AugmentRefProps<T>) {
  const augmentedRef = useRef<T>(null);

  useImperativeHandle(
    ref,
    () => {
      if (typeof augmentedRef === 'function' || !augmentedRef?.current) {
        return {} as T;
      }
      return {
        ...augmentedRef.current,
        ...methods,
      };
    },
     
    deps
  );
  return augmentedRef;
}
