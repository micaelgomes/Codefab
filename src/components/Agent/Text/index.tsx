import React, { useCallback, useState, useEffect } from 'react';
import { useCustomEventListener } from 'react-custom-events';
import { useEngine } from '../../../hooks/engine';
import * as S from './styled';

interface TextProps {
  id: number;
  height: number;
  text: string;
  color: string;
  fontSize: number;
  nextState: string;
  trigger: string;
  width: number;
  x: number;
  y: number;
  states: Array<any>;
}

const TextAgent: React.FC<TextProps> = ({
  id,
  text,
  nextState,
  trigger,
  height,
  width,
  x,
  y,
  states,
  color,
  fontSize,
}) => {
  const { emit } = useEngine();
  const [errors, setErrors] = useState<any>([]);
  const [textState, setTextState] = useState({
    text,
    x,
    y,
    width,
    height,
    nextState,
    fontSize,
    color,
  });

  const action = useCallback(
    trigger => {
      if (states.length > 0) {
        const posNewAttr = states
          .map((state: any) => state.name)
          .indexOf(trigger);

        if (posNewAttr >= 0) {
          setTextState({
            ...textState,
            ...states?.[posNewAttr]?.attributes,
            nextState: states?.[posNewAttr]?.attributes?.['on-touch'],
          });
        }
      }
    },
    [states, textState],
  );

  const actionClick = useCallback(() => {
    if (states.length > 0) {
      const posNewAttr = states
        .map((state: any) => state.name)
        .indexOf(textState.nextState);

      if (posNewAttr >= 0) {
        setTextState({
          ...textState,
          ...states?.[posNewAttr]?.attributes,
          nextState: states?.[posNewAttr]?.attributes?.['on-touch'],
        });
      }
    }
  }, [states, textState]);

  useCustomEventListener(trigger, () => {
    action(trigger);
  });

  useEffect(() => {
    if (!x || !y) {
      const tmpErrors = errors;
      tmpErrors.push(`Agente está sem (x, y)`);
      setErrors(tmpErrors);
    }
  }, [errors, height, width, x, y]);

  return (
    <>
      {textState && (
        <>
          {errors.length === 0 ? (
            <S.Text
              fontSize={textState.fontSize}
              color={textState.color}
              x={textState.x}
              y={textState.y}
              width={textState.width}
              height={textState.height}
              onClick={() => {
                actionClick();

                if (nextState) {
                  const hasMacros = nextState?.search(':');

                  if (typeof hasMacros !== 'undefined' && hasMacros >= 0) {
                    const macros = nextState.split(':');

                    emit(macros[0], {
                      from: id,
                      trigger: macros[0],
                      page: macros[1],
                    });
                  } else {
                    emit(nextState, {
                      from: id,
                      trigger: nextState,
                      page: 0,
                    });
                  }
                }
              }}
            >
              {textState.text}
            </S.Text>
          ) : (
            <S.Text
              fontSize={fontSize}
              color="red"
              x={x}
              y={y}
              width={width}
              height={height}
            >
              {errors[0]}
            </S.Text>
          )}
        </>
      )}
    </>
  );
};

export default TextAgent;
