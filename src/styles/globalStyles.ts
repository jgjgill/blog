import { css } from '@emotion/react'

export const globalStyles = css`
  body {
    --bg-color: #fff;
    --bg-inline-color: #3a3a3a;
    --text-color: #343434;
    --link-color: #333;
  }

  body.dark {
    --bg-color: #282828;
    --text-color: #f1f1f1;
    --link-color: #f1f1f1;
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
  }

  body div.gatsby-highlight {
    margin: 25px 0;
  }

  /* dark mode */
  body {
    background-color: var(--bg-color);
    color: var(--text-color);
  }

  body.dark {
    background-color: var(--bg-color);
    color: var(--text-color);
  }

  body.dark a {
    color: var(--link-color);
  }

  a {
    color: var(--link-color);
  }

  body.dark code.language-text {
    background-color: var(--bg-inline-color);
    color: var(--text-color);
    text-shadow: none;
  }

  body.dark .token.operator {
    background-color: transparent;
  }

  body.dark blockquote {
    background-color: var(--bg-inline-color);
  }
`
