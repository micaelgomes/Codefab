import React from 'react';
import { useState, useEffect } from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';
import { useEngine } from '../../hooks/engine';
import { renderHTMLImageElement } from '../../utils/renderElement';
import Agent from '../Agent';

const Render = () => {
  const { scenes, agents, sceneIndex } = useEngine();
  const [render, setRender] = useState({} as any);
  const [start, setStart] = useState<boolean>(false);

  const [propsScreen] = useState({
    with: 500,
    height: 500,
  });

  useEffect(() => {
    const renderScene = {
      background: renderHTMLImageElement(scenes?.[sceneIndex].background),
      sound: scenes?.[sceneIndex].sound,
      title: scenes?.[sceneIndex].title,
      agents: agents?.[sceneIndex],
    };

    setRender(renderScene);
    setStart(true);
  }, [agents, sceneIndex, scenes]);

  return (
    <>
      <audio controls={false}>
        <source src="horse.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

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
            <Agent
              key={i}
              img={agent.attributes.img}
              sprite={agent.attributes.sprite}
              name={agent.attributes.name}
              intialState={agent.attributes['intial-state']}
              height={Number(agent.attributes.height)}
              width={Number(agent.attributes.width)}
              x={Number(agent.attributes.x)}
              y={Number(agent.attributes.y)}
              states={agent.states}
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
};

export default Render;
