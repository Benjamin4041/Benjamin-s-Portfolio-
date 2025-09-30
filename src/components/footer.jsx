import React, { useContext } from "react";
import ModeProvider from "../context/mode";
import { Link, useNavigate } from "react-router-dom";
import AnimatedCopy from "./AnimatedCopy/AnimatedCopy";

export default function Footer() {
  const { mode } = useContext(ModeProvider);
  let navigate = useNavigate();
  let openEmail = () => {
    window.location.href =
      "mailto:user@example.com?subject=Subject&body=message%20goes%20here";
  };
  return (
    <footer
      className={
        mode === "light"
          ? "bg-black fixed bottom-0 w-full -z-10 text-white pt-20 lg:px-20 px-5 lg:rounded-t-[5rem] rounded-t-[1.5rem]  pb-14 mt-28 h-[97vh] flex flex-col justify-between"
          : "bg-white fixed bottom-0 w-full -z-10 text-black pt-20 lg:px-20 px-5 lg:rounded-t-[5rem] rounded-t-[1.5rem] pb-14 mt-28 h-[97vh] flex flex-col justify-between"
      }
    >
      <div className="flex lg:justify-between items-start justify-start lg:flex-row flex-col">
        <div>
          <h3 className="lg:text-3xl lg:w-[55%] w-[65%] text-[23px]">
            See how I can help you, get in touch today.
          </h3>
        </div>
        <div className="flex lg:gap-44 gap-24 lg:mt-0 mt-14 justify-items-end pr-36">
          <ul>
            <li className="mb-5 text-nowrap">{"{ Content }"}</li>

            <Link to={"/"}>
              <div className="mb-5 group"></div>{" "}
              <div className="mb-5 group">
                <li className=" lg:text-[15px] text-[13px]">Home</li>
                <hr className="border-1 w-0 transition-all ease-in-out duration-1000  group-hover:w-full rounded-3xl" />
              </div>
            </Link>
            <Link to={"/works"}>
              <div className="mb-5 group">
                {" "}
                <li className=" lg:text-[15px] text-[13px]">Works</li>
                <hr className="border-1 w-0 transition-all ease-in-out duration-1000  group-hover:w-full rounded-3xl" />
              </div>
            </Link>
            <Link to={"/about"}>
              <div className="mb-5 group">
                {" "}
                <li className=" lg:text-[15px] text-[13px]">About</li>
                <hr className="border-1 w-0 transition-all ease-in-out duration-1000  group-hover:w-full rounded-3xl" />
              </div>
            </Link>
            <Link to={"/contact"}>
              <div className="mb-5 group">
                <li className=" lg:text-[15px] text-[13px]">Contact</li>
                <hr className="border-1 w-0 transition-all ease-in-out duration-1000  group-hover:w-full rounded-3xl" />
              </div>{" "}
            </Link>
          </ul>
          <ul>
            <div></div>
            <li className="mb-5 text-nowrap">{"{ Connect }"}</li>
            <div className="group mb-5">
              {" "}
              <a href="https://www.linkedin.com/in/benjamin-anoruo-aa9b36245/" target='_blank'>
                <li className=" lg:text-[15px] text-[13px]">LinkedIn</li>
                <hr className="border-1 w-0 transition-all ease-in-out duration-1000  group-hover:w-full rounded-3xl" />
              </a>
            </div>
            <div className="group mb-5">
              <a href="https://www.instagram.com/official_ba_dev?igsh=MW44M3RqNnR0NDZjdA%3D%3D&utm_source=qr" target='_blank'>
                <li className=" lg:text-[15px] text-[13px]">Instagram</li>
                <hr className="border-1 w-0 transition-all ease-in-out duration-1000  group-hover:w-full rounded-3xl" />
              </a>
            </div>
            <div className="group mb-5">
              <a href="" target='_blank'>
                <li className=" lg:text-[15px] text-[13px]">Facebook</li>
                <hr className="border-1 w-0 transition-all ease-in-out duration-1000  group-hover:w-full rounded-3xl" />
              </a>
            </div>
            <div className="group mb-5">
              <a href="https://x.com/AnoruoBenjamin" target='_blank'>
                <li className=" lg:text-[15px] text-[13px]">X</li>
                <hr className="border-1 w-0 transition-all ease-in-out duration-1000  group-hover:w-full rounded-3xl" />
              </a>
            </div>
          </ul>
        </div>
      </div>
      <div className="w-full">
        <h1 className="lg:text-9xl text-center text-5xl">Benjamin .A Dev</h1>
        <div className="flex w-full justify-between mt-9">
          <span className="flex gap-10 lg:text-[12px] text-[10px]">
            {" "}
            <AnimatedCopy>© 2025</AnimatedCopy>
            <AnimatedCopy>T&C's</AnimatedCopy>
            <AnimatedCopy>Privacy</AnimatedCopy>
          </span>
          <AnimatedCopy className="lg:text-[12px] text-[10px]">
            Site by Form
          </AnimatedCopy>
        </div>
      </div>
    </footer>
  );
}
