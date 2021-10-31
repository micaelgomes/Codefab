import React from 'react';
import { FiMenu, FiPlayCircle } from 'react-icons/fi';
import userSrc from '../../assets/user.png';

import * as S from './styled';

interface NavbarProps {
  runPreview(): void;
  toogleSidenav: any;
}

const Navbar: React.FC<NavbarProps> = ({ runPreview, toogleSidenav }) => {
  return (
    <S.Container>
      <S.Wrapper>
        <S.ContainerLogo>
          <button onClick={toogleSidenav}>
            <FiMenu size={24} />
          </button>
          <span id="logo" />
        </S.ContainerLogo>

        <S.UserAction>
          <button onClick={runPreview}>
            <FiPlayCircle size={22} />
          </button>

          <img src={userSrc} alt="Logo from user" />
        </S.UserAction>
      </S.Wrapper>
    </S.Container>
  );
};

export default Navbar;
