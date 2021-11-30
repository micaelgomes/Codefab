import React from 'react';
import { FiGithub, FiHelpCircle, FiLayout, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import * as S from './styled';

interface UserMenuProps {
  open: boolean;
  toogle: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ open, toogle }) => {
  const { user } = useAuth();

  const logout = () => {
    localStorage.removeItem('@codefab:user');
    window.location.reload();
  };

  return (
    <>
      <S.Overlay open={open} onClick={() => toogle()} />

      <S.Container
        open={open}
        right={true}
        overlayColor="transparent"
        overlayClassName="custom-overlay"
      >
        <S.Content>
          <img src={user.avatar_url} alt={`imagem de perfil de ${user.name}`} />

          <small>@{user.login}</small>

          <p className="bio">{user.bio}</p>

          <S.Menu>
            <Link to="/">
              <FiLayout size={20} />
              Home
            </Link>

            <Link to="/help">
              <FiHelpCircle size={20} />
              Guia de ajuda
            </Link>

            <a href={user.html_url} target="_blank" rel="noreferrer">
              <FiGithub size={20} />
              Github
            </a>

            <button onClick={logout}>
              <FiLogOut size={20} />
              Logout
            </button>
          </S.Menu>
        </S.Content>
      </S.Container>
    </>
  );
};

export default UserMenu;
