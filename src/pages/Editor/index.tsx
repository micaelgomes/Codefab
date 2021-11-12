import React, { useRef, useState } from 'react';
import XMLParser from 'react-xml-parser';

import * as S from './styled';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import Preview from '../../components/Preview';

import { useEngine } from '../../hooks/engine';
import { tags } from '../../utils/tags';

import './addons';

const Editor: React.FC = () => {
  const inputRef = useRef(null as any);
  const { createFable, previewOpen, setpreviewOpen } = useEngine();
  const [open, setOpen] = useState(() => {
    const storage = localStorage.getItem('sidenav-status');

    if (storage) {
      return Boolean(storage);
    }

    return true;
  });

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

    localStorage.setItem('@code', currCode);
    createFable(smilDom);

    if (!previewOpen) {
      setpreviewOpen(true);
    }
  };

  const toogleSidenav = () => {
    setOpen(!open);
    localStorage.setItem('sidenav-status', JSON.stringify(open));
  };

  return (
    <S.Container>
      <Navbar runPreview={parseXmlCode} toogleSidenav={toogleSidenav} />

      <S.Content>
        <Sidenav open={open} />

        <S.Playground
          value={code}
          ref={inputRef}
          onDrop={e => {
            console.log(e);
          }}
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

      <Preview />
    </S.Container>
  );
};

export default Editor;
