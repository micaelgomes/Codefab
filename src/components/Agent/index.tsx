import React, { useRef } from 'react';
import { useEffect } from 'react';
import { Image, Sprite, Text } from 'react-konva';
import { renderHTMLImageElement } from '../../utils/renderElement';

export interface AgentProps {
  id: number;
  height: number;
  img: string;
  sprite: string;
  text: string;
  newState: string;
  name: string;
  width: number;
  x: number;
  y: number;
  states: Array<any>;
  actionAgent(id: number, newState: string): void;
}

const Agent: React.FC<AgentProps> = ({
  id,
  img,
  sprite,
  text,
  name,
  newState,
  height,
  width,
  x,
  y,
  states,
  actionAgent,
}) => {
  const spriteRef = useRef<any>(null);
  const animations = {
    run: [
      0, 0, 164, 113, 164, 0, 164, 113, 328, 0, 164, 113, 492, 0, 164, 113, 656,
      0, 164, 113, 820, 0, 164, 113,
    ],
  };

  useEffect(() => {
    spriteRef.current?.start();
  }, []);

  const actions = () => {
    if (states.length > 0) {
      actionAgent(id, newState);
    } else {
      console.log('NO STATES TO DISPATCH ACTIONS');
    }
  };

  return (
    <>
      {img && (
        <Image
          image={renderHTMLImageElement(img)}
          height={height}
          width={width}
          x={x}
          y={y}
          onClick={actions}
        />
      )}

      {sprite && (
        <Sprite
          ref={spriteRef}
          height={height}
          width={width}
          x={x}
          y={y}
          image={renderHTMLImageElement(sprite) as HTMLImageElement}
          animation="run"
          animations={animations}
          frameRate={7}
          frameIndex={0}
          onClick={actions}
        />
      )}

      {text && (
        <Text
          fontSize={16}
          align={'left'}
          fontFamily="Press Start 2P"
          text={text}
          x={x}
          y={y}
          wrap="word"
          width={width}
          onDblClick={() => {}}
          onClick={actions}
        />
      )}
    </>
  );
};

export default Agent;
