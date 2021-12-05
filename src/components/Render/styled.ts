import styled from 'styled-components';

export const Render = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 500px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const BackgroundScene = styled.img`
  user-select: none;
`;

export const ErrorContainer = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  width: 100%;
  padding: 0.5rem;
`;

export const ErrorMessage = styled.li`
  color: red;
  font-size: 16px;
  font-family: monospace;
  font-weight: 600;
`;
