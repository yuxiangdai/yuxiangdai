import { css } from 'emotion'

export default {
  container: css`
    font-family: 'Noto Sans', 'Open Sans', sans-serif;
    font-size: 1em;
    color: white;
    font-weight: 300;
    line-height: 1.5;
    letter-spacing: 0.05em;
    padding: 1em 0 2em 0;

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
      font-family: 'Noto Sans', 'Open Sans', sans-serif;
    }
  `,
  timeline: css`
    position: relative;
    max-width: 95%;
    list-style: none;

    &:before {
      background-color: white;
      content: '';
      margin-left: -1px;
      position: absolute;
      top: 0;
      left: 5em;
      width: 2px;
      height: 100%;
    }
  `,
  event: css`
    position: relative;
  `,
  icon: css`
    background-color: white;
    display: block;
    margin: 0.5em 0.5em 0.5em 2.5em;
    position: absolute;
    top: 2em;
    left: 1.7em;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
  `,
  body: css`
    padding: 7em 2em 0 5em;
    position: relative;
    top: -114px;
    left: 3em;
    width: 95%;

    h3 {
      color: #f5a623;
      font-size: 1.2em;
    }

    h4 {
      font-size: 1.2em;
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
  year: css`
    padding-top: 2.5em;
    position: absolute;
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
