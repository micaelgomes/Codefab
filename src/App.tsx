import React from 'react';
import GlobalStyle from './styles/global';
import AppProvider from './hooks/index';
import Routes from './routes';

import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppProvider>
        <Routes />
      </AppProvider>
    </Router>
  );
};

export default App;
