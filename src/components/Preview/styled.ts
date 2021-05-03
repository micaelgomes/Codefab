import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  background: #fff;
  width: 400px;
  height: 300px;
  cursor: move;

  padding: 1rem;
  border-radius: 5px;

  z-index: 9999999;
  top: 16px;
  right: 16px;
  margin: auto;
  user-select: none;
`;
