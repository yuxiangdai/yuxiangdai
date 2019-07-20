import { css } from 'emotion'

export default {
  container: css`
    font-family: 'Avenir Next', 'Open Sans', sans-serif;
    font-size: 1em;
    color: white;
    font-weight: 300;
    line-height: 1.5;
    letter-spacing: 0.05em;

    * {
      box-sizing: border-box;

      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }

    p {
      font-family: 'Avenir Next', 'Open Sans', sans-serif;
    }
  `,
  timeline: css`
    position: relative;
    max-width: 95%;
    list-style: none;

    &:before {
      background-color: black;
      content: '';
      margin-left: -1px;
      position: absolute;
      top: 0;
      left: 2em;
      width: 2px;
      height: 100%;
    }
  `,
  event: css`
    position: relative;
  `,
  icon: css`
    background-color: black;
    display: block;
    margin: 0.5em 0.5em 0.5em -0.5em;
    position: absolute;
    top: -8px;
    left: 1.5em;
    width: 2em;
    height: 2em;
    border-radius: 50%;
  `,
  body: css`
    padding: 2em 2em 0 2em;
    position: relative;
    top: -1.875em;
    left: 2em;
    width: 95%;

    h3 {
      font-size: 1.75em;
    }

    h4 {
      font-size: 1.2em;
      margin-bottom: 1.2em;
    }
  `,
  date: css`
    color: white;
    background-color: black;
    box-shadow: inset 0 0 0 0em #ef795a;
    display: inline-block;
    margin-bottom: 1.2em;
    padding: 0.25em 1em 0.2em 1em;
  `,
  description: css`
    strong {
      font-weight: 700;
    }

    p {
      padding-bottom: 1.2em;
    }
  `,
}
