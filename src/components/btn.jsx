import React, { useContext } from "react";
import ModeContext from "../context/mode";

export default function Btn({ func, children, cusStyle }) {
 
  const { mode } = useContext(ModeContext);
  return (
    <button className={""} onClick={() => func}>
      {children}
    </button>
  );
}
