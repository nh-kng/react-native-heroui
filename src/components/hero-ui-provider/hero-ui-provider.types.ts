import type { ReactNode } from 'react';

import type { HeroUINativeProviderProps } from '../../primitives/native/providers/hero-ui-native/index.js';

export type ColorScheme = 'system' | 'light' | 'dark';

export interface HeroUIProviderProps {
  children: ReactNode;
  colorScheme?: ColorScheme;
  nativeProps?: Omit<HeroUINativeProviderProps, 'children' | 'ref'>;
}
