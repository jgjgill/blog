import { Global, ThemeProvider } from '@emotion/react'
import { ThemeContextProvider } from 'context/themeContext'
import React from 'react'
import { globalStyles } from 'styles/globalStyles'
import { theme } from 'styles/theme'
import { StrictPropsWithChildren } from 'types/custom'

const App = ({ children }: StrictPropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <ThemeContextProvider>
        <Global styles={globalStyles} />

        {children}
      </ThemeContextProvider>
    </ThemeProvider>
  )
}

export default App
