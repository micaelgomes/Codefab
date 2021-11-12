import React, { useRef, useCallback, useState } from 'react';
import { Text } from 'react-konva';
import { Text as TextKonva } from 'konva/types/shapes/Text';

interface TextProps {
  id: number;
  height: number;
  text: string;
  color: string;
  fontSize: number;
  nextState: string;
  width: number;
  x: number;
  y: number;
  states: Array<any>;
  container: HTMLDivElement | undefined;
}

const TextAgent: React.FC<TextProps> = ({
  id,
  text,
  nextState,
  height,
  width,
  x,
  y,
  states,
  container,
  color,
  fontSize,
}) => {
  const textRef = useRef<TextKonva>(null);

  const [textState, setTextState] = useState({
    text,
    x,
    y,
    width,
    nextState,
  });

  const action = useCallback(() => {
    if (states.length > 0) {
      const posNewAttr = states
        .map((state: any) => state.name)
        .indexOf(nextState);

      if (posNewAttr >= 0) {
        setTextState({
          ...textState,
          ...states?.[posNewAttr]?.attributes,
          nextState: states?.[posNewAttr]?.attributes?.['on-touch'],
        });

        if (textRef.current) {
          textRef.current.x(textState.x);
          textRef.current.y(textState.y);
          textRef.current.width(textState.width);
          textRef.current.text(textState.text);
        }
      }
    }
  }, [nextState, states, textState]);

  return (
    <Text
      ref={textRef}
      fontSize={fontSize || 16}
      fill={color}
      align={'left'}
      fontFamily="Press Start 2P"
      text={text}
      x={x}
      y={y}
      wrap="word"
      width={width}
      onClick={action}
    />
  );
};

export default TextAgent;
