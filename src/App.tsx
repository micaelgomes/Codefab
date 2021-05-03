import React from "react";
import Preview from "./components/Preview";
import Editor from "./pages/Editor";
import GlobalStyle from "./styles/global";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Editor />
      <Preview />
    </>
  );
};

export default App;
