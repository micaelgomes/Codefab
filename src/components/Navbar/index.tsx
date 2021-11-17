import React, { useRef, useState } from 'react';
import {
  FiHelpCircle,
  FiMenu,
  FiPlayCircle,
  FiUploadCloud,
  FiX,
} from 'react-icons/fi';
import { useAssets } from '../../hooks/assets';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import QuickHelp from '../QuickHelp';

import * as S from './styled';

interface NavbarProps {
  runPreview(): void;
  toogleSidenav: any;
}

const Navbar: React.FC<NavbarProps> = ({ runPreview, toogleSidenav }) => {
  const [openQuickView, setOpenQuickView] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { user } = useAuth();
  const { files } = useAssets();

  const toogle = () => setOpenQuickView(!openQuickView);

  const toogleModal = () => setOpenModal(!openModal);

  const publishRepo = () => {
    const name = inputRef.current?.value;
    const description = textareaRef.current?.value;
    const username = user.login;
    const code = localStorage.getItem('@code');

    api
      .post(
        '/create',
        {
          name,
          description,
          username,
          code,
          files,
        },
        {
          headers: { Authorization: `token ${user.access_token}` },
        },
      )
      .then(res => console.log(res))
      .catch(err => {
        console.error(err);
        // localStorage.removeItem('@codefab:user');
        // window.location.reload();
      });
  };

  return (
    <>
      {openModal && (
        <S.Overlay>
          <S.ContainerModal>
            <S.buttonClose onClick={toogleModal}>
              <FiX size={24} />
            </S.buttonClose>
            <label>
              Nome do projeto:
              <input ref={inputRef} type="text" />
            </label>

            <label>
              Descrição:
              <textarea ref={textareaRef} />
            </label>

            <S.buttonPublish onClick={publishRepo}>
              Publicar no Github
            </S.buttonPublish>
          </S.ContainerModal>
        </S.Overlay>
      )}
      <S.Container>
        <S.Wrapper>
          <S.ContainerLogo>
            <button onClick={toogleSidenav}>
              <FiMenu size={24} />
            </button>
            <span id="logo" />
          </S.ContainerLogo>

          <S.UserAction>
            <S.ButtonHelp onClick={toogle}>
              <FiHelpCircle size={22} />
            </S.ButtonHelp>

            <S.ButtonPublish onClick={toogleModal}>
              <FiUploadCloud size={22} />
            </S.ButtonPublish>

            <S.ButtonPlay onClick={runPreview}>
              <FiPlayCircle size={22} />
            </S.ButtonPlay>

            <img src={user.avatar_url} alt="Logo from user" />
          </S.UserAction>
        </S.Wrapper>

        <QuickHelp open={openQuickView} toogle={toogle}></QuickHelp>
      </S.Container>
    </>
  );
};

export default Navbar;
