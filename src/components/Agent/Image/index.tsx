import React, { useState, useCallback, useEffect, RefObject } from 'react';
import { useCustomEventListener } from 'react-custom-events';
import Draggable from 'react-draggable';
import { useEngine } from '../../../hooks/engine';

import * as S from './styled';

type ImageProps = {
  id: number;
  height: number;
  imageSrc: string;
  nextState: string;
  onDrop: string;
  width: number;
  x: number;
  y: number;
  repeat: number[];
  states: Array<any>;
  draggable: boolean;
  hasKeyboard: boolean;
  renderRef: RefObject<HTMLDivElement>;
  trigger: string;
  triggerDrop: string;
};

const ImageAgent: React.FC<ImageProps> = ({
  id,
  imageSrc,
  nextState,
  onDrop,
  height,
  width,
  x,
  y,
  repeat,
  states,
  hasKeyboard,
  draggable,
  trigger,
  triggerDrop,
  renderRef,
}) => {
  const { emit, emitDropEvent } = useEngine();

  const [canExecute, setCanExecute] = useState(false);
  const [imageState, setImageState] = useState({
    imageSrc,
    x,
    y,
    width,
    height,
    nextState,
  });

  const [startTime, setStartTime] = useState(Date.now());

  const action = useCallback(
    trigger => {
      if (states.length > 0) {
        const posNewAttr = states
          .map((state: any) => state.name)
          .indexOf(trigger);

        if (posNewAttr >= 0) {
          setImageState({
            ...imageState,
            ...states?.[posNewAttr]?.attributes,
            nextState: states?.[posNewAttr]?.attributes?.['on-touch'],
            imageSrc: states?.[posNewAttr]?.attributes?.['img'],
          });
        }
      }
    },
    [imageState, states],
  );

  const actionClick = () => {
    if (states.length > 0) {
      const posNewAttr = states
        .map((state: any) => state.name)
        .indexOf(imageState.nextState);

      if (posNewAttr >= 0) {
        setImageState({
          ...imageState,
          ...states?.[posNewAttr]?.attributes,
          nextState: states?.[posNewAttr]?.attributes?.['on-touch'],
          imageSrc: states?.[posNewAttr]?.attributes?.['img'],
        });
      }
    }
  };

  const actionFromKeyboard = useCallback(
    (e: KeyboardEvent) => {
      const currTime = Date.now();
      const deltaTime = currTime - startTime;

      setStartTime(currTime);
      setCanExecute(deltaTime > 200);

      if (hasKeyboard && states.length > 0 && canExecute) {
        const key = e.code;
        const posNewAttr = states.map((state: any) => state.name).indexOf(key);

        if (posNewAttr >= 0) {
          setImageState({
            ...imageState,
            x: imageState.x + Number(states?.[posNewAttr]?.attributes?.['x']),
            y: imageState.y + Number(states?.[posNewAttr]?.attributes?.['y']),
          });
        }
      }
    },
    [canExecute, hasKeyboard, imageState, startTime, states],
  );

  useCustomEventListener(trigger, () => {
    action(trigger);
  });

  useCustomEventListener(triggerDrop, (data: any) => {
    const x1 = data.x;
    const y1 = data.y;
    const trigger = data.trigger;

    if (x1 >= x && x1 <= x + width && y1 >= y && y1 <= y + height) {
      action(triggerDrop);
      emit(trigger, {});
    }
  });

  useEffect(() => {
    const container = renderRef.current;

    if (hasKeyboard) {
      container?.addEventListener('keydown', actionFromKeyboard);
    }

    try {
      if (width <= 0 || height <= 0) {
        throw new Error('Image require props (width, height)');
      }

      if (imageSrc.length <= 0) {
        throw new Error('Image require source path');
      }
    } catch (err) {
      console.log(err);
    }

    return () => {
      container?.removeEventListener('keydown', actionFromKeyboard);
    };
  }, [
    actionFromKeyboard,
    hasKeyboard,
    height,
    imageSrc,
    renderRef,
    width,
    x,
    y,
  ]);

  return (
    <>
      {imageState && (
        <>
          {draggable ? (
            <Draggable
              allowAnyClick={true}
              disabled={false}
              bounds="parent"
              onStop={(_, ui) => {
                emitDropEvent(onDrop, {
                  x: Math.abs(ui.x + x) + width / 2,
                  y: Math.abs(ui.y - y) + height / 2,
                  trigger,
                });
              }}
            >
              <S.Image
                src={imageState.imageSrc}
                height={imageState.height}
                width={imageState.width}
                x={imageState.x}
                y={imageState.y}
                onClick={() => {
                  if (!trigger) {
                    actionClick();
                  }

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
                }}
                draggable={false}
                alt="img de dentro"
              />
            </Draggable>
          ) : (
            <S.Image
              src={imageState.imageSrc}
              height={imageState.height}
              width={imageState.width}
              x={imageState.x}
              y={imageState.y}
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
              draggable={false}
              alt="img de dentro"
            />
          )}
        </>
      )}
    </>
  );
};

export default ImageAgent;
