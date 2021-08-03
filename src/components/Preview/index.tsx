import React, { useState, useCallback } from 'react';
import Draggable from 'react-draggable';
import Render from '../Render';

import * as S from './styled';

const Preview: React.FC = () => {
  const [focus, setFocus] = useState(false);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  return (
    <Draggable allowAnyClick={true}>
      <S.Container
        hasFocus={focus}
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
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
