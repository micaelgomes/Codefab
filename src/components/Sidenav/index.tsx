import React from "react";

import * as S from "./styled";
import { useEffect } from "react";


const Sidenav: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <S.Container>
      <p style={{margin: 16}}>Sidenav</p>
    </S.Container>
  );
};

export default Sidenav;
