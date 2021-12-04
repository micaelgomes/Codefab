import React from 'react';
import { AuthProvider } from './auth';
import { EngineProvider } from './engine';
import { AssetsProvider } from './assets';
import { Toaster } from 'react-hot-toast';

interface AppProps {
  children?: any;
}

const AppProvider: React.FC<AppProps> = ({ children }) => {
  return (
    <AuthProvider>
      <AssetsProvider>
        <EngineProvider>
          <Toaster position="top-center" gutter={8} />
          {children}
        </EngineProvider>
      </AssetsProvider>
    </AuthProvider>
  );
};

export default AppProvider;
