import React from 'react';
import { useState, useEffect } from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';
import { useEngine } from '../../hooks/engine';
import { renderHTMLImageElement } from '../../utils/renderElement';
import Agent from '../Agent';

const Render = () => {
  const { scenes, agents, sceneIndex, actionAgent } = useEngine();
  const [render, setRender] = useState({} as any);

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
  }, [agents, sceneIndex, scenes]);

  return (
    <>
      <Stage width={propsScreen.with} height={propsScreen.height}>
        <Layer>
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
              id={agent.id}
              img={agent.attributes.img}
              sprite={agent.attributes.sprite}
              text={agent.attributes.text}
              newState={agent.attributes['on-touch']}
              height={Number(agent.attributes.height)}
              width={Number(agent.attributes.width)}
              x={Number(agent.attributes.x)}
              y={Number(agent.attributes.y)}
              repeat={[
                Number(agent.attributes['repeat-x']),
                Number(agent.attributes['repeat-y']),
              ]}
              states={agent.states}
              actionAgent={actionAgent}
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
};

export default Render;
