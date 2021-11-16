import React, { useRef, useState, useCallback } from 'react';
import { Image } from 'react-konva';
import { Image as ImageKonva } from 'konva/types/shapes/Image';
import { renderHTMLImageElement } from '../../../utils/renderElement';
import { useCustomEventListener } from 'react-custom-events';

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
  container: HTMLDivElement | undefined;
  emit(name: string, data: any): any;
  sub(trigger: string, id: unknown): any;
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
  container,
  draggable,
  emit,
  sub,
  trigger,
}) => {
  const imgRef = useRef<ImageKonva>(null);

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

          if (imgRef.current) {
            // const filePath = getFilePath(imageState.imageSrc);
            // const newImage = renderHTMLImageElement(imageState.imageSrc);

            const newImage = new window.Image();
            newImage.src = imageState.imageSrc;

            imgRef.current.image(newImage);
            imgRef.current.x(Number(imageState.x));
            imgRef.current.y(Number(imageState.y));
            imgRef.current.width(Number(imageState.width));
            imgRef.current.height(Number(imageState.height));
          }
        }
      }
    },
    [imageState, states],
  );

  useCustomEventListener(trigger, data => {
    action(trigger);
  });

  return (
    <Image
      ref={imgRef}
      image={renderHTMLImageElement(imageSrc)}
      height={height}
      width={width}
      x={x}
      y={y}
      onClick={() => {
        emit(nextState, {
          from: id,
          trigger: nextState,
        });
      }}
      draggable={draggable}
    />
  );
};

export default ImageAgent;
