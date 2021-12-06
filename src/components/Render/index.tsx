import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useEngine } from '../../hooks/engine';
import Agent from '../Agent';
import { useAssets } from '../../hooks/assets';

import * as S from './styled';

const Render = () => {
  const { pages, agents, errors, sceneIndex } = useEngine();
  const { getFilePath } = useAssets();

  const [render, setRender] = useState({} as any);
  const [currentScene, setCurrentScene] = useState(sceneIndex);
  const renderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errors.length === 0 || sceneIndex !== currentScene) {
      const renderScene = {
        background: pages?.[sceneIndex].background,
        soundtrack: pages?.[sceneIndex].soundtrack,
        title: pages?.[sceneIndex].title,
        agents: agents?.[sceneIndex],
      };

      console.log('Clear Stage 🖌️');

      setRender(renderScene);
      setCurrentScene(sceneIndex);
      console.log('Render Scene 💻');
    } else {
      console.log('Has Error 🚨');
    }
  }, [agents, sceneIndex, pages, getFilePath, errors.length, currentScene]);

  return (
    <S.Render ref={renderRef} tabIndex={1}>
      {errors.length > 0 ? (
        <S.ErrorContainer>
          {errors.map((error: any, i: number) => (
            <S.ErrorMessage key={i}>{error}</S.ErrorMessage>
          ))}
        </S.ErrorContainer>
      ) : (
        <>
          {render.soundtrack && (
            <audio
              controls={false}
              autoPlay
              loop={true}
              src={render.soundtrack}
            />
          )}
          {render?.background && (
            <S.BackgroundScene
              width={500}
              height={500}
              src={render.background}
              draggable={false}
              alt="ola"
            />
          )}

          {render?.title && <h2>{render.title}</h2>}
          {render?.agents?.map((agent: any, i: number) => (
            <Agent
              key={agent.id}
              id={agent.id}
              img={agent.attributes.img}
              video={agent.attributes.video}
              sprite={agent.attributes.sprite}
              text={agent.attributes.text}
              nextState={agent.attributes['on-touch']}
              trigger={agent.attributes['on-trigger']}
              triggerDrop={agent.attributes['drop-zone']}
              onDrop={agent.attributes['on-drop']}
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
            />
          ))}
        </>
      )}
    </S.Render>
  );
};

export default Render;
