import React, { useRef } from 'react';
import ReactCodemirror from '@uiw/react-codemirror';
import XMLParser from 'react-xml-parser';

import * as S from './styled';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';

import { useEngine } from '../../hooks/engine';

const code = `<fable>
  <scene background="bg.png">

    <agent name="caixa" img="box.png" x="200" y="200" width="120" height="120" intial-state="fechada">

      <state id="fechada" on-touch="aberta" />

      <state id="aberta" on-transition="fade-out" on-change="img:box_open.png"/>

    </agent>
  </scene>
</fable>`;

const Editor: React.FC = () => {
  const inputRef = useRef<ReactCodemirror>(null);
  const { createFable } = useEngine();

  const parseXmlCode = () => {
    const smilDom = new XMLParser().parseFromString(
      inputRef.current?.editor?.getValue(),
    );

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
            tabSize: 2,
            keyMap: 'sublime',
            mode: 'xml',
            renderLine: true,
          }}
        />
      </S.Content>
    </S.Container>
  );
};

export default Editor;
