import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ModeContext from "../context/mode";
import MobileNavToggoleContext from "../context/MobileNavToggole";

export default function NavbarOptions({ to, content, onClick }) {
  const { toggleMenu } = useContext(MobileNavToggoleContext);
  const { mode, setMode } = useContext(ModeContext);
  const location = useLocation();

  // Helper to map path to menu
  const getSelectedMenu = () => {
    if (location.pathname === "/") return "home";
    if (location.pathname === "/works") return "works";
    if (location.pathname === "/about") return "about";
    if (location.pathname === "/contact") return "contact";
    return "";
  };
  const selectedMenu = getSelectedMenu();

  return (
    <Link
      to={to}
      onClick={onClick}
      className={
        toggleMenu ? "inline-block self-center" : "lg:inline-block hidden"
      }
    >
      <p
        className={
          mode === "light"
            ? content.toLowerCase() === selectedMenu
              ? "lg:inline-block cursor-pointer text-black bg-white  hover:p-2 hover:px-6 py-2 rounded-full  w-[6.3em] text-center transition-all ease-out font-Gestura"
              : "lg:inline-block  cursor-pointer hover:text-black hover:bg-white hover:p-2 hover:px-6 py-2  w-[6.3em] text-center hover:rounded-full transition-all ease-out font-Gestura"
            : content.toLowerCase() === selectedMenu
            ? "lg:inline-block  cursor-pointer text-white bg-black p-2 py-2 px-6 rounded-full transition-all ease-out font-Gestura"
            : "lg:inline-block  cursor-pointer hover:text-white hover:bg-black hover:p-2 hover:px-6 py-2 px-6  hover:rounded-full transition-all ease-out font-Gestura"
        }
      >
        {content}
      </p>
    </Link>
  );
}

//  <Link to={"/"}>
//           <AnimatedCopy
//             className={
//               toggleMenu
//                 ? "inline-block self-center mb-10 "
//                 : mode === "light"
//                 ? "home" === selectedMenu
//                   ? "lg:inline-block hidden cursor-pointer text-black bg-white  hover:p-2 hover: py-2 px-6  rounded-full "
//                   : "lg:inline-block hidden cursor-pointer hover:text-black hover:bg-white  hover:p-2 hover: py-2 px-6   hover:rounded-full "
//                 : "home" === selectedMenu
//                 ? "lg:inline-block hidden cursor-pointer text-white bg-black p-2 py-2 px-6 rounded-full "
//                 : "lg:inline-block hidden cursor-pointer hover:text-white hover:bg-black hover:p-2 hover: py-2 px-6 hover:rounded-full "
//             }
//           >
//             Home
//           </AnimatedCopy>
//         </Link>
