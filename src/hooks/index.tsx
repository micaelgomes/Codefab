import React from "react";

import { EngineProvider } from "./engine";

const AppProvider: React.FC = ({ children }) => {
  return <EngineProvider>{children}</EngineProvider>;
};

export default AppProvider;
