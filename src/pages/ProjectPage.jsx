import React, { useContext, useRef } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ModeContext from "../context/mode";
import { useNavigate } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import AnimatedCopy from "../components/AnimatedCopy/AnimatedCopy";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import ScrollToTop from "../hooks/scrolltotop";
import Layout from "../components/layout";

export default function ProjectPage({ details }) {
  const { mode } = useContext(ModeContext);

  let navigate = useNavigate();

  if (!details) return <div>Project not found</div>;
  return (
    <Layout navStyle={'absolute top-0'}>
      <div
        className={
          mode === "light" ? " bg-white text-black" : " bg-black text-white"
        }
      >
        <section className=" h-fit px-[2em] lg:px-[94.3px]">
          <div className="w-full flex justify-center items-center relative mt-8 lg:mt-40 mb-16">
            <img
              src={details.imageUrl}
              alt=""
              className="lg:w-[90%] w-full self-center"
            />
          </div>
          <div className="flex lg:w-[97%] m-auto justify-between items-start">
            <h3>{details.role}</h3>
            <h3>
              {details.period}
              <br />
              {details.companyName}
            </h3>
          </div>
        </section>
        <section className=" px-[2em] lg:px-[] lg:pt-64 pt-24">
          <AnimatedCopy className="lg:w-[30%] text-start ml-36 mb-36" tag="p">
            {details.copy}
          </AnimatedCopy>
          <div className="">
            <AnimatedCopy className="mb-5" tag="h1">
              Project overview
            </AnimatedCopy>
            <AnimatedCopy className="lg:w-[30%] hidden lg:block">
              Working directly with the lead developer on new react
              Nextfrontend. Reviewing, refactor and mentor internal teamhow to
              optimize source code using best practices anddesign patterns.
            </AnimatedCopy>
          </div>
          <AnimatedCopy className="lg:hidden mt-8">
            Working directly with the lead developer on new react Nextfrontend.
            Reviewing, refactor and mentor internal teamhow to optimize source
            code using best practices anddesign patterns.
          </AnimatedCopy>
          <div className="flex flex-col justify-center lg:items-start h-fit w-full">
            <div className=" lg:gap-20 gap-10  lg:w-[40%]  mt-32  pb-6 lg:pr-36">
              <AnimatedCopy className="text-nowrap mb-6">
                PROJECT GOALS
              </AnimatedCopy>
              <ul>
                {details.projectGoals.map((item) => (
                  <li className="mb-3">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="  lg:w-[20%] float-end  pb-6 mt-7 ">
              <AnimatedCopy className="self-start mb-6">
                TECHNOLOGIES
              </AnimatedCopy>
              <ul>
                {details.technologies.map((item) => (
                  <li className="mb-3 text-start">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className=" px-[2em] lg:px-[94.3px] mb-[100vh] pb-24 mt-[5em]">
          {details.imageUrls.map((images) => (
            <img
              src={images}
              alt=""
              className="mb-20 lg:mb-44 w-[50%] m-auto"
            />
          ))}
          {/* <img
          src="https://agustinburgos.com/images/mystery-minds_3.webp"
          alt=""
          className="mb-20 lg:mb-44"
        />
        <img
          src="https://agustinburgos.com/images/mystery-minds_3.webp"
          alt=""
          className="mb-20 lg:mb-44"
        /> */}
          <a href={details.siteUrl} target="blank">
            <button className="border-2 p-3 text-xl rounded-full hover:border-[0.3rem] flex justify-center items-center gap-9">
              Visit Website <MdArrowOutward />
            </button>
          </a>
        </section>
      </div>
    </Layout>
    // <div>
    //   <h1>{details.companyName}</h1>
    //   <img src={details.imageUrl} alt={details.companyName} />
    //   <AnimatedCopy>{details.copy}</AnimatedCopy>
    //   {/* Render other details as needed */}
    // </div>
  );
}
