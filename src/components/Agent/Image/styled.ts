import styled, { css } from 'styled-components';

interface ImageProps {
  width: number;
  height: number;
  x: number;
  y: number;
}

export const Image = styled.img<ImageProps>`
  position: absolute;
  user-select: none;

  ${props => css`
    width: ${props.width || 0}px;
    height: ${props.height || 0}px;
    left: ${props.x || 0}px;
    bottom: ${props.y || 0}px;
  `}

  &.mode-debugg {
    box-shadow: 0 0 0 2px red;
  }
`;

export const TextError = styled.p`
  color: red;
  font-size: 16px;
  font-family: monospace;
  font-weight: 600;
`;
