import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Image, Sprite } from 'react-konva';
import { renderHTMLImageElement } from '../../utils/renderElement';

// import { Container } from './styles';

export interface AgentProps {
  height: number;
  img: string;
  sprite: string;
  intialState: string;
  name: string;
  width: number;
  x: number;
  y: number;
  states: any;
}

const Agent: React.FC<AgentProps> = ({
  img,
  sprite,
  name,
  intialState,
  height,
  width,
  x,
  y,
  states,
}) => {
  const [agent] = useState({
    img,
    sprite,
    name,
    intialState,
    height,
    width,
    x,
    y,
    states,
    onTouch: () => {},
  });

  // console.log(agent.states);
  // console.log(agent.intialState);

  const spriteRef = useRef<any>(null);
  const animations = {
    run: [
      0, 0, 164, 113, 164, 0, 164, 113, 328, 0, 164, 113, 492, 0, 164, 113, 656,
      0, 164, 113, 820, 0, 164, 113,
    ],
  };

  useEffect(() => {
    spriteRef.current?.start();
  }, [agent.sprite]);

  useEffect(() => {
    if (!!agent.intialState) {
      agent.onTouch = () => alert('onClick');
      console.log(agent);
    }
  }, [agent]);

  return (
    <>
      {img ? (
        <Image
          image={renderHTMLImageElement(agent.img)}
          height={agent.height}
          width={agent.width}
          x={agent.x}
          y={agent.y}
          onClick={agent.onTouch}
        />
      ) : (
        <Sprite
          ref={spriteRef}
          height={agent.height}
          width={agent.width}
          x={agent.x}
          y={agent.y}
          image={renderHTMLImageElement(agent.sprite) as HTMLImageElement}
          animation="run"
          animations={animations}
          frameRate={7}
          frameIndex={0}
        />
      )}
    </>
  );
};

export default Agent;
