import React from 'react';
import { useState, useEffect } from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';
import useImage from 'use-image';
import { SceneDTO, useEngine } from '../../hooks/engine';
// import Agent from '../Agent';

const Engine = () => {
  const { scenes, agents, sceneIndex } = useEngine();
  const [render, setRender] = useState<SceneDTO>({} as SceneDTO);
  const [background] = useImage(`/${scenes?.[sceneIndex].background}`);
  const [start, setStart] = useState<boolean>(false);

  const [agentImage] = useImage(`/${agents?.[0]?.attributes?.img}`);

  const [propsScreen] = useState({
    with: 500,
    height: 500,
  });

  useEffect(() => {
    const renderScene = {
      background,
      sound: scenes?.[sceneIndex].sound,
      title: scenes?.[sceneIndex].title,
      agents,
    };

    setRender(renderScene);
    setStart(true);
  }, [agents, background, sceneIndex, scenes]);

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
        {agents?.map((agent: any, i: number) => (
          <Image
            key={i}
            image={agentImage}
            height={Number(agent.attributes.height)}
            width={Number(agent.attributes.width)}
            x={Number(agent.attributes.x)}
            y={Number(agent.attributes.y)}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Engine;
