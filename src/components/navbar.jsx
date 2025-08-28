import React, { useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import ModeProvider from "../context/mode";
import NavbarOptions from "./NavbarOptions";
import MobileNavToggoleContext, { MobileNavToggole } from "../context/MobileNavToggole";

export default function Navbar({style}) {
  const { toggleMenu, setToggleMenu } = useContext(MobileNavToggoleContext);
  const { mode, setMode } = useContext(ModeProvider);
  const location = useLocation();

  // Helper to map path to menu
  const getSelectedMenu = () => {
    if (location.pathname === "/") return "home";
    if (location.pathname === "/work") return "projects";
    if (location.pathname === "/about") return "about";
    if (location.pathname === "/contact") return "contact";
    return "";
  };
  const selectedMenu = getSelectedMenu();

  const menu = () => {
    setToggleMenu((prev) => !prev);
  };

  const toggoleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <div className={`flex justify-end pt-3 lg:pt-0 ${style}`}>
      <nav
        className={
          toggleMenu
            ? mode === "light"
              ? `w-screen  lg:w-fit lg:m-auto lg:gap-9 lg:absolute lg:px-9 lg:top-7 lg:rounded-full lg:mt-5 lg:h-fit mt-0 h-Dscreen float-right flex text-white bg-black lg:justify-center justify-start items-center py-5 px-36 lg:flex-row flex-col top-0 fixed z-20`
              : `w-screen lg:w-fit lg:h-fit mt-0 h-Dscreen float-right flex text-black bg-white justify-start items-center  py-5 px-36 lg:flex-row flex-col lg:absolute top-0 fixed z-20`
            : mode === "light"
            ? `lg:m-auto lg:w-fit lg:relative lg:top-7 w-fit rounded-full flex bg-black lg:mt-5 text-white justify-between py-5 gap-9 lg:px-9 px-5`
            : `lg:m-auto lg:w-fit lg:relative lg:top-7 w-fit rounded-full flex bg-white lg:mt-5 text-black justify-between py-5 gap-9 lg:px-9`
        }
      >
        <RxHamburgerMenu
          className={
            toggleMenu
              ? "lg:hidden md:hidden self-start lg:mb-0 mb-48"
              : "lg:hidden md:hidden self-start"
          }
          onClick={menu}
          size={25}
        />

        <NavbarOptions content={"Home"} to={"/"} />
        <NavbarOptions content={"Works"} to={"/works"} />
        <NavbarOptions content={"About"} to={"/about"} />
        <NavbarOptions content={"Contact"} to={"/contact"} />

        {mode === "light" ? (
          <FaMoon
            className="self-center cursor-pointer lg:inline-block hidden"
            onClick={toggoleMode}
          />
        ) : (
          <MdOutlineWbSunny
            className="self-center cursor-pointer lg:inline-block hidden"
            onClick={toggoleMode}
          />
        )}
        {/* {mode === "light" ? (
          <FaMoon
            className={
              toggleMenu
                ? "self-center cursor-pointer lg:hidden inline-block"
                : "self-center cursor-pointer hidden "
            }
            onClick={toggoleMode}
          />
        ) : (
          <MdOutlineWbSunny
            className={
              toggleMenu
                ? "self-center cursor-pointer lg:hidden inline-block"
                : "self-center cursor-pointer hidden "
            }
            onClick={toggoleMode}
          />
        )} */}
      </nav>
    </div>
  );
}
