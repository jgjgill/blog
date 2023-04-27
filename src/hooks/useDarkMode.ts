import { useEffect, useState } from 'react'

export function useDarkMode() {
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(
    typeof window !== 'undefined' &&
      (localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches))
      ? 'dark'
      : 'light',
  )

  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      document.body.classList.add('dark')
      document.body.classList.remove('light')
      typeof window !== 'undefined' && localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
      document.body.classList.add('light')
      typeof window !== 'undefined' && localStorage.setItem('theme', 'light')
    }
  }, [themeMode])

  return { themeMode, setThemeMode }
}
