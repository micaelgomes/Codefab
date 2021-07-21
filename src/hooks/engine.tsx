import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export interface SceneDTO {
  background: any;
  sound?: any;
  title?: any;
}

interface EngineDataContext {
  createFable(smilDom: unknown): void;
  scenes: SceneDTO[] | undefined;
  sceneIndex: number;
  setSceneIndex: Dispatch<SetStateAction<number>>;
}

const EngineContext = createContext<EngineDataContext>({} as EngineDataContext);

const EngineProvider: React.FC = ({ children }) => {
  const [scenes, setScenes] = useState<SceneDTO[]>();
  const [sceneIndex, setSceneIndex] = useState<number>(0);

  const createFable = (smilDom: any) => {
    const newScenes = smilDom?.children.map((scene: any) => scene?.attributes);
    const newChildrens = smilDom?.children.map((scene: any) => scene?.children);
    setScenes(newScenes);

    console.log(newChildrens);

  }

  return (
    <EngineContext.Provider value={{ createFable, scenes, sceneIndex, setSceneIndex }}>
      {children}
    </EngineContext.Provider>
  );
};

const useEngine = (): EngineDataContext => {
  const context = useContext(EngineContext);

  if (!context) throw new Error("useEngine must be used in your context");

  return context;
};

export { EngineProvider, useEngine };