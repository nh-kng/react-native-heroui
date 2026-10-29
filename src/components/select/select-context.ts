import { createContext } from 'react';

import type { SelectOption } from './select.types.js';
export const SelectItemsContext = createContext<readonly SelectOption[]>([]);
