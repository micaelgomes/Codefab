import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';

import { uuid } from 'uuidv4';

export interface SceneDTO {
  background: any;
  sound?: any;
  title?: any;
}

interface EngineDataContext {
  createFable(smilDom: unknown): void;
  actionAgent(id: number, newState: string): void;
  moveAgent(keyPressed: string): void;
  scenes: SceneDTO[] | undefined;
  agents: any;
  sceneIndex: number;
  setSceneIndex: Dispatch<SetStateAction<number>>;
}

const EngineContext = createContext<EngineDataContext>({} as EngineDataContext);

const EngineProvider: React.FC = ({ children }) => {
  const [scenes, setScenes] = useState<SceneDTO[]>();
  const [agents, setAgents] = useState<any[]>();
  const [sceneIndex, setSceneIndex] = useState<number>(0);

  const createFable = useCallback((smilDom: any) => {
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

  // Problem: processar todos os agentes
  const actionAgent = useCallback(
    (id: number, newState: string) => {
      const newAgents = agents?.map((agentsByIndex: any[]) =>
        agentsByIndex.map(agent => {
          if (agent.id === id) {
            const posNewAttr = agent.states
              .map((state: any) => state.name)
              .indexOf(newState);

            if (posNewAttr >= 0) {
              const newAgent = {
                ...agent,
                attributes: {
                  ...agent.attributes,
                  ...agent.states?.[posNewAttr]?.attributes,
                },
              };

              return newAgent;
            }
          }

          return agent;
        }),
      );

      setAgents(newAgents);
    },
    [agents],
  );

  const moveAgent = useCallback(
    (keyPressed: string) => {
      const newAgents = agents?.map((agentsByIndex: any[]) =>
        agentsByIndex.map(agent => {
          if (agent.states.length > 0) {
            const posKeyPressed = agent.states
              .map((state: any) => state.name)
              .indexOf(keyPressed);

            if (posKeyPressed >= 0) {
              const cx = Number(agent.attributes?.x);
              const cy = Number(agent.attributes?.y);
              const dx = Number(agent.states[posKeyPressed].attributes?.x);
              const dy = Number(agent.states[posKeyPressed].attributes?.y);

              const newAgent = {
                ...agent,
                attributes: {
                  ...agent.attributes,
                },
              };

              if (dx) {
                newAgent.attributes.x = String(cx + dx);
              }

              if (dy) {
                newAgent.attributes.x = String(cy + dy);
              }

              return newAgent;
            }
          }

          return agent;
        }),
      );

      setAgents(newAgents);
    },
    [agents],
  );

  return (
    <EngineContext.Provider
      value={{
        createFable,
        actionAgent,
        scenes,
        agents,
        sceneIndex,
        setSceneIndex,
        moveAgent,
      }}
    >
      {children}
    </EngineContext.Provider>
  );
};

const useEngine = (): EngineDataContext => {
  const context = useContext(EngineContext);

  if (!context) throw new Error('useEngine must be used in your context');

  return context;
};

export { EngineProvider, useEngine };
