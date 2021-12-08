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
import { useAssets } from './assets';

export interface PageDTO {
  background: string;
  soundtrack?: string;
  title?: string;
}

interface EngineDataContext {
  createFable(smilDom: unknown): void;
  resetFable(): void;
  pages: PageDTO[] | undefined;
  agents: any;
  errors: any;
  sceneIndex: number;
  setSceneIndex: Dispatch<SetStateAction<number>>;
  previewOpen: boolean;
  setpreviewOpen: Dispatch<SetStateAction<boolean>>;
  emit(name: string, data: any): any;
  emitDropEvent(name: string, data: any): any;
}

interface SmilDomProps extends XMLDocument {
  children: any;
  attributes: any;
}

const EngineContext = createContext<EngineDataContext>({} as EngineDataContext);

const EngineProvider: React.FC = ({ children }) => {
  const [pages, setPages] = useState<PageDTO[]>();
  const [agents, setAgents] = useState<any[]>();
  const [errors, setErrors] = useState<any[]>([]);
  const [sceneIndex, setSceneIndex] = useState<number>(0);
  const { getFilePath } = useAssets();

  const [previewOpen, setpreviewOpen] = useState<boolean>(false);

  const createFable = useCallback(
    (smilDom: SmilDomProps) => {
      const reservedWords = ['fable', 'page', 'agent'] as const;

      console.clear();
      console.log(
        '%cStart Process Fable 🚀',
        'color: brown; background: orange; padding: 2%;',
      );

      if (smilDom.children.length === 0) {
        const tmpErrors = errors;
        tmpErrors.push(`Fable deve ter pelo menos uma <page>.`);

        setErrors(tmpErrors);
      }

      if (smilDom?.attributes?.['start-in']) {
        const startIn = Number(smilDom?.attributes?.['start-in']);

        if (startIn < smilDom?.children?.length) {
          setSceneIndex(startIn);
        } else {
          const tmpErrors = errors;
          tmpErrors.push(`'start-in' deve está dentro da quantidade de pages`);

          setErrors(tmpErrors);
        }
      }

      const newPages = smilDom?.children.map((page: any, i: number) => {
        const { background } = page?.attributes;

        if (!reservedWords.includes(page.name)) {
          const tmpErrors = errors;
          tmpErrors.push(`${page.name} não é palavra reservada`);

          setErrors(tmpErrors);
        } else {
          if (page.children.length === 0) {
            const tmpErrors = errors;
            tmpErrors.push(`Page ${i + 1} deve ter pelo menos um <agent>.`);

            setErrors(tmpErrors);
          }
        }

        if (!background) {
          const tmpErrors = errors;
          tmpErrors.push(`Page ${i + 1} está sem background`);

          setErrors(tmpErrors);
        }

        return {
          ...page?.attributes,
          background: getFilePath(page?.attributes?.['background']),
          soundtrack: getFilePath(page?.attributes?.['soundtrack']),
        };
      });

      const agentsPages = smilDom?.children.map((page: any, numPage: number) =>
        page?.children?.map((agent: any, i: number) => {
          const { img, sprite, video, text, x, y, width, height } =
            agent?.attributes;

          if (!reservedWords.includes(agent.name)) {
            const tmpErrors = errors;
            tmpErrors.push(`${agent.name} não é palavra reservada`);

            setErrors(tmpErrors);
          }

          if (img || sprite || video) {
            if (!x || !y || !width || !height) {
              const tmpErrors = errors;
              tmpErrors.push(
                `Agent ${i + 1} - page ${
                  numPage + 1
                } - está sem (x, y, width, height)`,
              );

              setErrors(tmpErrors);
            }
          } else {
            if (!x || !y) {
              const tmpErrors = errors;
              tmpErrors.push(
                `Agent ${i + 1} - na page ${numPage + 1} - está sem (x, y)`,
              );

              setErrors(tmpErrors);
            }
          }

          if (!img && !sprite && !text && !video) {
            const tmpErrors = errors;
            tmpErrors.push(
              `Agent ${i + 1} - page ${
                numPage + 1
              } - sem conteúdo (img | sprite | text | video)`,
            );

            setErrors(tmpErrors);
          }

          return {
            id: uuid(),
            attributes: {
              ...agent?.attributes,
              img: getFilePath(agent?.attributes?.['img']),
              sprite: getFilePath(agent?.attributes?.['sprite']),
              video: getFilePath(agent?.attributes?.['video']),
            },
            states: agent?.children.map((state: any) => ({
              attributes: {
                ...state?.attributes,
                img: getFilePath(state?.attributes?.['img']),
                sprite: getFilePath(state?.attributes?.['sprite']),
              },
              name: state?.name,
            })),
          };
        }),
      );

      setPages(newPages);
      setAgents(agentsPages);
    },
    [errors, getFilePath, setErrors],
  );

  const resetFable = useCallback(() => {
    console.log('Clear 🉐');

    setPages([]);
    setAgents([]);
    setErrors([]);
    setSceneIndex(0);
  }, []);

  const emit = useCallback((nameEvent: string, data: any) => {
    emitCustomEvent(nameEvent, data);
  }, []);

  const emitDropEvent = useCallback((nameEvent: string, data: any) => {
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
        errors,
        sceneIndex,
        setSceneIndex,
        previewOpen,
        setpreviewOpen,
        emit,
        emitDropEvent,
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
