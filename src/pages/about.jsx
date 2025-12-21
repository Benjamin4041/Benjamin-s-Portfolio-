import React, { useContext } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ModeContext from "../context/mode";
import Mypicture from "../components/myPicture/Mypicture";
import ScrollToTop from "../hooks/scrolltotop";
import AnimatedCopy from "../components/AnimatedCopy/AnimatedCopy";
import Layout from "../components/layout";

export default function About() {
  const { mode } = useContext(ModeContext);
  return <Layout navStyle={'absolute top-6 w-full'}>
        <div
      className={
        mode === "light" ? " bg-white text-black " : " bg-black text-white"
      }
    >
  
      <section className="lg:px-36 px-16 mb-5 pt-32">
        <div className="flex flex-col-reverse 2xl:gap-10 gap-5 lg:flex-row justify-center items-end w-full">
          <AnimatedCopy className="lg:w-[40.6em] w-[100%]   lg:-translate-y-48 ">
            <span className="hidden lg:block">
              Hi, I am a full-stack developer, I offer expert website
              management and building services. From front-end design to
              back-end development, I create customized websites and web apps to
              suit your needs. With my comprehensive approach, your site will be
              optimized for performance and seamlessly maintained. Trust me to
              handle the technical aspects while you focus on growing your
              business. Let's create an engaging online presence that drives
              success together.
            </span>
          </AnimatedCopy>
          <div className=" lg:my-9 mb-9 flex flex-col">
            <div className="w-full lg:h-[80vh] overflow-hidden aspect-[4/5] m-auto rounded-3xl">
              <Mypicture />
            </div>
            <h2 className="lg:text-9xl lg:-translate-y-20 font-Gestura -translate-y-5 text-4xl self-end h-fit w-fit capitalize bg-[linear-gradient(141deg,#ffffff_0%,#94959f_50%,#4d4b4b_100%)] bg-clip-text text-transparent">
              BENJAMIN
            </h2>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold my-5"> / SERVICES</h3>
          <h2 className="font-semibold mb-8 lg:text-5xl text-2xl lg:w-[40%] w-[60%]">
            {" "}
            My skills and interests
          </h2>
          <AnimatedCopy className="lg:w-[50%] w-full mb-8 lg:self-end">
            I’m driven by the challenge of adapting my skills, processes, and
            thinking to meet the evolving needs of the world. I excel in
            collaborative, ambitious teams that create inclusive environments
            where everyone feels they belong. My skills and interests cut across
            the following: Product and visual design Interaction design Webflow
            development Motion design Graphic design Branding Video editing UI
            engineering
          </AnimatedCopy>
          <ul className="self-end translate-x-16 flex gap-4 lg:mb-0 mb-32 ">
            <div>
              <li className="font-bold text-2xl">Frontend</li>
              <li className="flex gap-4 items-center">
                {" "}
                <div
                  className={
                    mode == "light"
                      ? "p-2 rounded bg-black w-1 h-1"
                      : "p-2 rounded bg-white w-1 h-1"
                  }
                ></div>
                React.js{" "}
              </li>
              <li className="flex gap-4 items-center">
                {" "}
                <div
                  className={
                    mode == "light"
                      ? "p-2 rounded bg-black w-1 h-1"
                      : "p-2 rounded bg-white w-1 h-1"
                  }
                ></div>{" "}
                React Native
              </li>
              <li className="flex gap-4 items-center">
                {" "}
                <div
                  className={
                    mode == "light"
                      ? "p-2 rounded bg-black w-1 h-1"
                      : "p-2 rounded bg-white w-1 h-1"
                  }
                ></div>
                Responsive Design
              </li>
              <li className="flex gap-4 items-center">
                {" "}
                <div
                  className={
                    mode == "light"
                      ? "p-2 rounded bg-black w-1 h-1"
                      : "p-2 rounded bg-white w-1 h-1"
                  }
                ></div>
                Material UI
              </li>
              <li className="flex gap-4 items-center">
                {" "}
                <div
                  className={
                    mode == "light"
                      ? "p-2 rounded bg-black w-1 h-1"
                      : "p-2 rounded bg-white w-1 h-1"
                  }
                ></div>
                Redux
              </li>
            </div>
            <div>
              <li className="font-bold text-2xl">Backend</li>
              <li className="flex gap-4 items-center">
                {" "}
                <div
                  className={
                    mode == "light"
                      ? "p-2 rounded bg-black w-1 h-1"
                      : "p-2 rounded bg-white w-1 h-1"
                  }
                ></div>
                Node.js
              </li>
              <li className="flex gap-4 items-center">
                {" "}
                <div
                  className={
                    mode == "light"
                      ? "p-2 rounded bg-black w-1 h-1"
                      : "p-2 rounded bg-white w-1 h-1"
                  }
                ></div>
                Express.js
              </li>
              <li className="flex gap-4 items-center">
                {" "}
                <div
                  className={
                    mode == "light"
                      ? "p-2 rounded bg-black w-1 h-1"
                      : "p-2 rounded bg-white w-1 h-1"
                  }
                ></div>
                MongoDB
              </li>
              <li className="flex gap-4 items-center">
                {" "}
                <div
                  className={
                    mode == "light"
                      ? "p-2 rounded bg-black w-1 h-1"
                      : "p-2 rounded bg-white w-1 h-1"
                  }
                ></div>{" "}
                REST APIs
              </li>
              <li className="flex gap-4 items-center">
                {" "}
                <div
                  className={
                    mode == "light"
                      ? "p-2 rounded bg-black w-1 h-1"
                      : "p-2 rounded bg-white w-1 h-1"
                  }
                ></div>{" "}
                JWT
              </li>
              <li className="flex gap-4 items-center">
                {" "}
                <div
                  className={
                    mode == "light"
                      ? "p-2 rounded bg-black w-1 h-1"
                      : "p-2 rounded bg-white w-1 h-1"
                  }
                ></div>{" "}
                OAuth
              </li>
              <li className="flex gap-4 items-center">
                {" "}
                <div
                  className={
                    mode == "light"
                      ? "p-2 rounded bg-black w-1 h-1"
                      : "p-2 rounded bg-white w-1 h-1"
                  }
                ></div>{" "}
                Next.js (SSR)
              </li>
            </div>
            <div>
              <li className="font-bold text-2xl">Cloud</li>
              <li className="flex gap-4 items-center">
                {" "}
                <div
                  className={
                    mode == "light"
                      ? "p-2 rounded bg-black w-1 h-1"
                      : "p-2 rounded bg-white w-1 h-1"
                  }
                ></div>
                AWS (EC2, S3, Lambda, Rekognition),{" "}
              </li>
              <li className="flex gap-4 items-center">
                {" "}
                <div
                  className={
                    mode == "light"
                      ? "p-2 rounded bg-black w-1 h-1"
                      : "p-2 rounded bg-white w-1 h-1"
                  }
                ></div>
                Firebase
              </li>
              <li className="flex gap-4 items-center">
                {" "}
                <div
                  className={
                    mode == "light"
                      ? "p-2 rounded bg-black w-1 h-1"
                      : "p-2 rounded bg-white w-1 h-1"
                  }
                ></div>
                IAM
              </li>
              <li className="flex gap-4 items-center">
                {" "}
                <div
                  className={
                    mode == "light"
                      ? "p-2 rounded bg-black w-1 h-1"
                      : "p-2 rounded bg-white w-1 h-1"
                  }
                ></div>
                PAM
              </li>
            </div>

            {/* <li className="font-bold text-2xl">Tools & Libraries</li>
            <li>Git</li>
            <li>GitHub</li>
            <li>Webpack</li>
            <li>Babel</li>
            <li>Enzyme</li>
            <li>Jest</li>
            <li>Intrests</li>
            <li>AI/ML</li>
            <li>Encryption</li>
            <li> Agile Methodologies</li>
            <li>Three js/R3F</li> */}
          </ul>
        </div>
      </section>
      <section className="lg:py-20 pb-16 px-16 flex flex-col w-full  lg:px-36  mb-[100vh]">
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
            <AnimatedCopy className="text-2xl font-bold">
              Comprehensive Skill Set:
            </AnimatedCopy>
            <br />
          </div>
          <AnimatedCopy className="lg:w-[37.4em]">
            As a full stack developer, I bring expertise across both frontend
            and backend technologies, ensuring seamless integration and holistic
            development solutions.
          </AnimatedCopy>
        </div>
        <div className="self-end mb-20">
          <div className="lg:mb-8 w-fit">
            <h3 className="flex justify-start gap-3 items-center font-bold text-4xl w-fit">
              02{" "}
              <hr
                className={
                  mode === "light"
                    ? "w-7 border-solid border-black border-2"
                    : "w-7 border-solid border-white border-2"
                }
              />
            </h3>
            <AnimatedCopy className="text-2xl font-bold">
              Problem-Solving Mindset:
            </AnimatedCopy>
            <br />
          </div>
          <AnimatedCopy className="lg:w-[37.4em]">
            I excel at analyzing complex requirements and translating them into
            efficient, scalable systems. I proactively identify challenges and
            craft robust solutions.
          </AnimatedCopy>
        </div>
        <div className="mb-20">
          <div className="lg:mb-8 w-fit">
            <h3 className="flex justify-start gap-3 items-center font-bold text-4xl w-fit">
              03{" "}
              <hr
                className={
                  mode === "light"
                    ? "w-7 border-solid border-black border-2"
                    : "w-7 border-solid border-white border-2"
                }
              />
            </h3>
            <AnimatedCopy className="text-2xl font-bold">
              Focus on User Experience:
            </AnimatedCopy>
            <br />
          </div>
          <AnimatedCopy className="lg:w-[37.4em]">
            Beyond writing clean code, I prioritize intuitive interfaces and
            smooth interactions, delivering products that users love to engage
            with.
          </AnimatedCopy>
        </div>
        <div className="self-end ">
          <div className="lg:mb-8 w-fit">
            <h3 className="flex justify-start gap-3 items-center font-bold text-4xl w-fit">
              04{" "}
              <hr
                className={
                  mode === "light"
                    ? "w-7 border-solid border-black border-2"
                    : "w-7 border-solid border-white border-2"
                }
              />
            </h3>
            <AnimatedCopy className="text-2xl font-bold">
              Commitment to Quality & Collaboration:
            </AnimatedCopy>
            <br />
          </div>
          <AnimatedCopy className="lg:w-[37.4em]">
            I value clear communication and thrive in team environments. I’m
            dedicated to writing maintainable code, following best practices,
            and always pushing for the highest standards.
          </AnimatedCopy>
        </div>
      </section>
   
    </div>
  </Layout>;
}
