import React, { useRef } from 'react';
import ReactCodemirror from '@uiw/react-codemirror';
import XMLParser from 'react-xml-parser';

import * as S from './styled';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';

import { useEngine } from '../../hooks/engine';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/foldgutter.css';

const code = `<fable>

  <scene background="bg.png">

    <agent img="box.png" x="300" y="300" width="50" height="50" intial-state="fechada">

      <state id="fechada" on-touch="aberta" />

      <state id="aberta" on-transition="fade-out" on-change="img:box_open.png"/>

    </agent>

    <agent img="box.png" x="310" y="350" width="50" height="50" />

    <agent img="box.png" x="250" y="350" width="50" height="50" />

    <agent img="block.png" x="0" y="400" width="100" height="100" />

    <agent img="block.png" x="100" y="400" width="100" height="100" />

    <agent img="block.png" x="200" y="400" width="100" height="100" />

    <agent img="block.png" x="300" y="400" width="100" height="100" />

    <agent img="block.png" x="400" y="400" width="100" height="100" />

    <agent sprite="idle.png" x="0" y="290" width="64" height="44" />

  </scene>

</fable>`;

const tags = {
  '!top': ['add-item', 'query-items', 'print-item', 'remove-item'],
  '!attrs': {},
  toto: {},
  'add-item': {
    attrs: {
      id: null,
      'item-descriptor': null,
    },
    children: ['set-property'],
  },
  'print-item': {
    attrs: {
      id: null,
      'item-descriptor': null,
    },
    children: [],
  },
  'remove-item': {
    attrs: {
      id: null,
      'item-descriptor': null,
    },
    children: ['set-property'],
  },
  'query-items': {
    attrs: {
      'item-descriptor': null,
      'id-only': ['true', 'false'],
    },
    children: [],
  },
  'set-property': {
    attrs: {
      name: null,
    },
    children: [],
  },
};

const Editor: React.FC = () => {
  const inputRef = useRef<ReactCodemirror>(null);
  const { createFable } = useEngine();

  const parseXmlCode = () => {
    const smilDom = new XMLParser().parseFromString(
      inputRef.current?.editor?.getValue(),
    );

    // const scenes = smilDom.getElementsByTagName('scene');
    // console.log('scenes + ', scenes);

    createFable(smilDom);
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
