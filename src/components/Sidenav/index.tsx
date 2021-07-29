import React from 'react';

import * as S from './styled';
import { useEffect } from 'react';

import bgDay from '../../assets/bg.png';
import bgNight from '../../assets/noite.png';
import box from '../../assets/box.png';
import block from '../../assets/block.png';

const Sidenav: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <S.Container>
      <S.Title>Assets disponíveis</S.Title>

      <S.ContainerIamges>
        <img src={bgDay} alt="" />

        <img src={bgNight} alt="" />

        <img src={box} alt="" />

        <img src={block} alt="" />
      </S.ContainerIamges>
    </S.Container>
  );
};

export default Sidenav;
