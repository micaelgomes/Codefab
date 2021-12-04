import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useEngine } from '../../hooks/engine';
import Agent from '../Agent';
import { useAssets } from '../../hooks/assets';

import * as S from './styled';

const Render = () => {
  const { pages, agents, errors, sceneIndex, previewOpen, emit } = useEngine();
  const { getFilePath } = useAssets();

  const [render, setRender] = useState({} as any);
  const [currentScene, setCurrentScene] = useState(sceneIndex);
  const renderRef = useRef<HTMLDivElement>(null);

  // const [propsScreen] = useState({
  //   with: 500,
  //   height: 500,
  // });

  useEffect(() => {
    if (errors.length === 0 || sceneIndex !== currentScene) {
      const renderScene = {
        background: pages?.[sceneIndex].background,
        sound: pages?.[sceneIndex].sound,
        title: pages?.[sceneIndex].title,
        agents: agents?.[sceneIndex],
      };

      // stageRef.current?.clear();
      console.log('Clear Stage 🖌️');

      setRender(renderScene);
      setCurrentScene(sceneIndex);
      console.log('Render Scene 💻');
    } else {
      console.log('Has Error 🚨');
    }
  }, [agents, sceneIndex, pages, getFilePath, errors.length, currentScene]);

  useEffect(() => {
    if (!previewOpen) {
      // stageRef.current?.clear();
    }
  }, [previewOpen]);

  return (
    <S.Render ref={renderRef}>
      {errors.length > 0 ? (
        <>
          {/* {errors.map((error: any, i: number) => (
                <Text key={i} x={10} y={20 * (i + 1)} text={error} fill="red" />
              ))} */}
        </>
      ) : (
        <>
          {render.background && (
            <S.BackgroundScene
              width={500}
              height={500}
              src={render.background}
              draggable={false}
              alt="ola"
            />
          )}
          {render.title && <h2>{render.title}</h2>}
          {render?.agents?.map((agent: any, i: number) => (
            <Agent
              key={agent.id}
              id={agent.id}
              img={agent.attributes.img}
              sprite={agent.attributes.sprite}
              text={agent.attributes.text}
              nextState={agent.attributes['on-touch']}
              trigger={agent.attributes['on-trigger']}
              height={Number(agent.attributes.height)}
              width={Number(agent.attributes.width)}
              color={agent.attributes.color}
              fontSize={Number(agent.attributes['font-size'])}
              x={Number(agent.attributes.x)}
              y={Number(agent.attributes.y)}
              repeat={[
                Number(agent.attributes['repeat-x']),
                Number(agent.attributes['repeat-y']),
              ]}
              states={agent.states}
              frameCount={Number(agent.attributes['frame-count'])}
              fps={Number(agent.attributes['fps'])}
              hasKeyboard={agent.attributes['on-press']}
              draggable={Boolean(agent.attributes['draggable'])}
              renderRef={renderRef}
              emit={emit}
            />
          ))}
        </>
      )}
    </S.Render>
  );
};

export default Render;
