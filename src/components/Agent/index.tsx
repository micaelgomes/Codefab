import { Image as ImageKonva } from 'konva/types/shapes/Image';
import React, { useRef, useEffect, useState } from 'react';
import { Image, Sprite, Text } from 'react-konva';
import { renderHTMLImageElement } from '../../utils/renderElement';

export interface AgentProps {
  id: number;
  height: number;
  img: string;
  sprite: string;
  text: string;
  nextState: string;
  width: number;
  x: number;
  y: number;
  repeat: number[];
  states: Array<any>;
  actionAgent(id: number, nextState: string): void;
}

const Agent: React.FC<AgentProps> = ({
  id,
  img,
  sprite,
  text,
  nextState,
  height,
  width,
  x,
  y,
  repeat,
  states,
  actionAgent,
}) => {
  const spriteRef = useRef<any>(null);
  const textRef = useRef<any>(null);
  const imgRef = useRef<ImageKonva>(null);

  const animations = {
    run: [
      0, 0, 164, 113, 164, 0, 164, 113, 328, 0, 164, 113, 492, 0, 164, 113, 656,
      0, 164, 113, 820, 0, 164, 113,
    ],
  };

  const [state, setState] = useState(nextState);

  const actions = () => {
    if (states.length > 0) {
      // actionAgent(id, nextState);
      const posNewAttr = states.map((state: any) => state.name).indexOf(state);

      if (posNewAttr >= 0) {
        // console.log('ACTIONS IN AGENT HAS AGENT');
        console.log(states?.[posNewAttr]?.attributes?.img);
        console.log(states?.[posNewAttr]?.attributes?.['on-touch']);
        // console.log(imgRef.current);
        setState(states?.[posNewAttr]?.attributes?.['on-touch']);

        const srcImage = states?.[posNewAttr]?.attributes?.img;

        if (imgRef.current) {
          imgRef.current.attrs.image.src = srcImage;
        }
      }
    } else {
      console.log('NO STATES TO DISPATCH ACTIONS');
    }
  };

  useEffect(() => {
    spriteRef.current?.start();
  }, []);

  return (
    <>
      {img && (
        <Image
          ref={imgRef}
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
          ref={textRef}
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
