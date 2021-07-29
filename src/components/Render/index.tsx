import React from 'react';
import { useState, useEffect } from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';
import { useEngine } from '../../hooks/engine';
// import Agent from '../Agent';

const Render = () => {
  const { scenes, agents, sceneIndex } = useEngine();
  const [render, setRender] = useState({} as any);
  const [start, setStart] = useState<boolean>(false);

  const renderImage = (imageSrc: string) => {
    const image = new window.Image();
    image.src = `/${imageSrc}`;

    return image;
  };

  const [propsScreen] = useState({
    with: 500,
    height: 500,
  });

  useEffect(() => {
    const renderScene = {
      background: renderImage(scenes?.[sceneIndex].background),
      sound: scenes?.[sceneIndex].sound,
      title: scenes?.[sceneIndex].title,
      agents: agents?.[sceneIndex],
    };

    setRender(renderScene);
    setStart(true);
  }, [agents, sceneIndex, scenes]);

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
        {render?.agents?.map((agent: any, i: number) => (
          <Image
            key={i}
            image={renderImage(agent.attributes.img)}
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

export default Render;
