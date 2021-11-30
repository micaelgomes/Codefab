import styled, { css } from 'styled-components';
import Drawer from 'react-motion-drawer';

interface OverlayProps {
  open: boolean;
}

export const Container = styled(Drawer)`
  background-color: #272822;
  padding: 2rem;
`;

export const Overlay = styled.a<OverlayProps>`
  background-color: rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease-in-out;
  z-index: 1000;

  ${props =>
    props.open &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;
