import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { animated } from 'react-spring';

const colors = [
  '#E6DB74',
  '#FD971F',
  '#F92672',
  '#FD5FF0',
  '#AE81FF',
  '#66D9EF',
  '#A1EFE4',
  '#A6E22E',
  '#CFCFC2',
];

interface CardProps {
  color1: number;
  color2: number;
}

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #272822;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const ContainerImageError = styled.div`
  width: 100%;
  min-height: calc(100vh - 250px);
  transition: all 0.2s ease-in-out;
  display: flex;
`;

export const ImageError = styled.img`
  width: 100%;
  max-width: 150px;
  object-fit: contain;
  margin: auto;
`;

export const Content = styled.section`
  width: 100%;
  max-width: 1100px;
  margin: 1.5rem auto;

  h1 {
    color: #cfcfc2;
    position: relative;
    margin-bottom: 3rem;

    &::after {
      content: '';
      position: absolute;
      background: #3e3d32;
      width: 100%;
      height: 8px;
      left: 0;
      bottom: -16px;
      border-radius: 8px;
    }
  }
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  height: auto;
  max-height: calc(100vh - 182px);
  padding-bottom: 2rem;

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
`;

export const Card = styled(Link)<CardProps>`
  position: relative;
  list-style: none;
  margin: 0.5rem;
  width: 100%;
  max-width: 255px;
  height: 200px;
  background: ${props => `linear-gradient(
    122.06deg,
    ${colors[props.color1]} 0%,
    ${colors[props.color2]} 101.35%
  )`};
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    transform: translateY(-5px);
  }

  div {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    margin-bottom: 8px;
  }

  h4 {
    color: #272822;
    text-align: center;
  }
`;

export const CardCreate = styled.li`
  list-style: none;
  margin: 0.5rem;
  width: 100%;
  max-width: 255px;
  height: 200px;
  background: #75715e;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    transform: translateY(-5px);
  }

  div {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  svg {
    color: #cfcfc2;
    margin-bottom: 8px;
  }

  h4 {
    color: #cfcfc2;
  }
`;

export const Overlay = styled(animated.div)`
  background-color: rgba(39, 40, 34, 0.75);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  transition: all 0.2s ease-in-out;
`;

export const Modal = styled(animated.div)`
  background: #75715e;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;
  padding: 1.5rem 1rem;
  margin: auto;
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 16px;
  display: block;
  z-index: 1001;

  img {
    width: 100px;
    height: 100px;
    margin: 1rem auto;
    display: flex;
  }

  label {
    color: #f8f8f2;
    font-weight: bold;
    display: flex;
    flex-direction: column;

    & + label {
      margin-top: 1.5rem;
    }

    small {
      margin-top: 0.3rem;
      font-weight: 500;
    }

    input,
    textarea {
      padding: 0.5rem;
      border-radius: 4px;
      background-color: transparent;
      border: 2px solid #cfcfc2;
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

export const ContainerModal = styled.div`
  width: 100%;
  max-width: 400px;
  margin: auto;
  transition: all 0.2s ease-in-out;
`;

export const buttonPublish = styled.button`
  background-color: #a6e22e;
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
    margin-left: 8px;
  }

  &:hover {
    transform: translateY(-4px);
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

export const ContainerLoading = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  min-height: 360px;
  margin: auto;
  color: #f8f8f2;
  padding-top: 2rem;

  &::after {
    content: '';
    background: transparent url('/load-max.svg') center center no-repeat;
    height: calc(100% - 100px);
    width: 100%;
    position: absolute;
    top: 100px;
  }
`;

export const ContainerLoadingModal = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  min-height: 360px;
  margin: auto;
  color: #f8f8f2;
  padding-top: 2rem;

  &::after {
    content: '';
    background: transparent url('/load-max.svg') center center no-repeat;
    height: calc(100% - 100px);
    width: 100%;
    position: absolute;
    top: 70px;
  }
`;

export const ButtonDelete = styled.button`
  position: absolute;
  background-color: #f92672;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 8px;
  border: none;
  width: 25px;
  height: 25px;
  color: #ffffff;
  right: 0;
  top: 0;
  z-index: 9;
  display: none;
`;
