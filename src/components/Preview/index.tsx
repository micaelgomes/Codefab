import React, { useState, useCallback } from 'react';
import Draggable from 'react-draggable';
import { FiLock, FiMinus, FiUnlock, FiX } from 'react-icons/fi';
import { useEngine } from '../../hooks/engine';
import Render from '../Render';

import * as S from './styled';

const Preview: React.FC = () => {
  const { previewOpen, setpreviewOpen, resetFable } = useEngine();

  const [focus, setFocus] = useState(false);
  const [minimize, setMinimize] = useState(false);
  const [lock, setLock] = useState(false);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const handleClose = useCallback(() => {
    setpreviewOpen(false);
    setLock(false);
    resetFable();
  }, [resetFable, setpreviewOpen]);

  const toogleMin = useCallback(() => {
    setMinimize(!minimize);
    alert('Ainda não implementado');
  }, [minimize]);

  const toogleLock = useCallback(() => {
    setLock(!lock);
  }, [lock]);

  return (
    <>
      {previewOpen && (
        <Draggable allowAnyClick={true} disabled={lock}>
          <S.Container
            hasFocus={focus}
            tabIndex={0}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <S.HeaderBar>
              <button id="close" onClick={handleClose}>
                <FiX size={13} />
              </button>
              <button id="min" onClick={toogleMin}>
                <FiMinus size={13} />
              </button>
              <button id="pin" onClick={toogleLock}>
                <small>{lock ? 'travado' : 'flutuante'}</small>
                {lock ? <FiLock size={13} /> : <FiUnlock size={13} />}
              </button>
            </S.HeaderBar>

            <Render />
          </S.Container>
        </Draggable>
      )}
    </>
  );
};

export default Preview;
