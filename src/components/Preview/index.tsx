import React from 'react';
import Draggable from 'react-draggable';
import Render from '../Render';

import * as S from './styled';

const Preview: React.FC = () => {
  return (
    <Draggable allowAnyClick={true}>
      <S.Container>
        <S.HeaderBar>
          <button id="close"></button>
          <button id="warn"></button>
        </S.HeaderBar>
        <Render />
      </S.Container>
    </Draggable>
  );
};

export default Preview;
