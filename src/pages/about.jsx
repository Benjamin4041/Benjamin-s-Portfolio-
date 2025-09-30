import React, { useContext } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ModeProvider from "../context/mode";
import Mypicture from "../components/myPicture/Mypicture";
import ScrollToTop from "../hooks/scrolltotop";
import AnimatedCopy from "../components/AnimatedCopy/AnimatedCopy";

export default function About() {
  const { mode } = useContext(ModeProvider);
  return (
    <div
      className={
        mode === "light" ? " bg-white text-black " : " bg-black text-white"
      }
    >
      <ScrollToTop />
      <Navbar />
      {/* <section className="lg:px-36 px-16 lg:my-9 mb-9 flex flex-col">
        <div className="w-full lg:w-[min(680px,90vw)] lg:h-[80vh] overflow-hidden aspect-[4/5] m-auto rounded-3xl">
          <Mypicture />
        </div>
        <h2 className="lg:text-9xl lg:-translate-y-20  -translate-y-5 text-4xl self-end h-fit w-fit capitalize">
          BENJAMIN
        </h2>
      </section> */}
      <section className="lg:px-36 px-16 mb-5 lg:my-9">
        <div className="flex flex-col-rev 2xl:gap-10 gap-5 lg:flex-row justify-center items-end w-full">
          <AnimatedCopy className="lg:w-[40.6em] w-full lg:-translate-y-48 ">
            Hi, I am a full-stack developer, I offer expert website management
            and building services. From front-end design to back-end
            development, I create customized websites and web apps to suit your
            needs. With my comprehensive approach, your site will be optimized
            for performance and seamlessly maintained. Trust me to handle the
            technical aspects while you focus on growing your business. Let's
            create an engaging online presence that drives success together.
          </AnimatedCopy>
          <div className=" lg:my-9 mb-9 flex flex-col">
            <div className="w-full lg:h-[80vh] overflow-hidden aspect-[4/5] m-auto rounded-3xl">
              <Mypicture />
            </div>
            <h2 className="lg:text-9xl lg:-translate-y-20  -translate-y-5 text-4xl self-end h-fit w-fit capitalize bg-[linear-gradient(141deg,#ffffff_0%,#94959f_50%,#4d4b4b_100%)] bg-clip-text text-transparent">
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
          <ul className="self-end pr-28 flex flex-col gap-4 lg:mb-0 mb-32">
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
      <Footer />
    </div>
  );
}

// export default function About() {
//   const { mode } = useContext(ModeProvider);
//   return (
//     <div
//       className={
//         mode === "light" ? " bg-white text-black" : " bg-black text-white"
//       }
//     >
//       <section className="">
//         <Navbar />
//         <div className="flex lg:flex-nowrap lg:px-[116px] px-4 pt-4 w-full lg:pt-20 gap-20 flex-wrap">
//           <div className="lg:w-[25em] lg:h-[25em]">
//             <img
//               src="https://res.cloudinary.com/ba-foods/image/upload/v1708859411/benjamin_twz6ah.jpg"
//               className="h-full object-cover"
//               alt="benjmin"
//             />
//           </div>
//           <div className="flex justify-start flex-col items-start flex-wrap w-full">
//             <h2 className="lg:mb-10 mb-5 lg:text-[2.9rem]">Benjamin Anoruo</h2>
//             <AnimatedCopy className="lg:w-[40.6em] w-[90%] ">
//               Hi, I am a full-stack developer, I offer expert website management
//               and building services. From front-end design to back-end
//               development, I create customized websites and web apps to suit
//               your needs. With my comprehensive approach, your site will be
//               optimized for performance and seamlessly maintained. Trust me to
//               handle the technical aspects while you focus on growing your
//               business. Let's create an engaging online presence that drives
//               success together.
//             </AnimatedCopy>
//             <a href="./assets/pdf/Fullstack cv.pdf" download={"cv"}>
//               <button
//                 className={
//                   mode === "light"
//                     ? "flex justify-center items-center mt-6 lg:p-4 m-auto bg-black rounded-full text-white gap-4 p-4 "
//                     : "flex justify-center items-center mt-6 lg:p-4 m-auto bg-white rounded-full text-black gap-4 p-4 "
//                 }
//               >
//                 Download CV
//                 <span
//                   className={
//                     mode === "light"
//                       ? "stroke-white fill-white rotate-[135deg]"
//                       : "stroke-black fill-black rotate-[135deg]"
//                   }
//                 >
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 20 20"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g clip-path="url(#clip0_535_429)">
//                       <AnimatedCopyath
//                         fill-rule="evenodd"
//                         clip-rule="evenodd"
//                         d="M13.2799 5.9747C12.8561 5.99218 12.3545 6.00286 11.8078 5.99513C10.2234 5.97287 8.20108 5.79579 6.60833 5.13993L6.9891 4.21526C8.40165 4.79688 10.2684 4.97335 11.8218 4.99529C12.5909 5.00612 13.2685 4.97903 13.7535 4.94922C13.9958 4.93429 14.1895 4.91878 14.3218 4.90704C14.388 4.9012 14.4388 4.89629 14.4727 4.89285L14.5105 4.88897L14.5195 4.88804L14.5215 4.88778L15.1429 4.81876L15.0738 5.43986L15.0736 5.44215L15.0727 5.45113L15.0688 5.48896C15.0653 5.52286 15.0604 5.57366 15.0546 5.63981C15.0429 5.77218 15.0273 5.96583 15.0124 6.20815C14.9826 6.69311 14.9555 7.37073 14.9663 8.13985C14.9883 9.69325 15.1648 11.56 15.7464 12.9725L14.8217 13.3533C14.1659 11.7606 13.9888 9.73826 13.9665 8.15387C13.9588 7.6072 13.9695 7.10555 13.9869 6.68188L5.031 15.6378L4.3239 14.9307L13.2799 5.9747Z"
//                       />
//                     </g>
//                     <defs>
//                       <clipPath id="clip0_535_429">
//                         <rect
//                           width="13"
//                           height="15"
//                           fill="white"
//                           transform="translate(9.29289 19.8997) rotate(-135)"
//                         />
//                       </clipPath>
//                     </defs>
//                   </svg>
//                 </span>
//               </button>
//             </a>
//           </div>
//         </div>
//       </section>
//       <section className="lg:px-[116px] lg:pt-50 pt-16 pl-9 ">
//         <h1 className="font-bold text-3xl lg:mb-12 mb-3">My Interests</h1>
//         <div className="flex justify-between gap-12 lg:flex-nowrap flex-wrap">
//           <div className="lg:w-[50%] w-[90%] h-[50vh]">
//             <Canv />
//           </div>

//           <AnimatedCopy className="lg:w-[40.6em] w-[90%]">
//             This word cloud represents some of my interests and hobbies. Being
//             particularly passionate about new technologies, I try to learn more
//             about how they work and how they can be used in the future. With
//             this in mind, I make an effort to stay informed as much as possible
//             and delve deeper into the topics that capture my attention.
//           </AnimatedCopy>
//         </div>
//       </section>
//       <section className="lg:px-[116px] pt-20 pl-9 flex flex-col w-full ">
//         <h1 className="font-bold lg:text-3xl lg:mb-12 w-fit">
//           Why work with me ?
//         </h1>
//         <div className="mb-20">
//           <div className="lg:mb-8 w-fit">
//             <h3 className="flex justify-start gap-3 items-center font-bold text-4xl w-fit">
//               01{" "}
//               <hr
//                 className={
//                   mode === "light"
//                     ? "w-7 border-solid border-black border-2"
//                     : "w-7 border-solid border-white border-2"
//                 }
//               />
//             </h3>
//             <AnimatedCopy className="text-2xl font-bold">Comprehensive Skill Set:</AnimatedCopy>
//             <br />
//           </div>
//           <AnimatedCopy className="lg:w-[37.4em]">
//             As a full stack developer, I bring expertise across both frontend
//             and backend technologies, ensuring seamless integration and holistic
//             development solutions.
//           </AnimatedCopy>
//         </div>
//         <div className="self-end mb-20">
//           <div className="lg:mb-8 w-fit">
//             <h3 className="flex justify-start gap-3 items-center font-bold text-4xl w-fit">
//               02{" "}
//               <hr
//                 className={
//                   mode === "light"
//                     ? "w-7 border-solid border-black border-2"
//                     : "w-7 border-solid border-white border-2"
//                 }
//               />
//             </h3>
//             <AnimatedCopy className="text-2xl font-bold">Problem-Solving Mindset:</AnimatedCopy>
//             <br />
//           </div>
//           <AnimatedCopy className="lg:w-[37.4em]">
//             I excel at analyzing complex requirements and translating them into
//             efficient, scalable systems. I proactively identify challenges and
//             craft robust solutions.
//           </AnimatedCopy>
//         </div>
//         <div className="mb-20">
//           <div className="lg:mb-8 w-fit">
//             <h3 className="flex justify-start gap-3 items-center font-bold text-4xl w-fit">
//               03{" "}
//               <hr
//                 className={
//                   mode === "light"
//                     ? "w-7 border-solid border-black border-2"
//                     : "w-7 border-solid border-white border-2"
//                 }
//               />
//             </h3>
//             <AnimatedCopy className="text-2xl font-bold">Focus on User Experience:</AnimatedCopy>
//             <br />
//           </div>
//           <AnimatedCopy className="lg:w-[37.4em]">
//             Beyond writing clean code, I prioritize intuitive interfaces and
//             smooth interactions, delivering products that users love to engage
//             with.
//           </AnimatedCopy>
//         </div>
//         <div className="self-end ">
//           <div className="lg:mb-8 w-fit">
//             <h3 className="flex justify-start gap-3 items-center font-bold text-4xl w-fit">
//               04{" "}
//               <hr
//                 className={
//                   mode === "light"
//                     ? "w-7 border-solid border-black border-2"
//                     : "w-7 border-solid border-white border-2"
//                 }
//               />
//             </h3>
//             <AnimatedCopy className="text-2xl font-bold">
//               Commitment to Quality & Collaboration:
//             </AnimatedCopy>
//             <br />
//           </div>
//           <AnimatedCopy className="lg:w-[37.4em]">
//             I value clear communication and thrive in team environments. I’m
//             dedicated to writing maintainable code, following best practices,
//             and always pushing for the highest standards.
//           </AnimatedCopy>
//         </div>
//       </section>
//       <section></section>
//       <Footer />
//     </div>
//   );
// }
