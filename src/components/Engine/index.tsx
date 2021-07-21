import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Text, Image, Sprite } from 'react-konva';
import useImage from 'use-image';
import { SceneDTO, useEngine } from '../../hooks/engine';

import runSpriteSrc from '../../assets/run.png';

const Engine = () => {
  const { scenes, sceneIndex } = useEngine();
  const [render, setRender] = useState<SceneDTO>({} as SceneDTO);
  const [background] = useImage(`/${scenes?.[sceneIndex].background}`);
  const [start, setStart] = useState<boolean>(false);

  const [propsScreen] = useState({
    with: 500,
    height: 500,
  });

  const [runSprite] = useImage(runSpriteSrc);
  const spriteRef = useRef<any>(null);
  const animations = {
    run: [
      0, 0, 135, 135, 260, 0, 135, 135, 395, 0, 135, 135, 530, 0, 135, 135, 665,
      0, 135, 135, 800, 0, 135, 135,
    ],
  };

  useEffect(() => {
    const renderScene = {
      background,
      sound: scenes?.[sceneIndex].sound,
      title: scenes?.[sceneIndex].title,
    };

    setRender(renderScene);
    setStart(true);

    spriteRef.current?.start();
  }, [background, sceneIndex, scenes]);

  return (
    <Stage width={propsScreen.with} height={propsScreen.height}>
      <Layer>
        {start && (
          <Text
            x={180}
            y={230}
            fontStyle="bold"
            fontFamily="Helvetica, sans-serif"
            fontSize={24}
            text={'Run Preview!'}
          />
        )}
        {render.background && (
          <Image width={500} height={500} image={render.background} />
        )}
        {render.title && (
          <Text
            x={50}
            y={50}
            fontSize={24}
            fontFamily="Press Start 2P"
            text={render.title}
          />
        )}
        {start && (
          <Sprite
            ref={spriteRef}
            x={50}
            y={350}
            width={200}
            height={200}
            image={runSprite as HTMLImageElement}
            animation="run"
            animations={animations}
            frameRate={7}
            frameIndex={0}
          />
        )}
      </Layer>
    </Stage>
  );
};

export default Engine;
