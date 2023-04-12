const HtmlAttributes = {
  lang: 'ko',
}

const setInitThemeMode = () => {
  typeof window !== 'undefined' &&
  (localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches))
    ? document.body.classList.add('dark')
    : document.body.classList.remove('dark')
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
