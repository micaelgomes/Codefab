import React from 'react';

import * as S from './styled';
import { useEffect } from 'react';

const Sidenav: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <S.Container>
      <S.Title>Assets disponíveis</S.Title>

      <S.ContainerIamges>
        <img src="bg.png" alt="" />
        <img src="noite.png" alt="" />
        <img src="box.png" alt="" />
        <img src="block.png" alt="" />
      </S.ContainerIamges>
    </S.Container>
  );
};

export default Sidenav;
