import React, { useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";
import ModeProvider from "../context/mode";

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { mode, setMode } = useContext(ModeProvider);

  const menu = () => {
    setToggleMenu((prev) => !prev);
  };

  const toggoleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <div className="flex justify-end pt-3 lg:pt-0">
      <nav
        className={
          toggleMenu
            ? mode === "light"
              ? "w-screen lg:h-screen mt-0 h-Dscreen float-right flex text-white bg-black justify-between items-center p-5 flex-col lg:absolute top-0  fixed z-20"
              : "w-screen lg:h-screen mt-0 h-Dscreen float-right flex text-black bg-white justify-between items-center p-5 flex-col lg:absolute top-0 fixed z-20"
            : mode === "light"
            ? "lg:m-auto lg:w-[27.9em] lg:relative lg:top-7 w-fit rounded-full flex bg-black lg:mt-5 text-white justify-between p-5 "
            : "lg:m-auto lg:w-[27.9em] lg:relative lg:top-7 w-fit rounded-full flex bg-white lg:mt-5 text-black justify-between p-5"
        }
      >
        <RxHamburgerMenu className="lg:hidden md:hidden self-start" onClick={menu} />
        <Link to={"/"}>
          <p
            className={
              toggleMenu
                ? "inline-block self-center "
                : mode === "light"
                ? "lg:inline-block hidden cursor-pointer hover:text-black hover:bg-white hover:p-1 hover:rounded-full"
                : "lg:inline-block hidden cursor-pointer hover:text-white hover:bg-black hover:p-1 hover:rounded-full"
            }
          >
            Home
          </p>
        </Link>
        <Link to="/work">
          <p
            className={
              toggleMenu
                ? "inline-block self-center cursor-pointer"
                : mode === "light"
                ? "lg:inline-block hidden cursor-pointer hover:text-black hover:bg-white hover:p-1 hover:rounded-full"
                : "lg:inline-block hidden cursor-pointer hover:text-white hover:bg-black hover:p-1 hover:rounded-full"
            }
          >
            Projects
          </p>
        </Link>
        <Link to={'/about'}>
          <p
            className={
              toggleMenu
                ? "inline-block self-center cursor-pointer"
                : mode === "light"
                ? "lg:inline-block hidden cursor-pointer hover:text-black hover:bg-white hover:p-1 hover:rounded-full"
                : "lg:inline-block hidden cursor-pointer hover:text-white hover:bg-black hover:p-1 hover:rounded-full"
            }
          >
            About
          </p>
        </Link>
        <p
          className={
            toggleMenu
              ? "inline-block self-center cursor-pointer"
              : mode === "light"
              ? "lg:inline-block hidden cursor-pointer hover:text-black hover:bg-white hover:p-1 hover:rounded-full"
              : "lg:inline-block hidden cursor-pointer hover:text-white hover:bg-black hover:p-1 hover:rounded-full"
          }
        >
          Contact
        </p>
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
      </nav>
    </div>
  );
}
