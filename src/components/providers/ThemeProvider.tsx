'use client';

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';

export function NextThemeProvider({ children, ...props }: ThemeProviderProps & { children: React.ReactNode }) {  
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}