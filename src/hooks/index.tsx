import React from 'react';
import { AuthProvider } from './auth';
import { EngineProvider } from './engine';
import { AssetsProvider } from './assets';

interface AppProps {
  children?: any;
}

const AppProvider: React.FC<AppProps> = ({ children }) => {
  return (
    <AuthProvider>
      <EngineProvider>
        <AssetsProvider>{children}</AssetsProvider>
      </EngineProvider>
    </AuthProvider>
  );
};

export default AppProvider;
