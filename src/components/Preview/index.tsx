import React from "react";
import Draggable from "react-draggable";
import Engine from "../Engine";

import * as S from "./styled";

const Preview: React.FC = () => {
  return (
    <Draggable>
      <S.Container>
        <Engine />
      </S.Container>
    </Draggable>
  );
};

export default Preview;
