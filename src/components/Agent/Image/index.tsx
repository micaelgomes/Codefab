import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useCustomEventListener } from 'react-custom-events';
import Draggable from 'react-draggable';

import * as S from './styled';

type ImageProps = {
  id: number;
  height: number;
  imageSrc: string;
  nextState: string;
  width: number;
  x: number;
  y: number;
  repeat: number[];
  states: Array<any>;
  draggable: boolean;
  hasKeyboard: boolean;
  emit(name: string, data: any): any;
  trigger: string;
};

const ImageAgent: React.FC<ImageProps> = ({
  id,
  imageSrc,
  nextState,
  height,
  width,
  x,
  y,
  repeat,
  states,
  hasKeyboard,
  draggable,
  emit,
  trigger,
}) => {
  const imgRef = useRef<any>(null);

  const [imageState, setImageState] = useState({
    imageSrc,
    x,
    y,
    width,
    height,
    nextState,
  });

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
    console.log('aciton click');

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

  useCustomEventListener(trigger, data => {
    action(trigger);
  });

  useEffect(() => {
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
  }, [height, imageSrc, width, x, y]);

  return (
    <>
      {imageState && (
        <>
          {draggable ? (
            <Draggable allowAnyClick={true} disabled={false}>
              <S.Image
                ref={imgRef}
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
                // stroke="red"
                alt="img de dentro"
              />
            </Draggable>
          ) : (
            <S.Image
              ref={imgRef}
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
              // stroke="red"
              alt="img de dentro"
            />
          )}
        </>
      )}
    </>
  );
};

export default ImageAgent;
