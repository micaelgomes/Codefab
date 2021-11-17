import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 75px;
  background: #272822;
  color: white;

  #logo {
    background: url('./logo-border.svg');
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

  img {
    background: #f8f8f2;
    border: 2px solid #ae81ff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-left: 8px;
  }
`;

export const ButtonPlay = styled.button`
  position: relative;
  background: none;
  border: none;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  z-index: 0;
  margin: 0 10px -8px;

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
`;

export const ButtonPublish = styled.button`
  position: relative;
  background: none;
  border: none;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  z-index: 0;
  margin: 0 10px -8px;

  svg {
    color: #272822;
  }

  &::before {
    content: '';
    position: absolute;
    background: #fd971f;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    top: -5px;
    left: -5px;
    z-index: -1;
  }
`;

export const ButtonHelp = styled.button`
  position: relative;
  background: none;
  border: none;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
  z-index: 0;
  margin: 0 10px -8px;

  svg {
    color: #272822;
  }

  &::before {
    content: '';
    position: absolute;
    background: #cfcfc2;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    top: -5px;
    left: -5px;
    z-index: -1;
  }
`;

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  transition: all 0.2s ease-in-out;
`;

export const ContainerModal = styled.div`
  background: #3e3d32;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  padding: 1.5rem 1rem;
  margin: auto;
  width: auto;
  height: auto;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  z-index: 1001;

  label {
    color: #f8f8f2;
    font-weight: bold;
    display: flex;
    flex-direction: column;

    & + label {
      margin-top: 1.5rem;
    }

    input,
    textarea {
      padding: 0.5rem;
      border-radius: 4px;
      background-color: transparent;
      border: 2px solid #75715e;
      color: #f8f8f2;
      margin-top: 0.3rem;
    }

    textarea {
      resize: vertical;
      min-height: 10rem;
      max-height: 20rem;
    }
  }
`;

export const buttonClose = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  color: #f8f8f2;
  right: 1rem;
  top: 0.7rem;
`;

export const buttonPublish = styled.button`
  background-color: #f92672;
  color: #272822;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  max-width: 250px;
  transition: all 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  border: none;

  svg {
    margin-right: 8px;
  }

  &:hover {
    transform: translateY(-4px);
  }
`;
