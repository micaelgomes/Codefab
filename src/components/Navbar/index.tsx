import React, { useState } from 'react';
import {
  FiHelpCircle,
  FiMenu,
  FiPlayCircle,
  FiUploadCloud,
} from 'react-icons/fi';
import { useParams } from 'react-router';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import QuickHelp from '../QuickHelp';

import * as S from './styled';

interface NavbarProps {
  runPreview(): void;
  toogleSidenav: any;
}

interface PathType {
  repo: string;
}

const Navbar: React.FC<NavbarProps> = ({ runPreview, toogleSidenav }) => {
  const { repo } = useParams<PathType>();
  const { user } = useAuth();
  const [openQuickView, setOpenQuickView] = useState(false);

  const toogle = () => setOpenQuickView(!openQuickView);

  const updateFable = () => {
    const fable = localStorage.getItem('@code');
    const sha = JSON.parse(localStorage.getItem('@sha-fable') as string);

    api
      .put(`/file/fable?user=${user.login}&repo=${repo}&sha=${sha}`, {
        fable,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
        // localStorage.removeItem('@codefab:user');
        // window.location.reload();
      });
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.ContainerLogo>
          {repo && (
            <button onClick={toogleSidenav}>
              <FiMenu size={24} />
            </button>
          )}
          <a href="/">
            <span id="logo" />
          </a>
        </S.ContainerLogo>

        <S.UserAction>
          {repo && (
            <>
              <S.ButtonPublish onClick={updateFable}>
                <FiUploadCloud size={22} />
              </S.ButtonPublish>

              <S.ButtonHelp onClick={toogle}>
                <FiHelpCircle size={22} />
              </S.ButtonHelp>

              <S.ButtonPlay onClick={runPreview}>
                <FiPlayCircle size={22} />
              </S.ButtonPlay>
            </>
          )}

          <img src={user.avatar_url} alt="Logo from user" />
        </S.UserAction>
      </S.Wrapper>

      <QuickHelp open={openQuickView} toogle={toogle}></QuickHelp>
    </S.Container>
  );
};

export default Navbar;
