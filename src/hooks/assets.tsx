import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { api } from '../services/api';
import { useAuth } from './auth';

interface EngineDataContext {
  files: any[];
  setFiles: Dispatch<SetStateAction<any[]>>;
  getFilePath: any;
  deleteFile: any;
}

const AssetsContext = createContext<EngineDataContext>({} as EngineDataContext);

const AssetsProvider: React.FC = ({ children }) => {
  const [files, setFiles] = useState<any>([]);

  const { user } = useAuth();

  const getFilePath = (name: string) => {
    if (name) {
      if (files.length > 0) {
        const resul = files.filter((file: any) => file.path === name);

        if (resul.length > 0) {
          return resul[0].download_url;
        }
      }
    }

    return undefined;
  };

  const deleteFile = (name: string, repo: string, sha: string) => {
    // eslint-disable-next-line array-callback-return
    const newFiles = files.filter((file: any) => {
      if (file.path !== name) {
        return file;
      }

      URL.revokeObjectURL(file.preview);
    });

    api
      .delete(
        `/file?user=${user.login}&repo=${repo}&nameFile=${name}&sha=${sha}`,
        {
          headers: {
            Authorization: `token ${user.access_token}`,
          },
        },
      )
      .then(res => console.log(res))
      .catch(err => {
        console.error(err);
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
