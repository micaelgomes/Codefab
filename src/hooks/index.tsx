import React from 'react';
import { AuthProvider } from './auth';
import { EngineProvider } from './engine';
import { AssetsProvider } from './assets';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <EngineProvider>
        <AssetsProvider>{children}</AssetsProvider>
      </EngineProvider>
    </AuthProvider>
  );
};

export default AppProvider;
