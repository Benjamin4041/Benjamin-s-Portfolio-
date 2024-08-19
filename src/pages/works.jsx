import React, { useContext } from "react";
import Project from "../components/project";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ModeProvider from "../context/mode";

export default function Works() {
  const { mode } = useContext(ModeProvider);
  return (
    <div
      className={
        mode === "light" ? " bg-white text-black" : " bg-black text-white"
      }
    >
      <section className=" lg:px-10  px-[17px] ">
        <Navbar />
        <div className="flex w-full justify-between mt-10">
          <div>
            <h3 className="text-[3rem] text-center">Projects</h3>
            <p className=" mt-6">
              As a seasoned Fullstack developer, I'm dedicated to building
              contemporary, user-friendly web designs and cutting-edge digital
              solutions. Let me help you construct the brand of your dreams by
              creating dynamic and engaging online experiences.
            </p>
          </div>
        </div>

        {/* projects */}

        <div
          className="w-full flex justify-center items-center flex-wrap pt-10 gap-12 lg:pb-10"
          id="projects"
        >
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
          <Project
            image={
              "https://res.cloudinary.com/ba-foods/image/upload/v1708872646/Screenshot_2024-02-24_at_5.31.23_pm_swr1uh.png"
            }
            name={"SpencerZill"}
            link={"https://spencerzill.com"}
            mode={mode}
          />
        </div>
        <Footer />
      </section>
    </div>
  );
}
