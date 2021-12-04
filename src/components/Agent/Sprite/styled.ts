import styled, { css } from 'styled-components';
import Spritesheet from 'react-responsive-spritesheet';

interface SpriteProps {
  x: number;
  y: number;
}

export const Sprite = styled(Spritesheet)<SpriteProps>`
  position: absolute;

  ${props => css`
    left: ${props.x || 0}px;
    bottom: ${props.y || 0}px;
  `}
`;
