import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  background: #fff;
  width: 500px;
  height: 500px;
  cursor: move;

  padding: 0;
  border-radius: 11px;

  z-index: 9999999;
  top: 100px;
  right: 16px;
  margin: auto;
  user-select: none;

  box-shadow: 0 0 4px 0 rgb(0 0 0 / 15%);

  canvas {
    border-radius: 10px;
  }
`;
