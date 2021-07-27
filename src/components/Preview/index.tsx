import React from 'react';
import Draggable from 'react-draggable';
import Render from '../Render';

import * as S from './styled';

const Preview: React.FC = () => {
  return (
    <Draggable>
      <S.Container>
        <Render />
      </S.Container>
    </Draggable>
  );
};

export default Preview;
