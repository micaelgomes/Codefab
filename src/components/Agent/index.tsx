import React, { RefObject } from 'react';

import Image from './Image';
import Sprite from './Sprite';
import Text from './Text';
import Video from './Video';

export interface AgentProps {
  id: number;
  height: number;
  img: string;
  sprite: string;
  video: string;
  text: string;
  nextState: string;
  onDrop: string;
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
  trigger: string;
  triggerDrop: string;
}

const Agent: React.FC<AgentProps> = ({
  id,
  img,
  sprite,
  text,
  nextState,
  onDrop,
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
  trigger,
  triggerDrop,
  video,
}) => (
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
        onDrop={onDrop}
        hasKeyboard={hasKeyboard}
        draggable={draggable}
        trigger={trigger}
        triggerDrop={triggerDrop}
        renderRef={renderRef}
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
        trigger={trigger}
      />
    )}

    {video && (
      <Video
        id={id}
        videoSrc={video}
        height={height}
        width={width}
        x={x}
        y={y}
        draggable={draggable}
        renderRef={renderRef}
      />
    )}
  </>
);

export default Agent;
