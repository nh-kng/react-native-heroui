import { useEffect } from 'react';
import { Uniwind } from 'uniwind';

import type { HeroUIProviderProps } from './hero-ui-provider.types.js';
import { HeroUINativeProvider } from '../../primitives/native/providers/hero-ui-native/index.js';
export type { ColorScheme, HeroUIProviderProps } from './hero-ui-provider.types.js';

export function HeroUIProvider({
  children,
  colorScheme = 'system',
  nativeProps,
}: HeroUIProviderProps) {
  useEffect(() => {
    const previousTheme = Uniwind.currentTheme;
    const hadAdaptiveThemes = Uniwind.hasAdaptiveThemes;
    Uniwind.setTheme(colorScheme);

    return () => {
      Uniwind.setTheme(hadAdaptiveThemes ? 'system' : previousTheme);
    };
  }, [colorScheme]);

  return <HeroUINativeProvider {...nativeProps}>{children}</HeroUINativeProvider>;
}
