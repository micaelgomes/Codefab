import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Text, Image } from 'react-konva';
import { Stage as StageType } from 'konva/types/Stage';
import { useEngine } from '../../hooks/engine';
import { renderHTMLImageElement } from '../../utils/renderElement';
import Agent from '../Agent';
import ErrorBoundary from '../../hocs/ErrorBoundary';
import { useAssets } from '../../hooks/assets';

const Render = () => {
  const { scenes, agents, sceneIndex, previewOpen } = useEngine();
  const { getFilePath } = useAssets();

  const [render, setRender] = useState({} as any);
  const stageRef = useRef<StageType>(null);
  const bgScene = getFilePath(scenes?.[sceneIndex].background);

  const [propsScreen] = useState({
    with: 500,
    height: 500,
  });

  useEffect(() => {
    console.log('Clear Stage 🖌️');
    stageRef.current?.clear();

    const renderScene = {
      background: renderHTMLImageElement(bgScene),
      sound: scenes?.[sceneIndex].sound,
      title: scenes?.[sceneIndex].title,
      agents: agents?.[sceneIndex],
    };

    setRender(renderScene);
    console.log('Render Scene 💻');
  }, [agents, bgScene, sceneIndex, scenes]);

  useEffect(() => {
    if (!previewOpen) {
      stageRef.current?.clear();
    }
  }, [previewOpen]);

  return (
    <>
      <Stage
        ref={stageRef}
        tabIndex={1}
        width={propsScreen.with}
        height={propsScreen.height}
      >
        <Layer>
          <ErrorBoundary container={stageRef}>
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
                key={agent.id}
                id={agent.id}
                img={getFilePath(agent.attributes.img)}
                sprite={getFilePath(agent.attributes.sprite)}
                text={agent.attributes.text}
                nextState={agent.attributes['on-touch']}
                height={Number(agent.attributes.height)}
                width={Number(agent.attributes.width)}
                x={Number(agent.attributes.x)}
                y={Number(agent.attributes.y)}
                repeat={[
                  Number(agent.attributes['repeat-x']),
                  Number(agent.attributes['repeat-y']),
                ]}
                states={agent.states}
                animationName={agent.attributes['animation-name']}
                frameCount={Number(agent.attributes['frame-count'])}
                animation={agent.attributes['animation']}
                hasKeyboard={agent.attributes['on-press']}
                draggable={Boolean(agent.attributes['draggable'])}
                stageRef={stageRef}
              />
            ))}
          </ErrorBoundary>
        </Layer>
      </Stage>
    </>
  );
};

export default Render;
