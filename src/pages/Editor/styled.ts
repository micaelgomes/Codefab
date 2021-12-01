import styled from 'styled-components';
import CodeMirror from '@uiw/react-codemirror';

import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/lint/lint';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';

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

export const ContainerLoading = styled.div`
  background: #272822;
  height: calc(100vh - 75px);
  display: block;
`;

export const Loading = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  min-height: 360px;
  margin: auto;
  color: #f8f8f2;
  padding-top: 2rem;

  &::after {
    content: '';
    background: transparent url('/load-max.svg') center center no-repeat;
    height: calc(100% - 100px);
    width: 100%;
    position: absolute;
    top: 60px;
  }
`;
