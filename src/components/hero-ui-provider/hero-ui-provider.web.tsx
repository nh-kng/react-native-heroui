import type { HeroUINativeProviderProps } from 'heroui-native/provider';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Uniwind } from 'uniwind';

export type ColorScheme = 'system' | 'light' | 'dark';

export interface HeroUIProviderProps {
  children: ReactNode;
  colorScheme?: ColorScheme;
  nativeProps?: Omit<HeroUINativeProviderProps, 'children' | 'ref'>;
}

export function HeroUIProvider({ children, colorScheme = 'system' }: HeroUIProviderProps) {
  useEffect(() => {
    const root = document.documentElement;
    const hadDarkClass = root.classList.contains('dark');
    const hadLightClass = root.classList.contains('light');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const previousTheme = Uniwind.currentTheme;
    const hadAdaptiveThemes = Uniwind.hasAdaptiveThemes;

    const updateTheme = () => {
      const theme = colorScheme === 'system' ? (mediaQuery.matches ? 'dark' : 'light') : colorScheme;
      Uniwind.setTheme(colorScheme);
      root.classList.toggle('light', theme === 'light');
      root.classList.toggle('dark', theme === 'dark');
    };

    updateTheme();
    if (colorScheme === 'system') mediaQuery.addEventListener('change', updateTheme);

    return () => {
      mediaQuery.removeEventListener('change', updateTheme);
      Uniwind.setTheme(hadAdaptiveThemes ? 'system' : previousTheme);
      root.classList.toggle('light', hadLightClass);
      root.classList.toggle('dark', hadDarkClass);
    };
  }, [colorScheme]);

  return children;
}
