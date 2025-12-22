import { React, useContext, useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import Project from "../components/project";
import { IoLogoJavascript } from "react-icons/io";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import ModeContext from "../context/mode";
import gsap from "gsap";
import "./all.css";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import {
  FaBootstrap,
  FaChartLine,
  FaCss3,
  FaHtml5,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { SiJquery, SiNextdotjs } from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";
import ScrollToTop from "../hooks/scrolltotop";
import AnimatedCopy from "../components/AnimatedCopy/AnimatedCopy";
import Review from "../components/Review";
import WorksSection from "../components/WorksSection/WorksSection";
import Resume from "/assets/pdf/Fullstack_cv.pdf";
import Reviews from "../utiliis/reviews";
import Layout from "../components/layout";

export default function Homepage() {
  //   const [mode, setMode] = useState("light");
  const { mode } = useContext(ModeContext);
  const headerText = useRef();
  const [copied, setCopied] = useState(false);

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % Reviews.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [Reviews.length]);
  gsap.registerPlugin(SplitText);
  const copyEmail = () => {
    navigator.clipboard.writeText("anoruokachi2@gmail.com");
  };
  useGSAP(() => {
    const split = new SplitText(headerText.current, {
      type: "chars",
      position: "relative",
    });

    gsap.from(split.chars, {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: "power4.out",
    });
  }, []); // Empty deps array = run once on mount
  useEffect(() => {
    let copiedTimeout = setTimeout(() => setCopied(false), 2000);
    return clearTimeout(copiedTimeout);
  }, [copied]);
  return (
    <Layout navStyle={'absolute w-full top-6 z-10'}>
      <div
        className={
          mode === "light" ? " bg-white text-black h-full pt-16 mb-[100vh]" : " bg-black text-white pt-16 mb-[100vh]"
        }
      >
        <section className="w-full lg:pb-0 pb-5 z-10 overflow-x-hidden">
          <div className="flex flex-col">
            <div className="overflow-hidden w-fit h-fit">
              <h1
                className="text-center text-[16vw] h-fit text-nowrap font-Gestura"
                ref={headerText}
              >
                Fullstack Dev
              </h1>
            </div>
            <a
              className={
                mode == "light"
                  ? "flex justify-center items-center gap-4 group bg-[#F9F9F9] hover:bg-[#141414] hover:text-[#F9F9F9] w-fit p-4 rounded-full self-end mr-5 cursor-pointer"
                  : "flex justify-center items-center gap-4 group bg-[#141414] w-fit p-4 rounded-full self-end mr-5 cursor-pointer hover:bg-[#F9F9F9] hover:text-[#141414] "
              }
              href={Resume}
              download
            >
              <AnimatedCopy>Download CV</AnimatedCopy>
              <span
                className={
                  mode === "light"
                    ? "fill-black stroke-black group-hover:fill-white group-hover:stroke-white "
                    : "fill-white stroke-white group-hover:fill-black group-hover:stroke-black "
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
            </a>
          </div>
          <div className="lg:px-5 px-2 flex  justify-between w-full lg:mt-12 mt-5">
            <AnimatedCopy className="hidden lg:inline-block ">
              Let’s Talk
              {/* <br /> */}
              {/* <div
              className={
                copied == true ? "flex justify-center items-center" : "hidden"
              }
            >
              <p className="font-Gestura">copied!!</p>
            </div> */}
              <span
                onClick={() => {
                  copyEmail();
                  // return setCopied((prev) => (prev = true));
                }}
                className="cursor-pointer font-Gestura"
              >
                anoruokachi2@gmail.com
              </span>
            </AnimatedCopy>
            <AnimatedCopy
              className="lg:w-[30%] 2xl:w-[10%] font-Gestura"
              tag="p"
            >
              Hi there, I am Benjamin, a seasoned Fullstack developer crafting
              robust web apps, intuitive UIs, and scalable solutions.
            </AnimatedCopy>
          </div>
        </section>
        <section className="w-full lg:px-10 px-[17px] pt-20 ">
          <div className="flex w-full justify-between" id="projects">
            <div>
              <h3 className="w-fit text-[3rem]">Projects</h3>
              <AnimatedCopy className="lg:w-[392px] mt-6">
                As a seasoned Fullstack developer, I'm dedicated to building
                contemporary, user-friendly web designs and cutting-edge digital
                solutions. Let me help you construct the brand of your dreams by
                creating dynamic and engaging online experiences.
              </AnimatedCopy>
            </div>

            <Link to={"/works"}>
              <AnimatedCopy className="flex justify-center items-center gap-3 cursor-pointer lg:self-end translate-y-9 lg:translate-y-0">
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
                    />
                  </svg>
                </span>
              </AnimatedCopy>
            </Link>
          </div>
          {/* <Projects /> */}
          <WorksSection />
        </section>
        <section className="lg:px-10 lg:pt-10 w-full px-4 relative pt-10 lg:h-fit lg:pb-56 ">
          <AnimatedCopy
            className="text-center text-5xl font-semibold font-Gestura"
            tag="h1"
          >
            My Tech Stack
          </AnimatedCopy>
          <div className="flex justify-center items-center gap-2 lg:pt-36">
            <div className="overflow-hidden">
              <div className="flex justify-between w-full gap-12 lg:flex-row flex-col">
                <ul className="lg:w-[50%] w-full">
                  <li className="border-solid border-x-4 px-4 text-xl mb-4 border-black ">
                    LANGUAGES
                  </li>
                  <li
                    className={
                      mode === "light"
                        ? "border-solid border-b-2 pb-2 text-xl mb-4 border-black flex gap-3"
                        : "border-solid border-b-2 pb-2 text-xl mb-4 border-white flex gap-3"
                    }
                  >
                    <FaHtml5
                      size={45}
                      color={mode === "light" ? "black" : "white"}
                    />
                    HTML
                  </li>
                  <li
                    className={
                      mode === "light"
                        ? "border-solid border-b-2 pb-2 text-xl mb-4 border-black flex gap-3"
                        : "border-solid border-b-2 pb-2 text-xl mb-4 border-white flex gap-3"
                    }
                  >
                    <FaCss3
                      size={45}
                      color={mode === "light" ? "black" : "white"}
                    />
                    CSS
                  </li>
                  <li
                    className={
                      mode === "light"
                        ? "border-solid border-b-2 pb-2 text-xl mb-4 border-black flex gap-3"
                        : "border-solid border-b-2 pb-2 text-xl mb-4 border-white flex gap-3"
                    }
                  >
                    <IoLogoJavascript
                      size={45}
                      color={mode === "light" ? "black" : "white"}
                    />
                    Javascript
                  </li>
                  <li
                    className={
                      mode === "light"
                        ? "border-solid border-b-2 pb-2 text-xl mb-4 border-black flex gap-3"
                        : "border-solid border-b-2 pb-2 text-xl mb-4 border-white flex gap-3"
                    }
                  >
                    <FaPython
                      size={45}
                      color={mode === "light" ? "black" : "white"}
                    />
                    Python
                  </li>
                </ul>
                <ul className="lg:w-[50%] w-full">
                  <li className="border-solid border-x-4 px-4 text-xl mb-4 border-black flex gap-3">
                    LIBRARIES
                  </li>
                  <li
                    className={
                      mode === "light"
                        ? "border-solid border-b-2 pb-2 text-xl mb-4 border-black flex gap-3"
                        : "border-solid border-b-2 pb-2 text-xl mb-4 border-white flex gap-3"
                    }
                  >
                    <FaNodeJs
                      size={45}
                      color={mode === "light" ? "black" : "white"}
                    />
                    NodeJS
                  </li>
                  <li
                    className={
                      mode === "light"
                        ? "border-solid border-b-2 pb-2 text-xl mb-4 border-black flex gap-3"
                        : "border-solid border-b-2 pb-2 text-xl mb-4 border-white flex gap-3"
                    }
                  >
                    <SiJquery
                      size={45}
                      color={mode === "light" ? "black" : "white"}
                    />
                    Jquery
                  </li>
                  <li
                    className={
                      mode === "light"
                        ? "border-solid border-b-2 pb-2 text-xl mb-4 border-black flex gap-3"
                        : "border-solid border-b-2 pb-2 text-xl mb-4 border-white flex gap-3"
                    }
                  >
                    <TbBrandThreejs
                      size={45}
                      color={mode === "light" ? "black" : "white"}
                    />
                    R3F
                  </li>
                  <li
                    className={
                      mode === "light"
                        ? "border-solid border-b-2 pb-2 text-xl mb-4 border-black flex gap-3"
                        : "border-solid border-b-2 pb-2 text-xl mb-4 border-white flex gap-3"
                    }
                  >
                    <img src="./assets/gsap.svg" className="w-[10%]" alt="" />
                    GSAP
                  </li>
                  <li
                    className={
                      mode === "light"
                        ? "border-solid border-b-2 pb-2 text-xl mb-4 border-black flex gap-3"
                        : "border-solid border-b-2 pb-2 text-xl mb-4 border-white flex gap-3"
                    }
                  >
                    <FaChartLine
                      size={45}
                      color={mode === "light" ? "black" : "white"}
                    />
                    D3JS
                  </li>
                </ul>
                <ul className="lg:w-[50%] w-full">
                  <li className="border-solid border-x-4 px-4 text-xl mb-4 border-black ">
                    FRAMEWORK
                  </li>
                  <li
                    className={
                      mode === "light"
                        ? "border-solid border-b-2 pb-2 text-xl mb-4 border-black flex gap-3"
                        : "border-solid border-b-2 pb-2 text-xl mb-4 border-white flex gap-3"
                    }
                  >
                    <FaBootstrap
                      size={45}
                      color={mode === "light" ? "black" : "white"}
                    />
                    Bootstrap
                  </li>
                  <li
                    className={
                      mode === "light"
                        ? "border-solid border-b-2 pb-2 text-xl mb-4 border-black flex gap-3"
                        : "border-solid border-b-2 pb-2 text-xl mb-4 border-white flex gap-3"
                    }
                  >
                    <FaReact
                      size={45}
                      color={mode === "light" ? "black" : "white"}
                    />
                    React.JS
                  </li>
                  <li
                    className={
                      mode === "light"
                        ? "border-solid border-b-2 pb-2 text-xl mb-4 border-black flex gap-3"
                        : "border-solid border-b-2 pb-2 text-xl mb-4 border-white flex gap-3"
                    }
                  >
                    <SiNextdotjs
                      size={45}
                      color={mode === "light" ? "black" : "white"}
                    />
                    Next.JS
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="lg:pt-10 pt-10 lg:px-10 px-5  lg:pb-56 pb-20 ">
          <h2 className="lg:mb-20 lg:h-16 lg:not-italic lg:font-normal lg:text-6xl  pt-2 w-32 not-italic font-normal text-2xl mb-10">
            Testimonials
          </h2>
          <div className="overflow-hidden w-full pl-32">
            <div className="flex w-full justify-start items-center gap-10 ">
              <Review
                person={Reviews[currentReviewIndex].person}
                qoute={Reviews[currentReviewIndex].qoute}
                role={Reviews[currentReviewIndex].role}
              />
            </div>
          </div>
          {/* footer */}
        </section>
  
      </div>
    </Layout>
  );
}
