import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';

import { v4 as uuid } from 'uuid';

import { emitCustomEvent } from 'react-custom-events';

export interface PageDTO {
  background: any;
  sound?: string;
  title?: string;
}

interface EngineDataContext {
  createFable(smilDom: unknown): void;
  resetFable(): void;
  pages: PageDTO[] | undefined;
  agents: any;
  sceneIndex: number;
  setSceneIndex: Dispatch<SetStateAction<number>>;
  previewOpen: boolean;
  setpreviewOpen: Dispatch<SetStateAction<boolean>>;
  emit(name: string, data: any): any;
  sub(trigger: string, id: unknown): any;
}

interface SmilDomProps extends XMLDocument {
  children: any;
}

const EngineContext = createContext<EngineDataContext>({} as EngineDataContext);

const EngineProvider: React.FC = ({ children }) => {
  const [pages, setPages] = useState<PageDTO[]>();
  const [agents, setAgents] = useState<any[]>();
  const [sceneIndex, setSceneIndex] = useState<number>(0);

  const [previewOpen, setpreviewOpen] = useState<boolean>(false);
  const [enrolled] = useState<Event[]>([]);

  const createFable = useCallback((smilDom: SmilDomProps) => {
    console.clear();
    console.log(
      '%cStart Process Fable 🚀',
      'color: brown; background: orange; padding: 2%;',
    );

    const newPages = smilDom?.children.map((page: any) => page?.attributes);
    const agentsPages = smilDom?.children.map((page: any) =>
      page?.children?.map((agent: any) => ({
        id: uuid(),
        attributes: agent?.attributes,
        states: agent?.children.map((state: any) => ({
          attributes: state?.attributes,
          name: state?.name,
        })),
      })),
    );

    setPages(newPages);
    setAgents(agentsPages);
  }, []);

  const resetFable = useCallback(() => {
    console.log('Clear 🉐');

    setPages([]);
    setAgents([]);
    setSceneIndex(0);
  }, []);

  const emit = useCallback((nameEvent: string, data: any) => {
    emitCustomEvent(nameEvent, data);
  }, []);

  const sub = useCallback(
    (trigger: string, id: unknown) => {
      const event = enrolled.filter(event => event.type === trigger);

      if (event.length > 0) {
        return event[0];
      }

      // if (enrolled.map(el => el.type).includes(trigger)) {
      //   enrolled.push({
      //     trigger,
      //     id,
      //   });
      // }
    },
    [enrolled],
  );

  return (
    <EngineContext.Provider
      value={{
        createFable,
        resetFable,
        pages,
        agents,
        sceneIndex,
        setSceneIndex,
        previewOpen,
        setpreviewOpen,
        emit,
        sub,
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
