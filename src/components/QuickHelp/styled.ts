import styled, { css } from 'styled-components';
import Drawer from 'react-motion-drawer';

interface OverlayProps {
  open: boolean;
}

export const Container = styled(Drawer)`
  background-color: #272822;
  padding: 2rem;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 10px;
    background-color: #3e3d32;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #cfcfc2;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #75715e;
  }

  .guide-title {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #fff;

    svg {
      margin-right: 0.5rem;
    }
  }

  pre {
    margin: 1rem 0;
  }

  .custom-overlay {
    display: none !important;
  }
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
