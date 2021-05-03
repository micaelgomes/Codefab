import React, { useEffect, useRef } from "react";
import { Stage, Layer, Text, Sprite } from "react-konva";
// import Konva from "konva";

import useImage from "use-image";
import pathSprite from "./assets/run.png";
import pathSpriteAttack from "./assets/attack.png";

const animations = {
  run: [
    0,
    0,
    135,
    135,
    270,
    0,
    135,
    135,
    405,
    0,
    135,
    135,
    540,
    0,
    135,
    135,
    675,
    0,
    135,
    135,
  ],
};

const Engine = () => {
  const [sprite] = useImage(pathSprite);
  const [attack] = useImage(pathSpriteAttack);

  const spriteRef = useRef<any>(null);
  const attackRef = useRef<any>(null);

  useEffect(() => {
    if (spriteRef.current) {
      spriteRef.current.start();
      attackRef.current.start();
    }
  }, [spriteRef]);

  return (
    <Stage width={window.innerWidth - 16} height={window.innerHeight - 16}>
      <Layer>
        <Text text="Runnig..." />
        {/* 
        <Sprite
          key="sprite"
          image={sprite}
          ref={spriteRef}
          animation="run"
          frameRate={10}
          frameIndex={0}
          animations={animations}
          x={0}
          y={0}
        />

        <Sprite
          key="atack"
          image={attack}
          ref={attackRef}
          animation="run"
          frameRate={10}
          frameIndex={0}
          animations={animations}
          x={0}
          y={200}
        /> */}
      </Layer>
    </Stage>
  );
};

export default Engine;
