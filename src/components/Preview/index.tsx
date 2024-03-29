import React, { useState, useCallback } from 'react';
import Draggable from 'react-draggable';
import { FiLock, FiUnlock, FiX } from 'react-icons/fi';
import { useEngine } from '../../hooks/engine';
import Render from '../Render';

import * as S from './styled';

const Preview: React.FC = () => {
  const { previewOpen, setpreviewOpen, resetFable } = useEngine();

  const [focus] = useState(true);
  const [lock, setLock] = useState(false);

  const handleClose = useCallback(() => {
    setpreviewOpen(false);
    setLock(false);
    resetFable();
  }, [resetFable, setpreviewOpen]);

  const toogleLock = useCallback(() => {
    setLock(!lock);
  }, [lock]);

  return (
    <>
      {previewOpen && (
        <Draggable allowAnyClick={true} disabled={lock} bounds="parent">
          <S.Container hasFocus={focus} tabIndex={0}>
            <S.HeaderBar>
              <button id="close" onClick={handleClose}>
                <FiX size={13} />
              </button>
              <small className="notice">1º Quadrante - (500x500)</small>
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
