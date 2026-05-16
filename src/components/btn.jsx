import React, { useContext } from "react";
import ModeProvider from "../context/mode";

export default function Btn({ func, children, cusStyle }) {
 
  const { mode } = useContext(ModeProvider);
  return (
    <button className={""} onClick={() => func}>
      {children}
    </button>
  );
}
