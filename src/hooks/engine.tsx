import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';

import { v4 as uuid } from 'uuid';

import { emitCustomEvent, useCustomEventListener } from 'react-custom-events';

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

  useCustomEventListener('_NEXT_PAGE', () => {
    if (pages && sceneIndex + 1 < pages.length) {
      setSceneIndex(sceneIndex + 1);
    }
  });

  useCustomEventListener('_PREV_PAGE', () => {
    if (pages && sceneIndex - 1 >= 0) {
      setSceneIndex(sceneIndex - 1);
    }
  });

  useCustomEventListener('_GOTO_PAGE', (data: any) => {
    const numPage = Number(data.page) - 1;

    if (pages && numPage < pages.length) {
      setSceneIndex(numPage);
    }
  });

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
