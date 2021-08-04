import React, {
  useRef,
  useEffect,
  useState,
  RefObject,
  useCallback,
} from 'react';
import { Image, Sprite, Text } from 'react-konva';
import { Image as ImageKonva } from 'konva/types/shapes/Image';
import { Sprite as SpriteKonva } from 'konva/types/shapes/Sprite';
import { Stage } from 'konva/types/Stage';
import { renderHTMLImageElement } from '../../utils/renderElement';

export interface AgentProps {
  id: number;
  height: number;
  img: string;
  sprite: string;
  text: string;
  nextState: string;
  width: number;
  x: number;
  y: number;
  repeat: number[];
  states: Array<any>;
  hasKeyboard: boolean;
  stageRef: RefObject<Stage>;
  actionAgent(id: number, nextState: string): void;
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
  hasKeyboard,
  stageRef,
  actionAgent,
}) => {
  const spriteRef = useRef<SpriteKonva>(null);
  const textRef = useRef<any>(null);
  const imgRef = useRef<ImageKonva>(null);
  const container = stageRef.current?.container();

  const animations = {
    idle: [
      0, 0, 164, 113, 164, 0, 164, 113, 328, 0, 164, 113, 492, 0, 164, 113, 656,
      0, 164, 113, 820, 0, 164, 113,
    ],
    run: [
      0, 0, 164, 113, 164, 0, 164, 113, 328, 0, 164, 113, 492, 0, 164, 113, 656,
      0, 164, 113, 820, 0, 164, 113, 984, 0, 164, 113, 1148, 0, 164, 113,
    ],
    back: [0, 0, 164, 113, 164, 0, 164, 113],
  };

  const [state, setState] = useState(nextState);

  const actionImage = () => {
    if (states.length > 0) {
      const posNewAttr = states.map((state: any) => state.name).indexOf(state);

      if (posNewAttr >= 0) {
        setState(states?.[posNewAttr]?.attributes?.['on-touch']);

        // console.log(imgRef.current);

        if (imgRef.current) {
          imgRef.current.attrs.image.src =
            states?.[posNewAttr]?.attributes?.img;
        }
      }
    }
  };

  const actionFromKeyboard = useCallback(
    (e: KeyboardEvent) => {
      if (hasKeyboard) {
        const key = e.code;

        if (spriteRef.current) {
          console.log(spriteRef.current);

          switch (key) {
            case 'KeyD':
              spriteRef.current.attrs.image.src = 'run.png';
              spriteRef.current?.animation('run');
              spriteRef.current?.x(spriteRef.current.x() + 4);

              break;
            case 'KeyA':
              spriteRef.current.attrs.image.src = 'back.png';
              spriteRef.current?.animation('back');
              spriteRef.current?.x(spriteRef.current.x() - 4);
              break;
            case 'KeyS':
            case 'KeyW':
            default:
              spriteRef.current.attrs.image.src = 'idle.png';
              spriteRef.current?.animation('idle');
              break;
          }

          spriteRef.current.on('frameIndexChange', () => {
            console.log('apply listner');

            if (spriteRef.current?.frameIndex() === 2) {
              setTimeout(() => {
                console.log('desfaz -> idle');

                spriteRef.current &&
                  (spriteRef.current.attrs.image.src = 'idle.png');

                spriteRef.current?.animation('idle');
                spriteRef.current?.off('frameIndexChange');
              }, 1000 / spriteRef.current?.frameRate());
            }
          });

          // setTimeout(() => {
          //   console.log('desfaz -> idle');

          //   spriteRef.current &&
          //     (spriteRef.current.attrs.image.src = 'idle.png');

          //   spriteRef.current?.animation('idle');
          //   // spriteRef.current.off('.button');
          // }, 5000 / spriteRef.current?.frameRate());
        }
      }
    },
    [hasKeyboard, id],
  );

  useEffect(() => {
    spriteRef.current?.start();

    container?.addEventListener('keydown', actionFromKeyboard);
  }, [actionFromKeyboard, container]);

  return (
    <>
      {img && (
        <Image
          ref={imgRef}
          image={renderHTMLImageElement(img)}
          height={height}
          width={width}
          x={x}
          y={y}
          onClick={actionImage}
        />
      )}

      {sprite && (
        <Sprite
          ref={spriteRef}
          height={height}
          width={width}
          x={x}
          y={y}
          image={renderHTMLImageElement(sprite)}
          animation="idle"
          animations={animations}
          frameRate={7}
          frameIndex={0}
        />
      )}

      {text && (
        <Text
          ref={textRef}
          fontSize={16}
          align={'left'}
          fontFamily="Press Start 2P"
          text={text}
          x={x}
          y={y}
          wrap="word"
          width={width}
          onClick={() => {}}
        />
      )}
    </>
  );
};

export default Agent;
