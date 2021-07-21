import React from "react";
import { useState, useEffect } from "react";
import { Stage, Layer, Text, Image } from "react-konva";
import useImage from "use-image";
import { SceneDTO, useEngine } from "../../hooks/engine";

const Engine = () => {
  const { scenes, sceneIndex } = useEngine();
  const [render, setRender] = useState<SceneDTO>({} as SceneDTO);
  const [background] = useImage(`/${scenes?.[sceneIndex].background}`);
  const [start, setStart] = useState<boolean>(false);

  const [propsScreen] = useState({
    with: 500,
    height: 500
  })

  useEffect(() => {
    const renderScene = {
      background,
      sound: scenes?.[sceneIndex].sound,
      title: scenes?.[sceneIndex].title,
    }

    setRender(renderScene);
    setStart(true);
  }, [background, sceneIndex, scenes]);

  return (
    <Stage width={propsScreen.with} height={propsScreen.height}>
      <Layer>
        {start && (<Text x={180} y={230} fontStyle="bold" fontFamily="Helvetica, sans-serif" fontSize={24} text={"Run Preview!"} />)}
        {render.background && (<Image width={500} height={500} image={render.background} />)}
        {render.title && (<Text x={50} y={50} fontSize={24} fontFamily="Press Start 2P" text={render.title} />)}
      </Layer>
    </Stage>
  );
};

export default Engine;
