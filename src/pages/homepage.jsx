import { React, useContext, useState } from "react";
import Navbar from "../components/navbar";
import Project from "../components/project";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import ModeProvider, { ModeContext } from "../context/mode";
import "./all.css";

export default function Homepage() {
  //   const [mode, setMode] = useState("light");
  const { mode, setMode } = useContext(ModeProvider);
  return (
    <div
      className={
        mode === "light" ? " bg-white text-black" : " bg-black text-white"
      }
    >
      <section className="w-full lg:h-screen lg:pb-0 pb-5">
        <Navbar />
        <div className="flex flex-col">
          <h1 className="text-center text-[17vw] h-fit">Fullstack Dev</h1>
          <div
            className={
              mode == "light"
                ? "flex justify-center items-center gap-4 bg-[#F9F9F9] w-fit p-4 rounded-full self-end mr-5"
                : "flex justify-center items-center gap-4  bg-[#141414] w-fit p-4 rounded-full self-end mr-5"
            }
          >
            <p>SCROLL DOWN</p>
            <span
              className={
                mode === "light"
                  ? "fill-black stroke-black"
                  : "fill-white stroke-white"
              }
            >
              <svg
                width="13"
                height="16"
                viewBox="0 0 13 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_37_21106)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.02722 13.1657C7.3145 12.8537 7.66169 12.4914 8.05373 12.1103C9.1898 11.0057 10.745 9.70094 12.335 9.03846L12.7196 9.96154C11.3095 10.5491 9.86474 11.7443 8.75081 12.8272C8.1993 13.3634 7.73931 13.8617 7.41747 14.2257C7.25668 14.4076 7.13071 14.5555 7.04541 14.6574C7.00277 14.7083 6.97032 14.7477 6.94878 14.7741L6.92477 14.8036L6.91909 14.8106L6.91785 14.8122L6.52727 15.3004L6.1369 14.8124L6.13545 14.8106L6.12976 14.8036L6.10575 14.7741C6.08422 14.7477 6.05177 14.7083 6.00912 14.6574C5.92383 14.5555 5.79786 14.4076 5.63707 14.2257C5.31523 13.8617 4.85524 13.3634 4.30373 12.8272C3.1898 11.7443 1.74502 10.5491 0.334961 9.96154L0.719576 9.03846C2.30951 9.70094 3.86474 11.0057 5.00081 12.1103C5.39281 12.4914 5.73996 12.8537 6.02722 13.1656V0.5H7.02722V13.1657Z"
                    // fill="black"
                    // stroke="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_37_21106">
                    <rect
                      width="13"
                      height="15"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </div>
        </div>
        <div className="lg:px-5 px-2 flex justify-between w-full lg:mt-12 mt-5">
          <p className="hidden lg:inline-block">
            Let’s Talk
            <br />
            <p className="">anoruokachi2@gmail.com</p>
          </p>
          <p className="lg:w-[30%]">
            Hi there, I am Benjamin, a seasoned Fullstack developer crafting
            robust web apps, intuitive UIs, and scalable solutions.
          </p>
        </div>
      </section>
      <section className=" lg:px-10 px-[17px]">
        <div className="flex w-full justify-between" id="projects">
          <div>
            <h3 className="w-fit text-[3rem]">Projects</h3>
            <p className="lg:w-[392px] mt-6">
              As a seasoned Fullstack developer, I'm dedicated to building
              contemporary, user-friendly web designs and cutting-edge digital
              solutions. Let me help you construct the brand of your dreams by
              creating dynamic and engaging online experiences.
            </p>
          </div>

          <Link to={"/work"}>
            <p className="flex justify-center items-center gap-3 cursor-pointer lg:self-end translate-y-9 lg:translate-y-0">
              more{" "}
              <span
                className={
                  mode === "light"
                    ? "fill-black stroke-black"
                    : "fill-white stroke-white"
                }
              >
                <svg
                  width="15"
                  height="13"
                  viewBox="0 0 15 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.6657 5.97278C12.3537 5.6855 11.9914 5.33831 11.6103 4.94627C10.5057 3.8102 9.20094 2.255 8.53846 0.665L9.46154 0.2804C10.0491 1.6905 11.2443 3.13526 12.3272 4.24919C12.8634 4.8007 13.3617 5.26069 13.7257 5.58253C13.9076 5.74332 14.0555 5.86929 14.1574 5.95459C14.2083 5.99723 14.2477 6.02968 14.2741 6.05122L14.3036 6.07523L14.3106 6.08091L14.3122 6.08215L14.8004 6.47273L14.3124 6.8631L14.3106 6.86455L14.3036 6.87024L14.2741 6.89425C14.2477 6.91578 14.2083 6.94823 14.1574 6.99088C14.0555 7.07617 13.9076 7.20214 13.7257 7.36293C13.3617 7.68477 12.8634 8.14476 12.3272 8.69627C11.2443 9.8102 10.0491 11.255 9.46154 12.665L8.53846 12.2804C9.20094 10.6905 10.5057 9.13526 11.6103 7.99919C11.9914 7.60719 12.3537 7.26004 12.6656 6.97278L-2.48817e-07 6.97278L-2.92528e-07 5.97278L12.6657 5.97278Z"
                    // fill="white"
                    // stroke="white"
                  />
                </svg>
              </span>
            </p>
          </Link>
        </div>

        {/* projects */}

        <div className="w-full flex justify-center items-center flex-wrap pt-10 gap-12 pb-10 ">
          <Project
            image={
              "https://res.cloudinary.com/ba-foods/image/upload/v1708720593/Screen_Shot_2023-05-27_at_2.38.39_PM_aigoez.png"
            }
            name={"Game Landing page"}
            link={"https://aquamarine-yeot-b02665.netlify.app"}
            mode={mode}
          />
          <Project
            image={
              "https://res.cloudinary.com/ba-foods/image/upload/v1708720585/Screen_Shot_2023-05-25_at_8.26.12_AM_copy_ivmaeg.png"
            }
            name={" E-commerce store"}
            link={"https://timely-druid-89bd42.netlify.app"}
            mode={mode}
          />
          <Project
            image={
              "https://res.cloudinary.com/ba-foods/image/upload/v1708720583/nftPic_dlh1dw.png"
            }
            name={"NFT market place"}
            link={"https://aesthetic-cocada-e52e92.netlify.app"}
            mode={mode}
          />
          <Project
            image={
              "https://res.cloudinary.com/ba-foods/image/upload/v1708777337/Screenshot_2024-02-24_at_12.21.21_pm_cu5aog.png"
            }
            name={"Product landing page"}
            link={"https://snazzy-peony-8fa3a3.netlify.app/"}
            mode={mode}
          />
        </div>
      </section>
      <section className="lg:px-10 lg:py-60 w-full px-4 relative pt-60 lg:h-screen lg:pb-80">
        <div
          className={
            mode == "light"
              ? "bg-black w-full py-3 absolute top-0 left-0 overflow-hidden "
              : "bg-white w-full py-3 absolute top-0 left-0 overflow-hidden "
          }
        >
          <ul
            className={
              mode == "light"
                ? "text-white lg:text-[8.8rem] text-[4.4rem] text-center -translate-x-16 text-nowrap moving-text flex gap-32 justify-between"
                : "text-black lg:text-[8.8rem] text-[4.4rem] text-center -translate-x-16  text-nowrap moving-text flex gap-32 justify-between"
            }
          >
            <li className="list-none">my Stack </li>
            <li className="list-none">my Stack </li>
            <li className="list-none">my Stack </li>
            <li className="list-none">my Stack </li>
            <li className="list-none">my Stack </li>
            <li className="list-none">my Stack </li>
          </ul>
        </div>

        <div className="flex justify-center items-center gap-2 lg:pt-10">
          <IoIosArrowBack
            size={50}
            className="cursor-pointer inline-block lg:hidden"
          />
          <div className="overflow-hidden">
            <div className="flex gap-32  lg:gap-52 pt-10 lg:-translate-x-0  w-full">
              <ul className="lg:w-fit w-full">
                <li className="border-solid border-x-4 px-4 text-xl mb-4 border-black ">
                  LANGUAGES
                </li>
                <li className="border-solid border-y-2 py-2 text-xl mb-4 border-black flex gap-3">
                  <img src="./assets/html.svg" className="w-[10%]" alt="" />
                  HTML
                </li>
                <li className="border-solid border-b-2 pb-2 text-xl mb-4 border-black flex gap-3">
                  <img src="./assets/css.svg" className="w-[10%]" alt="" />
                  CSS
                </li>
                <li className="border-solid border-b-2 pb-2 text-xl mb-4 border-black flex gap-3">
                  <img src="./assets/js.svg" className="w-[10%]" alt="" />
                  Javascript
                </li>
                <li className="text-xl flex gap-3">
                  <img src="./assets/python.svg" className="w-[10%]" alt="" />
                  Python
                </li>
              </ul>
              <ul className="lg:inline-block hidden">
                <li className="border-solid border-x-4 px-4 text-xl mb-4 border-black flex gap-3">
                  LIBRARIES
                </li>
                <li className="border-solid border-y-2 py-2 text-xl mb-4 border-black flex gap-3">
                  <img src="./assets/python.svg" className="w-[10%]" alt="" />
                  AOS
                </li>
                <li className="border-solid border-b-2 pb-2 text-xl mb-4 border-black flex gap-3">
                  <img src="./assets/nodejs.svg" className="w-[10%]" alt="" />
                  NodeJS
                </li>
                <li className="border-solid border-b-2 pb-2 text-xl mb-4 border-black flex gap-3">
                  <img src="./assets/jquery.svg" className="w-[10%]" alt="" />
                  Jquery
                </li>
                <li className="border-solid border-b-2 pb-2 text-xl mb-4 border-black flex gap-3">
                  <img src="./assets/r3f.svg" className="w-[10%]" alt="" />
                  R3F
                </li>
                <li className="border-solid border-b-2 pb-2 text-xl mb-4 border-black flex gap-3">
                  <img src="./assets/gsap.svg" className="w-[10%]" alt="" />
                  GSAP
                </li>
                <li className="text-xl flex gap-3">D3JS</li>
              </ul>
              <ul className="lg:inline-block hidden">
                <li className="border-solid border-x-4 px-4 text-xl mb-4 border-black ">
                  FRAMEWORK
                </li>
                <li className="border-solid border-y-2 py-2 text-xl mb-4 border-black flex gap-3">
                  <img
                    src="./assets/bootstrap.svg"
                    className="w-[10%]"
                    alt=""
                  />
                  Bootstrap
                </li>
                <li className="border-solid border-b-2 pb-2 text-xl mb-4 border-black flex gap-3">
                  <img src="./assets/react.svg" className="w-[10%]" alt="" />
                  React.JS
                </li>
                <li className="text-xl flex gap-3">
                  <img src="./assets/next.svg" className="w-[10%]" alt="" />
                  Next.JS
                </li>
              </ul>
            </div>
          </div>
          <IoIosArrowForward
            size={50}
            className="cursor-pointer inline-block lg:hidden"
          />
        </div>
      </section>
      <section className="lg:pt-20 pt-10 lg:px-10 px-5">
        <h2 className="lg:mb-20 lg:h-16 lg:not-italic lg:font-normal lg:text-6xl  pt-2 w-32 not-italic font-normal text-2xl mb-10">
          Testimonials
        </h2>
        <div className="flex lg:flex-row flex-col">
          <p className="mb-7 not-italic font-normal lg:text-5xl text-sm leading-6 lg:w-[70%]  ">
            “Benjamin's prowess as a developer is unparalleled. His ability to
            translate abstract ideas into exceptional digital solutions is
            remarkable. Over the years, I've seen him craft everything from
            intricate web applications to seamless user experiences with finesse
            and professionalism.”
          </p>
          <p className="lg:self-end  not-italic font-normal lg:text-xl text-sm">
            Bryan
            <br />
            <span className="block pt-2">Product Designer</span>
          </p>
        </div>

        {/* footer */}
        <Footer mode={mode} />
      </section>
    </div>
  );
}
