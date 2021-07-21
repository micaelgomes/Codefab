import React from "react";
import { FiPlayCircle } from "react-icons/fi";
import userSrc from '../../assets/user.png'

import * as S from "./styled";

interface NavbarProps {
  runPreview(): void;
}

const Navbar: React.FC<NavbarProps> = ({ runPreview }) => {
  return (
    <S.Container>
      <S.Wrapper>
        <span id="logo" />

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
