import React from "react";
import Draggable from "react-draggable";

import * as S from "./styled";

const Preview: React.FC = () => {
  return (
    <Draggable>
      <S.Container>
        <p>preview</p>
      </S.Container>
    </Draggable>
  );
};

export default Preview;
