const HtmlAttributes = {
  lang: 'ko',
}

const setInitThemeMode = () => {
  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const prefersDarkFromMQ = mql.matches
  const persistedPreference = localStorage.getItem('theme')

  let colorMode = 'light'

  const hasUsedToggle = typeof persistedPreference === 'string'

  if (hasUsedToggle) {
    colorMode = persistedPreference
  } else {
    colorMode = prefersDarkFromMQ ? 'dark' : 'light'
  }

  document.documentElement.classList.add(colorMode)
}

const functionToScript = (cb) => String(cb)

const setInitThemeModeScript = functionToScript(setInitThemeMode)
const codeRunOnClient = `(${setInitThemeModeScript})()`

const PreBodyScript = () => {
  return (
    <script
      key="setInitThemeMode-script"
      dangerouslySetInnerHTML={{ __html: codeRunOnClient }}
    />
  )
}

export const onRenderBody = ({ setHtmlAttributes, setPreBodyComponents }) => {
  setHtmlAttributes(HtmlAttributes)
  setPreBodyComponents(<PreBodyScript />)
}
