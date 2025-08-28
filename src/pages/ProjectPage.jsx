import React, { useContext, useRef } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ModeProvider from "../context/mode";
import { useNavigate } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import AnimatedCopy from "../components/AnimatedCopy/AnimatedCopy";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import ScrollToTop from '../hooks/scrolltotop';

export default function ProjectPage({ details }) {
  const { mode } = useContext(ModeProvider);

  let navigate = useNavigate();
  let headerText = useRef();

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
  }, []);

  if (!details) return <div>Project not found</div>;
  return (
    <div
      className={
        mode === "light" ? " bg-white text-black" : " bg-black text-white"
      }
    >
      <ScrollToTop />
      <section className=" h-fit px-[2em] lg:px-[94.3px]">
        <Navbar />
        <div className="w-full flex justify-center items-center relative mt-8 lg:mt-40 mb-16">
          <img
            src={details.imageUrl}
            alt=""
            className="lg:w-[50%] w-full self-center"
          />
          <h1
            className="text-center absolute text-[2.75rem] lg:text-[188.6px] uppercase leading-none"
            ref={headerText}
          >
            {details.companyName}
          </h1>
        </div>
        <div className="flex lg:w-[50%] m-auto justify-between items-start">
          <h3>{details.role}</h3>
          <h3>
            {details.period}
            <br />
            {details.companyName}
          </h3>
        </div>
      </section>
      <section className=" px-[2em] lg:px-[94.3px] lg:pt-64 pt-24">
        <AnimatedCopy className="lg:w-[26%] text-start m-auto mb-36">
          {details.copy}
        </AnimatedCopy>
        <div className="flex justify-between items-center ">
          <AnimatedCopy>01</AnimatedCopy>
          <AnimatedCopy>Project overview</AnimatedCopy>
          <AnimatedCopy className="lg:w-[30%] hidden lg:block">
            Working directly with the lead developer on new react Nextfrontend.
            Reviewing, refactor and mentor internal teamhow to optimize source
            code using best practices anddesign patterns.
          </AnimatedCopy>
        </div>
        <AnimatedCopy className="lg:hidden mt-8">
          Working directly with the lead developer on new react Nextfrontend.
          Reviewing, refactor and mentor internal teamhow to optimize source
          code using best practices anddesign patterns.
        </AnimatedCopy>
        <div className="flex flex-col justify-center lg:items-end h-fit w-full">
          <div className="flex lg:justify-start justify-center lg:flex-row flex-col lg:gap-20 gap-10 lg:items-start items-center lg:w-[40%]  mt-32 border-b-2 pb-6 lg:pr-36">
            <AnimatedCopy className="text-nowrap">PROJECT GOALS</AnimatedCopy>
            <ul>
              {details.projectGoals.map((item) => (
                <li className="mb-3">{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex lg:flex-row flex-col lg:justify-start lg:gap-20 gap-10 lg:items-start lg:w-[40%] float-end border-b-2 pb-6 mt-7 lg:pr-36">
            <AnimatedCopy className="self-start">TECHNOLOGIES</AnimatedCopy>
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
          <img src={images} alt="" className="mb-20 lg:mb-44" />
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

      <Footer />
    </div>
    // <div>
    //   <h1>{details.companyName}</h1>
    //   <img src={details.imageUrl} alt={details.companyName} />
    //   <AnimatedCopy>{details.copy}</AnimatedCopy>
    //   {/* Render other details as needed */}
    // </div>
  );
}
