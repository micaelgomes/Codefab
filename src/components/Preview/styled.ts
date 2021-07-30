import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  background: #fff;
  width: 500px;
  height: 500px;

  padding: 0;
  border-radius: 11px;

  z-index: 9999999;
  top: 100px;
  right: 16px;
  margin: auto;
  user-select: none;

  box-shadow: 0 0 4px 0 rgb(0 0 0 / 15%);

  canvas {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export const HeaderBar = styled.div`
  cursor: move;
  height: 25px;
  padding: 0 1rem;

  button {
    position: relative;
    height: auto;
    border: none;
    background: transparent;

    &::before {
      content: '';
      position: absolute;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      top: -8px;
    }

    &#close {
      &::before {
        background: red;
      }
    }

    &#warn {
      &::before {
        background: orange;
        left: 25px;
      }
    }
  }
`;
