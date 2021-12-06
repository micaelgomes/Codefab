import styled, { css } from 'styled-components';

interface VideoProps {
  width: number;
  height: number;
  x: number;
  y: number;
}

export const VideoContainer = styled.div<VideoProps>`
  position: absolute;

  ${props => css`
    width: ${props.width || 0}px;
    height: ${props.height || 0}px;
    left: ${props.x || 0}px;
    bottom: ${props.y || 0}px;
  `}

  &:hover {
    button {
      visibility: visible;
    }
  }

  &.mode-debugg {
    box-shadow: 0 0 0 2px red;
  }
`;

export const Video = styled.video`
  user-select: none;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const ButtonPlay = styled.button`
  user-select: none;
  position: absolute;
  border: none;
  background: transparent;
  top: calc(50% - 5px);
  left: calc(50% - 5px);
  z-index: 5;
  visibility: hidden;

  &::before {
    content: '';
    z-index: -1;
    position: absolute;
    background-color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    left: -15px;
    top: -15px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  }
`;
