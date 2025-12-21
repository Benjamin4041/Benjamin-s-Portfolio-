import { useContext } from "react";
import { FaMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileNavToggoleContext from "../context/MobileNavToggole";
import ModeContext from "../context/mode";
import NavbarOptions from "./NavbarOptions";

export default function Navbar({ style }) {
  const { mode, setMode } = useContext(ModeContext);
  const { toggleMenu, setToggleMenu } = useContext(MobileNavToggoleContext);
  const changeMode = () => {
    setMode((curr) => (curr == "light" ? "dark" : "light"));
  };
  const mobileMenuRevile=()=>{
    setToggleMenu((curr)=>!curr)
  }
  return (
    <div className="lg:h-fit h-full">
      <nav
        className={
          mode == "light"
            ? "lg:flex justify-between items-center w-[40%]  bg-black text-white absolute p-4 top-4 right-0 -translate-x-[80%]  z-30 rounded-full hidden"
            : "lg:flex justify-between items-center w-[40%]  bg-white text-black absolute p-4 top-4 right-0 -translate-x-[80%]  z-30 rounded-full hidden"
        }
      >
        <NavbarOptions content={"Home"} to={"/"} />
        <NavbarOptions content={"About"} to={"/about"} />
        <NavbarOptions content={"Works"} to={"/works"} />
        <NavbarOptions content={"Contact"} to={"/contact"} />
        {mode == "light" ? (
          <MdOutlineWbSunny
            size={24}
            onClick={changeMode}
            className="cursor-pointer"
          />
        ) : (
          <FaMoon size={24} onClick={changeMode} className="cursor-pointer" />
        )}
      </nav>
      <nav
        className={
          toggleMenu ? (mode == "light" ? "bg-black text-white p-5 h-full absolute z-30 w-full" : " bg-white text-black") : "float-right pt-6 pr-4 lg:hidden"
        }
      >
        <RxHamburgerMenu size={24} onClick={mobileMenuRevile}/>
        <div className="text-white flex flex-col justify-center items-center w-full">
          <NavbarOptions content={"Home"} to={"/"} onClick={mobileMenuRevile}/>
          <NavbarOptions content={"About"} to={"/about"} onClick={mobileMenuRevile}/>
          <NavbarOptions content={"Works"} to={"/works"} onClick={mobileMenuRevile}/>
          <NavbarOptions content={"Contact"} to={"/contact"} onClick={mobileMenuRevile}/>
        </div>
      </nav>
    </div>
  );
}
