import { ThemeProvider, Global } from '@emotion/react'
import { theme } from '../src/styles/theme'
import { globalStyles } from '../src/styles/globalStyles'

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />

        <Story {...context} />
      </ThemeProvider>
    ),
  ],
}

export default preview
