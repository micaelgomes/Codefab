import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface EngineDataContext {
  files: any[];
  setFiles: Dispatch<SetStateAction<any[]>>;
  getFilePath: any;
  deleteFile: any;
}

const AssetsContext = createContext<EngineDataContext>({} as EngineDataContext);

const AssetsProvider: React.FC = ({ children }) => {
  const [files, setFiles] = useState<any>([]);

  const getFilePath = (name: string) => {
    if (files.length > 0) {
      const resul = files.filter((file: any) => file.path === name);

      if (resul.length > 0) {
        return resul[0].preview;
      }
    }

    return undefined;
  };

  const deleteFile = (name: string) => {
    const newFiles = files.filter((file: any) => {
      if (file.path !== name) {
        return file;
      }

      URL.revokeObjectURL(file.preview);
    });

    setFiles(newFiles || []);
  };

  return (
    <AssetsContext.Provider
      value={{
        files,
        setFiles,
        getFilePath,
        deleteFile,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
};

const useAssets = (): EngineDataContext => {
  const context = useContext(AssetsContext);

  if (!context) {
    throw new Error('useAssets must be used in your context');
  }

  return context;
};

export { AssetsProvider, useAssets };
