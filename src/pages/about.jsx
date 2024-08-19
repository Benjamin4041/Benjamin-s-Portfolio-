import React, { useContext } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ModeProvider from "../context/mode";

export default function About() {
  const { mode } = useContext(ModeProvider);
  return (
    <div
      className={
        mode === "light" ? " bg-white text-black" : " bg-black text-white"
      }
    >
      <section className="">
        <Navbar />
        <div className="flex lg:flex-nowrap lg:px-[116px] px-4 pt-4 w-full lg:pt-20 gap-20 flex-wrap">
          <div className="lg:w-[25em] lg:h-[25em]">
            <img
              src="https://res.cloudinary.com/ba-foods/image/upload/v1708859411/benjamin_twz6ah.jpg"
              className="h-full object-cover"
              alt="benjmin"
            />
          </div>
          <div className="flex justify-start flex-col items-start flex-wrap w-full">
            <h2 className="lg:mb-10 mb-5 lg:text-[2.9rem]">
              Benjamin Anoruo
            </h2>
            <p className="lg:w-[40.6em] w-[90%] ">
              Hi, I am a full-stack developer, I offer expert website management
              and building services. From front-end design to back-end
              development, I create customized websites and web apps to suit
              your needs. With my comprehensive approach, your site will be
              optimized for performance and seamlessly maintained. Trust me to
              handle the technical aspects while you focus on growing your
              business. Let's create an engaging online presence that drives
              success together.
            </p>
            <a href="./assets/pdf/Fullstack cv.pdf" download={"cv"}>
              <button
                className={
                  mode === "light"
                    ? "flex justify-center items-center mt-6 lg:p-4 m-auto bg-black rounded-full text-white gap-4 p-4 "
                    : "flex justify-center items-center mt-6 lg:p-4 m-auto bg-white rounded-full text-black gap-4 p-4 "
                }
              >
                Download CV
                <span
                  className={
                    mode === "light"
                      ? "stroke-white fill-white rotate-[135deg]"
                      : "stroke-black fill-black rotate-[135deg]"
                  }
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_535_429)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.2799 5.9747C12.8561 5.99218 12.3545 6.00286 11.8078 5.99513C10.2234 5.97287 8.20108 5.79579 6.60833 5.13993L6.9891 4.21526C8.40165 4.79688 10.2684 4.97335 11.8218 4.99529C12.5909 5.00612 13.2685 4.97903 13.7535 4.94922C13.9958 4.93429 14.1895 4.91878 14.3218 4.90704C14.388 4.9012 14.4388 4.89629 14.4727 4.89285L14.5105 4.88897L14.5195 4.88804L14.5215 4.88778L15.1429 4.81876L15.0738 5.43986L15.0736 5.44215L15.0727 5.45113L15.0688 5.48896C15.0653 5.52286 15.0604 5.57366 15.0546 5.63981C15.0429 5.77218 15.0273 5.96583 15.0124 6.20815C14.9826 6.69311 14.9555 7.37073 14.9663 8.13985C14.9883 9.69325 15.1648 11.56 15.7464 12.9725L14.8217 13.3533C14.1659 11.7606 13.9888 9.73826 13.9665 8.15387C13.9588 7.6072 13.9695 7.10555 13.9869 6.68188L5.031 15.6378L4.3239 14.9307L13.2799 5.9747Z"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_535_429">
                        <rect
                          width="13"
                          height="15"
                          fill="white"
                          transform="translate(9.29289 19.8997) rotate(-135)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </button>
            </a>
          </div>
        </div>
      </section>
      <section className="lg:px-[116px] lg:pt-50 pt-16 pl-9 ">
     
        <h1 className="font-bold text-3xl lg:mb-12 mb-3">My Interests</h1>
        <div className="flex gap-28 flex-wrap ">
          <div className="lg:w-[25em] lg:h-[25em] bg-red-400"></div>
          <p className="lg:w-[40.6em] w-[90%]">
            This word cloud represents some of my interests and hobbies. Being
            particularly passionate about new technologies, I try to learn more
            about how they work and how they can be used in the future. With
            this in mind, I make an effort to stay informed as much as possible
            and delve deeper into the topics that capture my attention.
          </p>
        </div>
      </section>
      <section className="lg:px-[116px] pt-20 pl-9 flex flex-col w-full ">
        <h1 className="font-bold lg:text-3xl lg:mb-12 w-fit">
          Why work with me ?
        </h1>
        <div className="mb-20">
          <div className="lg:mb-8 w-fit">
            <h3 className="flex justify-start gap-3 items-center font-bold text-4xl w-fit">
              01{" "}
              <hr
                className={
                  mode === "light"
                    ? "w-7 border-solid border-black border-2"
                    : "w-7 border-solid border-white border-2"
                }
              />
            </h3>
            <p className="text-2xl font-bold">Comprehensive Skill Set:</p>
            <br />
          </div>
          <p className="lg:w-[37.4em]">
            As a full stack developer, I bring expertise across both frontend
            and backend technologies, ensuring seamless integration and holistic
            development solutions.
          </p>
        </div>
        <div className="self-end mb-20">
          <div className="lg:mb-8 w-fit">
            <h3 className="flex justify-start gap-3 items-center font-bold text-4xl w-fit">
              02        <hr
                className={
                  mode === "light"
                    ? "w-7 border-solid border-black border-2"
                    : "w-7 border-solid border-white border-2"
                }
              />
            </h3>
            <p className="text-2xl font-bold">Comprehensive Skill Set:</p>
            <br />
          </div>
          <p className="lg:w-[37.4em]">
            As a full stack developer, I bring expertise across both frontend
            and backend technologies, ensuring seamless integration and holistic
            development solutions.
          </p>
        </div>
        <div className="mb-20">
          <div className="lg:mb-8 w-fit">
            <h3 className="flex justify-start gap-3 items-center font-bold text-4xl w-fit">
              03        <hr
                className={
                  mode === "light"
                    ? "w-7 border-solid border-black border-2"
                    : "w-7 border-solid border-white border-2"
                }
              />
            </h3>
            <p className="text-2xl font-bold">Comprehensive Skill Set:</p>
            <br />
          </div>
          <p className="lg:w-[37.4em]">
            As a full stack developer, I bring expertise across both frontend
            and backend technologies, ensuring seamless integration and holistic
            development solutions.
          </p>
        </div>
        <div className="self-end ">
          <div className="lg:mb-8 w-fit">
            <h3 className="flex justify-start gap-3 items-center font-bold text-4xl w-fit">
              04        <hr
                className={
                  mode === "light"
                    ? "w-7 border-solid border-black border-2"
                    : "w-7 border-solid border-white border-2"
                }
              />
            </h3>
            <p className="text-2xl font-bold">Comprehensive Skill Set:</p>
            <br />
          </div>
          <p className="lg:w-[37.4em]">
            As a full stack developer, I bring expertise across both frontend
            and backend technologies, ensuring seamless integration and holistic
            development solutions.
          </p>
        </div>
      </section>
      <section></section>
      <Footer />
    </div>
  );
}
