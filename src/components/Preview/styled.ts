import styled, { css } from 'styled-components';

interface ContainerProps {
  hasFocus: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: fixed;
  background: #fff;
  width: 500px;
  height: 525px;

  padding: 0;
  border-radius: 11px;

  z-index: 9999999;
  top: 100px;
  right: 16px;
  margin: auto;
  user-select: none;

  box-shadow: 0 0 4px 0 rgb(0 0 0 / 15%);

  &::before {
    content: '';
    border: 5px solid transparent;
    background: none;
    position: absolute;
    width: 500px;
    height: 525px;
    border-radius: 15px;
    top: -5px;
    left: -5px;
  }

  ${props =>
    props.hasFocus &&
    css`
      &::before {
        border: 5px solid orange;
      }
    `}

  canvas {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export const HeaderBar = styled.div`
  cursor: move;
  height: 25px;
  padding: 0 1rem;
  background: #f8f8f2;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

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
