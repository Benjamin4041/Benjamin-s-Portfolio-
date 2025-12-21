import React, { useContext, useRef } from "react";
import Project from "../components/project";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { ModeContext } from "../context/mode";
import ScrollToTop from "../hooks/scrolltotop";
import Layout from "../components/layout";

export default function Works() {
  // const { mode } = useContext(ModeContext);

  return (
   <Layout >
      <div
        className={
          mode === "light" ? " bg-white text-black" : " bg-black text-white"
        }
      >
        <section
          className=" lg:px-10  px-[17px]  mb-[100vh] pb-24"
          ref={mainSection}
        >
          <div className="flex w-full justify-between mt-32">
            <div className="flex flex-col items-center w-full">
              <h3 className="text-[3rem] text-center">Projects</h3>
              <AnimatedCopy className=" mt-6">
                Explore some of the works I've built — from slick frontend UIs,
                powerful backend APIs, to fullstack apps connected with
                real-time databases.
              </AnimatedCopy>
            </div>
          </div>

          {/* projects */}

          <div
            className="w-full flex justify-center items-center flex-wrap pt-10 gap-12 lg:pb-10"
            id="projects"
          >
            <AnimatedCopyroject
              image={
                "https://res.cloudinary.com/ba-foods/image/upload/v1753693942/screenshot-20250728100552_cueeuo.png"
              }
              name={"Raven Bank"}
              link={"https://getravenbank.com/"}
              mode={mode}
            />
            <AnimatedCopyroject
              image={
                "https://res.cloudinary.com/ba-foods/image/upload/v1750273699/gjrduondyy4bnohl1v2c.png"
              }
              name={"Bridge"}
              link={"https://bridge-testnet.netlify.app/"}
              mode={mode}
            />
            <AnimatedCopyroject
              image={
                "https://res.cloudinary.com/ba-foods/image/upload/v1753694123/screenshot-20250728100526_dk1e6w.png"
              }
              name={"Roqqu"}
              link={"https://roqqu.com/"}
              mode={mode}
            />
            <AnimatedCopyroject
              image={
                "https://res.cloudinary.com/ba-foods/image/upload/v1708872646/Screenshot_2024-02-24_at_5.31.23_pm_swr1uh.png"
              }
              name={"SpencerZill"}
              link={"https://spencerzill.com"}
              mode={mode}
            />
          </div>
        </section>
      </div>
    </Layout>
  );
}
