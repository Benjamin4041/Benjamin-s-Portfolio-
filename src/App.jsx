import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import About from "./pages/about";
import Works from "./pages/works";
import { ModeContext } from "./context/mode";

export default function App() {
  return (
    <ModeContext>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/work" element={<Works/>}/>
      </Routes>
    </Router>
    </ModeContext>
  );
}
