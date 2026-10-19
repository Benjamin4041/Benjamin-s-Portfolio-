import React, { useContext } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ModeProvider from "../context/mode";
import { MdArrowOutward } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import AnimatedCopy from "../components/AnimatedCopy/AnimatedCopy";
import ScrollToTop from "../hooks/scrolltotop";
import Seo, { SITE_NAME } from "../components/Seo";
import { cldImage, isTodo, showContent } from "../utiliis/projectDetails";

// Placeholder text is highlighted in development so it's easy to spot.
const todoClass = (value) => (isTodo(value) ? "text-red-500" : "");

export default function ProjectPage({ details }) {
  const { mode } = useContext(ModeProvider);

  if (!details)
    return (
      <>
        <Seo title={`Project not found | ${SITE_NAME}`} />
        <div>Project not found</div>
      </>
    );

  const images = details.images.filter((image) => image.src);

  return (
    <div
      className={
        mode === "light" ? " bg-white text-black" : " bg-black text-white"
      }
    >
      <Seo
        title={`${details.companyName} — Case Study | ${SITE_NAME}`}
        description={details.copy}
        image={cldImage(details.imageUrl, "c_fill,w_1200,h_630,f_jpg,q_auto")}
      />
      <ScrollToTop />
      <section className=" h-fit px-[2em] lg:px-[94.3px]">
        <Navbar />
        <div className="w-full flex justify-center items-center relative mt-8 lg:mt-40 mb-16">
          <img
            src={cldImage(details.imageUrl)}
            alt={details.imageAlt}
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
      <section className=" px-[2em] lg:px-[] lg:pt-32 pt-16">
        <AnimatedCopy className="lg:w-[30%] text-start lg:ml-36 mb-16 lg:mb-20" tag="p">
          {details.copy}
        </AnimatedCopy>
        {showContent(details.overview) && (
          <div className={todoClass(details.overview)}>
            <AnimatedCopy className="mb-5" tag="h1">
              Project overview
            </AnimatedCopy>
            <AnimatedCopy className="lg:w-[30%]">{details.overview}</AnimatedCopy>
          </div>
        )}
        {showContent(details.outcome) && (
          <div className={`mt-16 ${todoClass(details.outcome)}`}>
            <AnimatedCopy className="mb-5" tag="h1">
              Outcome
            </AnimatedCopy>
            <AnimatedCopy className="lg:w-[30%]">{details.outcome}</AnimatedCopy>
          </div>
        )}
        <div className="flex flex-col justify-center lg:items-start h-fit w-full">
          <div className=" lg:gap-20 gap-10  lg:w-[40%]  mt-20  pb-6 lg:pr-36">
            <AnimatedCopy className="text-nowrap mb-6">PROJECT GOALS</AnimatedCopy>
            <ul>
              {details.projectGoals.map((item) => (
                <li className="mb-3" key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div >
          <div className="  lg:w-[20%] float-end  pb-6 mt-7 ">
            <AnimatedCopy className="self-start mb-6">TECHNOLOGIES</AnimatedCopy>
            <ul>
              {details.technologies.map((item) => (
                <li className="mb-3 text-start" key={item}>{item}</li>
              ))}
            </ul>
            {showContent(details.techTodo) && (
              <p className={todoClass(details.techTodo)}>{details.techTodo}</p>
            )}
          </div>
        </div>
      </section>
      <section className=" px-[2em] lg:px-[94.3px] mb-[100vh] pb-24 mt-[5em]">
        {images.map((image) => (
          <img
            key={image.src}
            src={cldImage(image.src)}
            alt={image.alt}
            loading="lazy"
            className="mb-12 lg:mb-24 w-[50%] m-auto"
          />
        ))}
        <div className="flex flex-wrap gap-4">
          <a href={details.siteUrl} target="_blank" rel="noreferrer">
            <button className="border-2 p-3 text-xl rounded-full hover:border-[0.3rem] flex justify-center items-center gap-9">
              Visit Website <MdArrowOutward />
            </button>
          </a>
          {showContent(details.github) &&
            (isTodo(details.github) ? (
              <p className={todoClass(details.github)}>{details.github}</p>
            ) : (
              <a href={details.github} target="_blank" rel="noreferrer">
                <button className="border-2 p-3 text-xl rounded-full hover:border-[0.3rem] flex justify-center items-center gap-9">
                  View code <FaGithub />
                </button>
              </a>
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
