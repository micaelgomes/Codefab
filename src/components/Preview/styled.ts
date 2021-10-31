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
  height: 25px;
  padding: 0 1rem;
  background: #f8f8f2;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;

  button {
    position: relative;
    height: auto;
    border: none;
    background: transparent;
    color: #3e3d32;
    z-index: 0;

    & + button {
      margin-left: 8px;
    }

    &:last-child {
      small {
        margin-right: 4px;
        font-size: 10px;
        font-weight: 600;
        position: absolute;
        right: 10px;
        top: 6px;
      }

      margin-left: auto;
    }

    &::before {
      content: '';
      position: absolute;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      z-index: -1;
      bottom: 5px;
      left: -3px;
    }

    &#close {
      &::before {
        background: #f92672;
      }
    }

    &#min {
      &::before {
        background: #fd971f;
        left: -3px;
      }
    }

    &#pin {
      &::before {
        content: none;
      }
    }
  }
`;
