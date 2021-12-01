/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import {
  FiHelpCircle,
  FiMenu,
  FiPlayCircle,
  FiTrash2,
  FiUploadCloud,
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useHistory, useLocation, useParams } from 'react-router';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import UserMenu from '../UserMenu';

import * as S from './styled';
import { Link } from 'react-router-dom';

interface NavbarProps {
  runPreview?: () => void;
  toogleSidenav?: any;
}

interface PathType {
  repo: string;
}

const Navbar: React.FC<NavbarProps> = ({ runPreview, toogleSidenav }) => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { repo } = useParams<PathType>();
  const { user } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const pathname = location.pathname.split('/');
  const hasView = pathname[2] === 'view';

  const toogleMenu = () => setOpenUserMenu(!openUserMenu);

  const deleteFable = () => {
    const answer = confirm(
      `Você tem certeza que deseja excluir a fábula ${repo}?`,
    );

    if (!answer) {
      return;
    }

    const answerConfirmation = confirm(
      `Esta ação é irreversível. Deseja prosseguir?`,
    );

    if (answer && answerConfirmation) {
      api
        .delete(`/project?user=${user.login}&repo=${repo}`, {
          headers: {
            Authorization: `token ${user.access_token}`,
          },
        })
        .then(res => {
          localStorage.removeItem(`@code:${repo}`);
          history.push('/');
        })
        .catch(err => {
          console.error(err);
          alert('Algum problema aconteceu');
          // localStorage.removeItem('@codefab:user');
          // window.location.reload();
        });
    }
  };

  const updateFable = () => {
    const fable = localStorage.getItem(`@code:${repo}`);
    const sha = localStorage.getItem('@sha-fable');

    toast.promise(
      api.put(
        `/file/fable?user=${user.login}&repo=${repo}&sha=${sha}`,
        {
          fable,
        },
        {
          headers: {
            Authorization: `token ${user.access_token}`,
          },
        },
      ),
      {
        loading: 'Publicando...',
        success: res => {
          localStorage.setItem('@sha-fable', res.data.content.sha);
          return <b>Fábula publicada!</b>;
        },
        error: <b>Algum erro aconteceu...</b>,
      },
    );
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
          <Link to="/">
            <span id="logo" />
          </Link>
        </S.ContainerLogo>

        <S.UserAction>
          {repo && (
            <>
              {!hasView && (
                <>
                  <S.ButtonDelete onClick={deleteFable}>
                    <FiTrash2 size={22} />
                  </S.ButtonDelete>

                  <S.ButtonPublish onClick={updateFable}>
                    <FiUploadCloud size={22} />
                  </S.ButtonPublish>

                  <S.ButtonHelp href="/help" target="_blank">
                    <FiHelpCircle size={22} />
                  </S.ButtonHelp>
                </>
              )}

              <S.ButtonPlay onClick={runPreview}>
                <FiPlayCircle size={22} />
              </S.ButtonPlay>
            </>
          )}

          <S.ButtonUserMenu onClick={toogleMenu}>
            <img src={user.avatar_url} alt="Logo from user" />
          </S.ButtonUserMenu>
        </S.UserAction>
      </S.Wrapper>

      <UserMenu open={openUserMenu} toogle={toogleMenu}></UserMenu>
    </S.Container>
  );
};

export default Navbar;
