import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';

import { v4 as uuid } from 'uuid';

export interface SceneDTO {
  background: any;
  sound?: string;
  title?: string;
}

interface EngineDataContext {
  createFable(smilDom: unknown): void;
  resetFable(): void;
  scenes: SceneDTO[] | undefined;
  agents: any;
  sceneIndex: number;
  setSceneIndex: Dispatch<SetStateAction<number>>;
  previewOpen: boolean;
  setpreviewOpen: Dispatch<SetStateAction<boolean>>;
}

interface SmilDomProps extends XMLDocument {
  children: any;
}

const EngineContext = createContext<EngineDataContext>({} as EngineDataContext);

const EngineProvider: React.FC = ({ children }) => {
  const [scenes, setScenes] = useState<SceneDTO[]>();
  const [agents, setAgents] = useState<any[]>();
  const [sceneIndex, setSceneIndex] = useState<number>(0);

  const [previewOpen, setpreviewOpen] = useState<boolean>(false);

  const createFable = useCallback((smilDom: SmilDomProps) => {
    console.clear();
    console.log(
      '%cStart Process Fable 🚀',
      'color: brown; background: orange; padding: 2%;',
    );

    const newScenes = smilDom?.children.map((scene: any) => scene?.attributes);
    const agentsScenes = smilDom?.children.map((scene: any) =>
      scene?.children?.map((agent: any) => ({
        id: uuid(),
        attributes: agent?.attributes,
        states: agent?.children.map((state: any) => ({
          attributes: state?.attributes,
          name: state?.name,
        })),
      })),
    );

    setScenes(newScenes);
    setAgents(agentsScenes);
  }, []);

  const resetFable = useCallback(() => {
    console.log('Clear 🉐');

    setScenes([]);
    setAgents([]);
  }, []);

  return (
    <EngineContext.Provider
      value={{
        createFable,
        resetFable,
        scenes,
        agents,
        sceneIndex,
        setSceneIndex,
        previewOpen,
        setpreviewOpen,
      }}
    >
      {children}
    </EngineContext.Provider>
  );
};

const useEngine = (): EngineDataContext => {
  const context = useContext(EngineContext);

  if (!context) {
    throw new Error('useEngine must be used in your context');
  }

  return context;
};

export { EngineProvider, useEngine };
