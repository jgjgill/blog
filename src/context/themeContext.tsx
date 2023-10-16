import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export const ThemeContext = createContext<{
  colorMode: 'dark' | 'light'
  setColorMode: (newValue: 'dark' | 'light') => void
} | null>(null)

export const useThemeContext = () => {
  const state = useContext(ThemeContext)

  if (!state) {
    throw new Error('useTheme must be used within ThemeContextProvider')
  }

  return state
}

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorMode, rawSetColorMode] = useState<'dark' | 'light'>('light')

  useEffect(() => {
    const root = window.document.documentElement
    const initialColorValue = root.classList.contains('dark') ? 'dark' : 'light'

    rawSetColorMode(initialColorValue)
  }, [])

  const contextValue = useMemo(() => {
    function setColorMode(newValue: 'dark' | 'light') {
      const root = window.document.documentElement

      if (newValue === 'dark') {
        root.classList.remove('dark')
        root.classList.add('light')
        localStorage.setItem('theme', 'light')
        rawSetColorMode('light')
      } else {
        root.classList.remove('light')
        root.classList.add('dark')
        localStorage.setItem('theme', 'dark')
        rawSetColorMode('dark')
      }
    }

    return { colorMode, setColorMode }
  }, [colorMode, rawSetColorMode])

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}
