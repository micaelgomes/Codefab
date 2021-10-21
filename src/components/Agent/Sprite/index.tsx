import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Sprite } from 'react-konva';
import { Sprite as SpriteKonva } from 'konva/types/shapes/Sprite';
import { renderHTMLImageElement } from '../../../utils/renderElement';

export interface SpriteProps {
  id: number;
  height: number;
  spriteSrc: string;
  width: number;
  x: number;
  y: number;
  states: Array<any>;
  animationName: string;
  frameCount: number;
  animation: string;
  hasKeyboard: boolean;
  container: HTMLDivElement | undefined;
}

const SpriteAgent: React.FC<SpriteProps> = ({
  id,
  spriteSrc,
  height,
  width,
  x,
  y,
  states,
  hasKeyboard,
  animationName,
  frameCount,
  animation,
  container,
}) => {
  const spriteRef = useRef<SpriteKonva>(null);

  const generateAnimations = (
    name: string,
    count: number,
    animation: string,
  ) => {
    const animations: any = {};

    if (name && count && animation) {
      const tmpAnimation: number[] = animation
        .split(',')
        .map(num => Number(num));

      animations[animationName] = tmpAnimation;
    }

    return animations;
  };

  const [spriteState, setSpriteState] = useState({
    spriteSrc,
    x,
    y,
    width,
    height,
    animation,
    animationName,
    frameCount,
  });

  const actionFromKeyboard = useCallback(
    (e: KeyboardEvent) => {
      if (hasKeyboard && states.length > 0) {
        const key = e.code;
        const posNewAttr = states.map((state: any) => state.name).indexOf(key);

        if (posNewAttr >= 0) {
          setSpriteState({
            ...spriteState,
            ...states?.[posNewAttr]?.attributes,
          });

          console.log(states?.[posNewAttr]?.attributes);

          if (spriteRef.current) {
            console.log(spriteState);

            const newSprite = renderHTMLImageElement(spriteState.spriteSrc);

            // spriteRef.current.image(newSprite);
            spriteRef.current.x(spriteRef.current.x() + Number(spriteState.x));
            // spriteRef.current.y(spriteRef.current.y() + Number(spriteState.y));
            // spriteRef.current.width(spriteState.width);
            // spriteRef.current.height(spriteState.height);

            console.log(spriteRef.current);
          }
        }
      }
    },
    [hasKeyboard, spriteState, states],
  );

  useEffect(() => {
    spriteRef.current?.start();

    container?.addEventListener('keydown', actionFromKeyboard);
  }, [actionFromKeyboard, container]);

  return (
    <Sprite
      ref={spriteRef}
      height={height}
      width={width}
      x={x}
      y={y}
      image={renderHTMLImageElement(spriteSrc)}
      animation={animationName}
      animations={generateAnimations(animationName, frameCount, animation)}
      frameRate={7}
      frameIndex={0}
    />
  );
};

export default SpriteAgent;
