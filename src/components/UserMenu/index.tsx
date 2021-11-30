import React from 'react';
import { FiInfo } from 'react-icons/fi';

import * as S from './styled';

interface UserMenuProps {
  open: boolean;
  toogle: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ open, toogle }) => {
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
        <img />

        <small>@user</small>

        <p>bio</p>
        <p>github</p>
        <p>help</p>

        <button onClick={logout}>sair</button>
      </S.Container>
    </>
  );
};

export default UserMenu;
