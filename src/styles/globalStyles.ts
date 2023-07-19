import { css } from '@emotion/react'

export const globalStyles = css`
  .light {
    --bg-color: #fff;
    --text-color: #343434;
    --link-color: #333;
  }

  .dark {
    --bg-color: #2f2f2f;
    --bg-inline-color: #202124;
    --text-color: rgba(255, 255, 255, 0.8);
    --link-color: rgba(255, 255, 255, 0.8);
  }

  .modal {
    --bg-color: #d8b4fe;
    --text-color: #343434;
  }

  .dark .modal {
    --bg-color: #c471f5;
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
  ol {
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
    /* color: red; */
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
  body code.language-text {
    padding: 0 5px;
    word-break: break-all;
    font-family: 'Pretendard', sans-serif;
  }

  body div.gatsby-highlight {
    margin: 25px 0;
  }

  body .token.operator {
    background-color: transparent;
  }

  /* dark mode */
  html {
    background-color: var(--bg-color);
  }

  body {
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s;
  }

  a {
    color: var(--link-color);
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
