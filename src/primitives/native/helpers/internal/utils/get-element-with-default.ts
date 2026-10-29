/*
 * Derived from heroui-native/src/helpers/internal/utils/get-element-with-default.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import React from 'react';

import { getElementByDisplayName } from './get-element-by-display-name.js';
import type { ReactChild } from '../types/index.js';

export const getElementWithDefault = (
  children: React.ReactNode,
  displayName: string,
  defaultElement: React.ReactElement
): ReactChild => {
  const element = getElementByDisplayName(children, displayName);

  if (!element) {
    return defaultElement;
  }

  return element;
};
