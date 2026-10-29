/*
 * Derived from heroui-native/src/helpers/internal/utils/get-element-by-display-name.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import React from 'react';

import type { ReactChild } from '../types/index.js';

export const getElementByDisplayName = (
  children: React.ReactNode,
  displayName: string
): ReactChild | undefined => {
  const element = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) &&
      (child.type as any)?.displayName === displayName
  );

  return element;
};
