'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
     return null;
  }

   return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      style={{
        padding: '0.5rem',
        borderRadius: 'var(--border-radius)',
        border: '1px solid var(--color-border)',
        background: 'var(--color-secondary)',
        cursor: 'pointer'
      }}
    >
      {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
    </button>
  );
}