import styled, { css } from 'styled-components';

interface ContainerProps {
  open: boolean;
}

export const Container = styled.div<ContainerProps>`
  max-width: 0;
  width: 100%;
  background: #3e3d32;
  color: white;
  overflow: hidden;

  ${props =>
    props.open &&
    css`
      max-width: 350px;
    `}
`;

export const Title = styled.h3`
  margin: 16px;
  display: flex;
  align-items: center;
  font-weight: 600;

  svg {
    margin-right: 4px;
  }
`;

export const ContainerDragNDrop = styled.section`
  cursor: pointer;
  margin: 1rem;
  border: 2px dashed #cfcfc2;
  border-radius: 4px;
  padding: 1rem;
  padding-right: 0.5rem;

  display: flex;
  flex-direction: column;
  height: calc(100% - 100px);
`;

export const isEmpty = styled.div`
  margin: auto;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    color: #cfcfc2;
    margin-bottom: 32px;
  }
`;

export const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  margin-bottom: 32px;
  margin-right: 8px;
  width: 130px;
  height: 120px;
  box-sizing: border-box;
  position: relative;

  button {
    position: absolute;
    background: transparent;
    border: none;
    z-index: 0;
    color: #cfcfc2;
    right: 18px;
    top: 8px;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }

    &::before {
      content: '';
      position: absolute;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: red;
      z-index: -1;
      top: -1px;
      left: -1px;
    }
  }
`;

export const InputFileBefore = styled.div`
  padding: 1rem;
  border: 1px solid #cfcfc2;
  margin: 0.3rem;
  margin-right: 0.75rem;
  margin-top: 3rem;
  border-radius: 4px;
  text-align: center;
  height: 90px;
`;

export const ThumbInner = styled.div`
  display: block;
  text-align: center;

  small {
    font-family: monospace;
    font-weight: 500;
  }
`;

export const ThumbImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: scale-down;
`;

export const ListFiles = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto;

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

export const ContentFiles = styled.div`
  height: calc(100% - 100px);
  display: flex;
`;
