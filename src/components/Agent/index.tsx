import React, { RefObject } from 'react';

import Image from './Image';
import Sprite from './Sprite';
// import Text from './Text';

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
  frameCount: number;
  fps: number;
  hasKeyboard: boolean;
  draggable: boolean;
  renderRef: RefObject<HTMLDivElement>;
  emit(name: string, data: any): any;
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
  frameCount,
  fps,
  hasKeyboard,
  renderRef,
  draggable,
  color,
  fontSize,
  emit,
  trigger,
}) => {
  // const container = stageRef.current?.container();

  try {
    if (!sprite && !img && !text) {
      throw new Error(`${id} has missing -> !sprite || img || text`);
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
          draggable={draggable}
          emit={emit}
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
          nextState={nextState}
          spriteSrc={sprite}
          hasKeyboard={hasKeyboard}
          frameCount={frameCount}
          fps={fps}
          renderRef={renderRef}
        />
      )}

      {/*{text && (
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
      )} */}
    </>
  );
};

export default Agent;
