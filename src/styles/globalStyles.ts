import { css } from '@emotion/react'

export const globalStyles = css`
  .light {
    --bg-color: #fff;
    --text-color: #343434;
  }

  .dark {
    --bg-color: #1f2028;
    --bg-inline-color: #2d3039;
    --text-color: rgba(255, 255, 255, 0.8);
  }

  .modal {
    --bg-color: #f7f7f7;
  }

  .dark .modal {
    --bg-color: #2d3039;
    --text-color: rgba(255, 255, 255, 0.8);
  }

  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    font-family: 'Pretendard', sans-serif;
  }

  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  figure,
  blockquote,
  dl,
  dd,
  ul,
  ol,
  button {
    margin: 0;
    padding: 0;
  }

  /* list options */
  ul,
  ol {
    list-style-type: none;
  }

  /* Set core root defaults */
  html:focus-within {
    scroll-behavior: smooth;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
  }

  a {
    text-decoration: none;
  }

  /* Make images easier to work with */
  img,
  picture {
    max-width: 100%;
    display: block;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
  }

  /* custom code */
  body code {
    word-break: break-all;
    font-family: 'Pretendard', sans-serif !important;
  }

  body div.gatsby-highlight {
    margin: 25px 0;
  }

  body .token.operator {
    background-color: transparent;
  }

  body span.token {
    color: #343434;
  }

  /* dark mode */
  html {
    background-color: var(--bg-color);
  }

  body {
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: 0.3s;
    transition-property: background-color, color;
  }

  * {
    transition: 0.3s;
    color: var(--text-color);
    transition-property: color;
  }

  svg {
    transition: 0.3s;
  }

  html.dark code.language-text {
    background-color: var(--bg-inline-color);
    color: var(--text-color);
    text-shadow: none;
  }

  html.dark .token.operator {
    background-color: transparent;
  }

  html.dark blockquote {
    background-color: var(--bg-inline-color);
  }
  html.light blockquote {
    background-color: var(--bg-inline-color);
  }

  .modal {
    background-color: var(--bg-color);
    color: var(--text-color);
  }
`
