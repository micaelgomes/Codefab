import React, { useState } from 'react';
import {
  FiHelpCircle,
  FiMenu,
  FiPlayCircle,
  FiUploadCloud,
} from 'react-icons/fi';
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
  const { user } = useAuth();

  const toogle = () => setOpenQuickView(!openQuickView);

  const publishRepo = () => {
    api
      .post('/create', null, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };

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
          <S.ButtonHelp onClick={toogle}>
            <FiHelpCircle size={22} />
          </S.ButtonHelp>

          <S.ButtonPublish onClick={publishRepo}>
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
  );
};

export default Navbar;
