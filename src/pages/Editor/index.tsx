import React, { useRef } from 'react';
import ReactCodemirror from '@uiw/react-codemirror';
import XMLParser from 'react-xml-parser';

import * as S from './styled';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';

import { useEngine } from '../../hooks/engine';

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
            tabSize: 2,
            keyMap: 'sublime',
            mode: 'jsx',
            renderLine: true,
          }}
        />
      </S.Content>
    </S.Container>
  );
};

export default Editor;
