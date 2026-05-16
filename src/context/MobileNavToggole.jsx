import React, { createContext, useState } from "react";

const MobileNavToggoleContext = createContext();


export function MobileNavToggole({ children }) {
    const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <MobileNavToggoleContext.Provider value={{ toggleMenu, setToggleMenu }}>
      {children}
    </MobileNavToggoleContext.Provider>
  );
}
export default MobileNavToggoleContext;
