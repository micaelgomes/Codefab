import styled, { css } from 'styled-components';

interface TextProps {
  width?: number;
  height?: number;
  x: number;
  y: number;
  color?: string;
  fontSize?: number;
}

export const Text = styled.p<TextProps>`
  position: absolute;
  user-select: none;
  font-weight: 600;
  line-height: 1.2;

  ${props => css`
    width: ${props.width ? props.width + 'px' : 'auto'};
    height: ${props.height ? props.height + 'px' : 'auto'};
    left: ${props.x || 0}px;
    bottom: ${props.y || 0}px;
    font-size: ${props.fontSize || 14}px;
    color: ${props.color};
  `}
`;
