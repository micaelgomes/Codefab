import React from "react";

import * as S from "./styled";
import Navbar from "../../components/Navbar";
import Sidenav from "../../components/Sidenav";

const code = `
<?xml version="1.0"?>
<!DOCTYPE smil PUBLIC "-//W3C//DTD SMIL 2.0//EN" "http://www.w3.org/2001/SMIL20/SMIL20.dtd">
<smil xmlns="http://www.w3.org/2001/SMIL20/Language">
  <head>
  </head>
  <body>
    <img src="dart.jpeg" alt="Dart pai" dur="10s"/>
    <img src="leia.jpeg" alt="Leia sorrindo" dur="7s"/>
    <par>
      <img src="luke.jpeg" alt="Luke bolado" dur="5s"/>
      <video src="video.mp4" dur="2s"/>
    </par>
  </body>
</smil>
`;

const Editor: React.FC = () => {
  return (
    <S.Container>
      <Navbar />

      <S.Content>
        <Sidenav />

        <S.Playground
          value={code}
          options={{
            theme: "monokai",
            tabSize: 2,
            keyMap: "sublime",
            mode: "xml",
            renderLine: true,
          }}
        />
      </S.Content>
    </S.Container>
  );
};

export default Editor;
