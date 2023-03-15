const HtmlAttributes = {
  lang: 'ko',
}

exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes(HtmlAttributes)
}
