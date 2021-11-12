import React, { RefObject } from 'react';
import { Stage } from 'konva/types/Stage';

import Image from './Image';
import Sprite from './Sprite';
import Text from './Text';

export interface AgentProps {
  id: number;
  height: number;
  img: string;
  sprite: string;
  text: string;
  nextState: string;
  width: number;
  color: string;
  fontSize: number;
  x: number;
  y: number;
  repeat: number[];
  states: Array<any>;
  animationName: string;
  frameCount: number;
  animation: string;
  hasKeyboard: boolean;
  draggable: boolean;
  stageRef: RefObject<Stage>;
  emit(name: string, data: any): any;
  sub(trigger: string, id: unknown): any;
  trigger: string;
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
  animationName,
  frameCount,
  animation,
  hasKeyboard,
  stageRef,
  draggable,
  color,
  fontSize,
  emit,
  sub,
  trigger,
}) => {
  const container = stageRef.current?.container();

  try {
    if (sprite && !animation && !animationName && !frameCount) {
      throw new Error('Sprite require animation && animationName!');
    }
  } catch (err) {
    console.log(err);
  }

  return (
    <>
      {img && (
        <Image
          id={id}
          imageSrc={img}
          height={height}
          width={width}
          x={x}
          y={y}
          repeat={repeat}
          states={states}
          nextState={nextState}
          hasKeyboard={hasKeyboard}
          container={container}
          draggable={draggable}
          emit={emit}
          sub={sub}
          trigger={trigger}
        />
      )}

      {sprite && (
        <Sprite
          id={id}
          height={height}
          width={width}
          x={x}
          y={y}
          states={states}
          spriteSrc={sprite}
          hasKeyboard={hasKeyboard}
          container={container}
          animationName={animationName}
          frameCount={frameCount}
          animation={animation}
        />
      )}

      {text && (
        <Text
          id={id}
          text={text}
          x={x}
          y={y}
          width={width}
          color={color}
          fontSize={fontSize}
          height={height}
          nextState={nextState}
          states={states}
          container={container}
        />
      )}
    </>
  );
};

export default Agent;
