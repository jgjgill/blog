import { useEffect, useState } from 'react'

const prefersColorScheme =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
const localTheme = typeof window !== 'undefined' && localStorage.getItem('theme')

const initialTheme = (localTheme || prefersColorScheme) as 'dark' | 'light'

export function useDarkMode() {
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('light')

  useEffect(() => {
    setThemeMode(initialTheme)
  }, [])

  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [themeMode])

  return { themeMode, setThemeMode }
}
