import { createGlobalStyle } from 'styled-components';
import 'typeface-press-start-2p';

export default createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      outline: 0;
      box-sizing: border-box;
  }

  body {
      background: #F0F2F5 ;
      -webkit-font-smoothing: antialiased
  }

  body, input, button {
      font: 16px "Poppins", sans-serif;
  }

  button {
      cursor: pointer;
  }

  .CodeMirror {
    border-radius: 0;
    font-weight: 800;
    font-size: 18px;
  }

  .CodeMirror-hints {
    position: absolute;
    z-index: 10;
    overflow: hidden;
    list-style: none;

    margin: 0;

    -webkit-box-shadow: 2px 3px 5px rgba(0,0,0,.2);
    -moz-box-shadow: 2px 3px 5px rgba(0,0,0,.2);
    box-shadow: 2px 3px 5px rgba(0,0,0,.2);
    border: 1px solid transparent;

    background: #3e3d32;

    font-size: 90%;
    font-family: monospace;

    max-height: 20em;
    min-width: 200px;
    overflow-y: auto;
    font-size: 18px;
  }

  .CodeMirror-hint {
    margin: 0;
    white-space: pre;
    color: #f8f8f2;
    font-weight: 800;
    cursor: pointer;
    padding: 4px;
  }

  li.CodeMirror-hint-active {
    background: #75715E;
    color: white;
  }
`;
