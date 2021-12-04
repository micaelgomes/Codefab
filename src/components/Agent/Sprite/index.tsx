import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  RefObject,
} from 'react';
import * as S from './styled';
export interface SpriteProps {
  id: number;
  height: number;
  spriteSrc: string;
  width: number;
  x: number;
  y: number;
  states: Array<any>;
  nextState: string;
  renderRef: RefObject<HTMLDivElement>;
  frameCount: number;
  fps: number;
  hasKeyboard: boolean;
}

const SpriteAgent: React.FC<SpriteProps> = ({
  id,
  spriteSrc,
  height,
  width,
  x,
  y,
  states,
  nextState,
  hasKeyboard,
  frameCount,
  fps,
  renderRef,
}) => {
  const spriteRef = useRef<any>(null);

  const [spriteState, setSpriteState] = useState({
    spriteSrc,
    x,
    y,
    width,
    height,
    frameCount,
    fps,
    nextState,
  });

  const actionClick = () => {
    console.log('aciton sprite click');

    if (states.length > 0) {
      const posNewAttr = states
        .map((state: any) => state.name)
        .indexOf(spriteState.nextState);

      if (posNewAttr >= 0) {
        setSpriteState({
          ...spriteState,
          ...states?.[posNewAttr]?.attributes,
          nextState: states?.[posNewAttr]?.attributes?.['on-touch'],
          spriteSrc: states?.[posNewAttr]?.attributes?.['sprite'],
        });
      }
    }
  };

  const actionFromKeyboard = useCallback(
    (e: KeyboardEvent) => {
      if (hasKeyboard && states.length > 0) {
        const key = e.code;
        const posNewAttr = states.map((state: any) => state.name).indexOf(key);

        if (posNewAttr >= 0) {
          setSpriteState({
            ...spriteState,
            ...states?.[posNewAttr]?.attributes,
          });

          console.log(states?.[posNewAttr]?.attributes);

          if (spriteRef.current) {
            console.log(spriteState);

            // const newSprite = renderHTMLImageElement(spriteState.spriteSrc);

            // spriteRef.current.image(newSprite);
            // spriteRef.current.x(spriteRef.current.x() + Number(spriteState.x));
            // spriteRef.current.y(spriteRef.current.y() + Number(spriteState.y));
            // spriteRef.current.width(spriteState.width);
            // spriteRef.current.height(spriteState.height);

            console.log(spriteRef.current);
          }
        }
      }
    },
    [hasKeyboard, spriteState, states],
  );

  useEffect(() => {
    // spriteRef.current?.start();

    renderRef.current?.addEventListener('keydown', actionFromKeyboard);

    try {
      if (spriteSrc && !frameCount) {
        throw new Error('Sprite require animation && animationName!');
      }

      if (width <= 0 || height <= 0) {
        throw new Error('Sp require props (width, height)');
      }

      if (spriteSrc.length <= 0) {
        throw new Error('Sprite require source path');
      }
    } catch (err) {
      console.log(err);
    }
  }, [actionFromKeyboard, frameCount, height, renderRef, spriteSrc, width]);

  useEffect(() => {
    console.log(spriteRef.current?.spriteEl);
  }, []);

  return (
    <>
      {spriteState && (
        <S.Sprite
          ref={spriteRef}
          image={spriteState.spriteSrc}
          widthFrame={spriteState.width}
          heightFrame={spriteState.height}
          x={spriteState.x}
          y={spriteState.y}
          steps={spriteState.frameCount}
          fps={spriteState.fps || 10}
          loop={true}
          onClick={actionClick}
        />
      )}
    </>
  );
};

export default SpriteAgent;
