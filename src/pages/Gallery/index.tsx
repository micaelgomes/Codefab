import React, { useEffect } from 'react';

import * as S from './styled';
import { FiInfo } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import { api } from '../../services/api';

const Gallery: React.FC = () => {
  useEffect(() => {
    api
      .get(`/gallery`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <S.Container>
      <Navbar />

      <S.Wrapper>
        <S.Content>
          <h1 className="guide-title">
            <FiInfo />
            Galeria
          </h1>
        </S.Content>
      </S.Wrapper>
    </S.Container>
  );
};

export default Gallery;
