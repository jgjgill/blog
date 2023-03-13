import { Global, ThemeProvider } from '@emotion/react'
import React from 'react'
import { globalStyles } from 'styles/globalStyles'
import { theme } from 'styles/theme'
import { StrictPropsWithChildren } from 'types/custom'

const App = ({ children }: StrictPropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />

      {children}
    </ThemeProvider>
  )
}

export default App
