import React, { useEffect, useRef, useState } from 'react';
import XMLParser from 'react-xml-parser';
import { toast } from 'react-hot-toast';

import * as S from './styled';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import Preview from '../../components/Preview';

import { useEngine } from '../../hooks/engine';
import { tags } from '../../utils/tags';

import './addons';
import { api } from '../../services/api';
import { useParams } from 'react-router';
import { useAuth } from '../../hooks/auth';
import { useAssets } from '../../hooks/assets';

interface PathType {
  repo: string;
}

const Editor: React.FC = () => {
  const inputRef = useRef(null as any);
  const { createFable, previewOpen, setpreviewOpen } = useEngine();
  const { repo } = useParams<PathType>();
  const { user } = useAuth();
  const { setFiles } = useAssets();

  const [open, setOpen] = useState(() => {
    const storage = JSON.parse(
      localStorage.getItem('sidenav-status') as string,
    );

    if (typeof storage === 'boolean') {
      return storage;
    }

    return true;
  });

  const [code, setCode] = useState<string>(() => {
    const storage = localStorage.getItem(`@code:${repo}`);

    if (storage) {
      return storage;
    }

    return '';
  });

  const saveInStorage = () => {
    const currCode = inputRef.current?.editor?.getValue();

    localStorage.setItem(`@code:${repo}`, currCode);
    toast.success('Alterações salvas.');
  };

  const parseXmlCode = () => {
    const currCode = inputRef.current?.editor?.getValue();
    const smilDom = new XMLParser().parseFromString(currCode);

    createFable(smilDom);

    if (!previewOpen) {
      setpreviewOpen(true);
    }
  };

  const toogleSidenav = () => {
    setOpen(!open);
    localStorage.setItem('sidenav-status', JSON.stringify(!open));
  };

  useEffect(() => {
    const getProjectContent = async () => {
      const responseFable = await api.get(
        `/project/fable?user=${user.login}&repo=${repo}`,
        {
          headers: {
            Authorization: `token ${user.access_token}`,
          },
        },
      );

      if (responseFable.data.fable) {
        localStorage.setItem('@sha-fable', responseFable.data.sha);

        if (code.length === 0) {
          setCode(responseFable.data.fable);
        }
      }

      const responseFiles = await api.get(
        `/project?user=${user.login}&repo=${repo}`,
        {
          headers: {
            Authorization: `token ${user.access_token}`,
          },
        },
      );

      if (responseFiles.data?.length > 0) {
        const filterAssets = responseFiles.data.filter(
          (file: any) => file.path !== 'fable.xml',
        );

        setFiles(filterAssets);
      }
    };

    getProjectContent();
  }, [code.length, repo, setFiles, user.access_token, user.login]);

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
              'Ctrl-S': () => saveInStorage(),
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
