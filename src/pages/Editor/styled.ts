import styled from "styled-components";
import CodeMirror from "@uiw/react-codemirror";

import "codemirror/addon/display/autorefresh";
import "codemirror/addon/comment/comment";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/lint/lint";
import "codemirror/keymap/sublime";
import "codemirror/theme/monokai.css";

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 75px);
`;

export const Playground = styled(CodeMirror)`
  width: 100%;
  height: 100%;
`;
