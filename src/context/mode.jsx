import React, { createContext, useState } from "react";

const ModeProvider = createContext();

export function ModeContext({ children }) {
    const [mode, setMode] = useState("light");
  return <ModeProvider.Provider value={{mode,setMode}}>{children}</ModeProvider.Provider>;
}

export default ModeProvider;
