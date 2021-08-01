import React, { useRef, useState } from 'react';
import ReactCodemirror from '@uiw/react-codemirror';
import XMLParser from 'react-xml-parser';

import * as S from './styled';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';

import { useEngine } from '../../hooks/engine';
import { tags } from '../../utils/tags';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/foldgutter.css';

const Editor: React.FC = () => {
  const inputRef = useRef<ReactCodemirror>(null);
  const { createFable } = useEngine();

  const [code] = useState<string>(() => {
    const codeStorage = localStorage.getItem('@code');

    if (codeStorage) {
      return codeStorage;
    }

    return '';
  });

  const parseXmlCode = () => {
    const currCode = inputRef.current?.editor?.getValue();
    const smilDom = new XMLParser().parseFromString(currCode);

    // const scenes = smilDom.getElementsByTagName('scene');
    // console.log('scenes + ', scenes);
    // console.log(smilDom);

    createFable(smilDom);
    localStorage.setItem('@code', currCode);
  };

  return (
    <S.Container>
      <Navbar runPreview={parseXmlCode} />

      <S.Content>
        <Sidenav />

        <S.Playground
          value={code}
          ref={inputRef}
          options={{
            theme: 'monokai',
            lineWrapping: true,
            smartIndent: true,
            tabSize: 2,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
            keyMap: 'sublime',
            mode: 'jsx',
            renderLine: true,
            autoCloseTags: true,
            extraKeys: {
              'Ctrl-Space': 'autocomplete',
              'Ctrl-S': () => parseXmlCode(),
            },
            hintOptions: {
              schemaInfo: tags,
            },
          }}
        />
      </S.Content>
    </S.Container>
  );
};

export default Editor;
