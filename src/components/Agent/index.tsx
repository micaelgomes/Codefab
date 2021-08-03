import { Image as ImageKonva } from 'konva/types/shapes/Image';
import { Sprite as SpriteKonva } from 'konva/types/shapes/Sprite';
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
  hasKeyboard: boolean;
  keyPressed: string;
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
  hasKeyboard,
  keyPressed,
  actionAgent,
}) => {
  const spriteRef = useRef<SpriteKonva>(null);
  const textRef = useRef<any>(null);
  const imgRef = useRef<ImageKonva>(null);

  const animations = {
    idle: [
      0, 0, 164, 113, 164, 0, 164, 113, 328, 0, 164, 113, 492, 0, 164, 113, 656,
      0, 164, 113, 820, 0, 164, 113,
    ],
    run: [
      0, 0, 164, 113, 164, 0, 164, 113, 328, 0, 164, 113, 492, 0, 164, 113, 656,
      0, 164, 113, 820, 0, 164, 113, 984, 0, 164, 113, 1148, 0, 164, 113,
    ],
  };

  const [state, setState] = useState(nextState);

  const actionImage = () => {
    if (states.length > 0) {
      const posNewAttr = states.map((state: any) => state.name).indexOf(state);

      if (posNewAttr >= 0) {
        setState(states?.[posNewAttr]?.attributes?.['on-touch']);

        if (imgRef.current) {
          imgRef.current.attrs.image.src =
            states?.[posNewAttr]?.attributes?.img;
        }
      }
    }
  };

  useEffect(() => {
    spriteRef.current?.start();
  }, []);

  useEffect(() => {
    if (hasKeyboard) {
      if (keyPressed === 'KeyD') {
        console.log(id + ' - ' + keyPressed);

        if (spriteRef.current) {
          spriteRef.current.attrs.image.src = 'run.png';
        }

        spriteRef.current?.animation('run');
      } else {
        if (spriteRef.current) {
          spriteRef.current.attrs.image.src = 'idle.png';
        }

        spriteRef.current?.animation('idle');
      }
    }
  }, [hasKeyboard, id, keyPressed]);

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
          onClick={actionImage}
        />
      )}

      {sprite && (
        <Sprite
          ref={spriteRef}
          height={height}
          width={width}
          x={x}
          y={y}
          image={renderHTMLImageElement(sprite)}
          animation="idle"
          animations={animations}
          frameRate={7}
          frameIndex={0}
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
          onClick={() => {}}
        />
      )}
    </>
  );
};

export default Agent;
