import React, { useContext } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import ScrollToTop from "../hooks/scrolltotop";
import { ModeContext } from "../context/mode";
import MobileNavToggoleContext from "../context/MobileNavToggole";

export default function Layout({ children }) {
  const { mode } = useContext(ModeContext);
  const { toggleMenu } = useContext(MobileNavToggoleContext);
  return (
    <div className={toggleMenu ? "!overflow-hidden lg:h-fit h-screen" : ""}>
      <ScrollToTop />
      <Navbar />
      {children}
      <Footer mode={mode} />
    </div>
  );
}
