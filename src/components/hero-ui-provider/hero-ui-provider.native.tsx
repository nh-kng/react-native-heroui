import { HeroUINativeProvider, type HeroUINativeProviderProps } from 'heroui-native/provider';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Uniwind } from 'uniwind';

export type ColorScheme = 'system' | 'light' | 'dark';

export interface HeroUIProviderProps {
  children: ReactNode;
  colorScheme?: ColorScheme;
  nativeProps?: Omit<HeroUINativeProviderProps, 'children' | 'ref'>;
}

export function HeroUIProvider({ children, colorScheme = 'system', nativeProps }: HeroUIProviderProps) {
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
