import styled from 'styled-components';
import logoSrc from '../../assets/logo.svg';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 75px;
  background: #272822;
  color: white;

  #logo {
    background: url(${logoSrc});
    width: 100px;
    height: 35px;
    display: block;
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

export const ContainerLogo = styled.div`
  display: flex;
  align-items: center;

  button {
    background: transparent;
    border: none;
    margin-right: 8px;
    color: #cfcfc2;

    svg {
      margin-top: 6px;
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  width: 100%;
  margin: 0 auto;
  align-items: center;
`;

export const UserAction = styled.div`
  display: flex;
  align-items: center;

  button {
    position: relative;
    background: none;
    border: none;
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
    z-index: 0;
    margin: 0 16px -8px;

    svg {
      color: #272822;
    }

    &::before {
      content: '';
      position: absolute;
      background: #a6e22e;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      top: -5px;
      left: -5px;
      z-index: -1;
    }
  }

  img {
    background: #f8f8f2;
    border: 2px solid #ae81ff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;
