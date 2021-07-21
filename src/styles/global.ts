import { createGlobalStyle } from "styled-components";
import "typeface-press-start-2p";

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
  }
`;
