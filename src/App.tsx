import React from "react";
import Preview from "./components/Preview";
import Editor from "./pages/Editor";
import GlobalStyle from "./styles/global";
import AppProvider from "./hooks/index";

const App = () => {
  return (
    <AppProvider>
      <GlobalStyle />
      <Editor />
      <Preview />
    </AppProvider>
  );
};

export default App;
