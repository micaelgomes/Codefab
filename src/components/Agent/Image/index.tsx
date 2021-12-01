import React, { useRef, useState, useCallback, useEffect } from 'react';
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
  trigger: string;
  files: any;
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
  trigger,
  files,
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
          console.log(states?.[posNewAttr]?.attributes);

          setImageState({
            ...imageState,
            ...states?.[posNewAttr]?.attributes,
            nextState: states?.[posNewAttr]?.attributes?.['on-touch'],
            imageSrc: states?.[posNewAttr]?.attributes?.['img'],
          });

          if (imgRef.current) {
            const newImage = new window.Image();

            files.forEach((file: any) => {
              if (file.name === states?.[posNewAttr]?.attributes?.['img']) {
                newImage.src = file.download_url;
              }
            });

            imgRef.current.image(newImage);
            imgRef.current.x(Number(imageState.x));
            imgRef.current.y(Number(imageState.y));
            imgRef.current.width(Number(imageState.width));
            imgRef.current.height(Number(imageState.height));
          }
        }
      }
    },
    [files, imageState, states],
  );

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
    <Image
      ref={imgRef}
      image={renderHTMLImageElement(imageSrc)}
      height={height}
      width={width}
      x={x}
      y={y}
      onClick={() => {
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
      draggable={draggable}
    />
  );
};

export default ImageAgent;
