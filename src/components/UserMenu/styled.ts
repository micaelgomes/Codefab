import styled, { css } from 'styled-components';
import Drawer from 'react-motion-drawer';

interface OverlayProps {
  open: boolean;
}

export const Container = styled(Drawer)`
  background-color: #272822;
  padding: 2rem;

  .custom-overlay {
    display: none !important;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: auto;
    border-radius: 50%;
    border: 5px solid #ae81ff;
  }

  small {
    text-align: center;
    margin: 1rem 0;
  }

  .bio {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;

  a {
    font-weight: 500;
    text-decoration: none;
    display: flex;
    align-items: center;
    color: inherit;
    margin-bottom: 1rem;

    svg {
      margin-right: 4px;
    }
  }

  button {
    font-weight: 600;
    text-decoration: none;
    display: flex;
    align-items: center;
    border: none;
    background: transparent;
    color: #f92672;

    svg {
      margin-right: 4px;
    }
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
