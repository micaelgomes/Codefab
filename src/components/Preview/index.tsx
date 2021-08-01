import React, { useRef, useEffect, useState, useCallback } from 'react';
import Draggable from 'react-draggable';
import Render from '../Render';
import { useEngine } from '../../hooks/engine';

import * as S from './styled';

const Preview: React.FC = () => {
  const [focus, setFocus] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const { moveAgent } = useEngine();

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const getKey = useCallback(
    (e: KeyboardEvent) => {
      const key = e.code;
      moveAgent(key);
    },
    [moveAgent],
  );

  useEffect(() => {
    const listner = setTimeout(() => {
      previewRef.current?.addEventListener('keydown', getKey);
    }, 500);

    return () => clearTimeout(listner);
  }, [getKey]);

  return (
    <Draggable allowAnyClick={true}>
      <S.Container
        hasFocus={focus}
        ref={previewRef}
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
