import React, { useRef } from "react";
import Project from "../components/project";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';


export default function Section2({ mode }) {
    let pinnedSection = useRef()
gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
   let tl = gsap.timeline({ defaults: { duration: 1, ease: 'power2.inOut' } });
     const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinnedSection.current,
        start: 'top top',
        end: '+=800', // adjust based on how long you want to pin
        pin: true,
        pinSpacing: true, // adds spacing for smooth scroll (default: true)
        scrub: false,
      });
    }, pinnedSection);

    return () => ctx.revert(); // cleanup
  }, []);
  return (
    <div className="w-screen relative">
      <section className="flex justify-center items-center bg-red-500  w-full h-screen" ref={pinnedSection}>
        <h1 className="text-[16em] uppercase">Projects</h1>
      </section>
      <section className=" relative w-full  justify-center items-center flex">
        <div className=" flex flex-col justify-center items-center gap-10 overflow-scroll ">
          <Project
            image={
              "https://res.cloudinary.com/ba-foods/image/upload/v1708872646/Screenshot_2024-02-24_at_5.31.23_pm_swr1uh.png"
            }
            name={"SpencerZill"}
            link={"https://spencerzill.com"}
            mode={mode}
          />
          <Project
            image={
              "https://res.cloudinary.com/ba-foods/image/upload/v1750273699/gjrduondyy4bnohl1v2c.png"
            }
            name={"Bridge"}
            link={"https://bridge-testnet.netlify.app/"}
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
        </div>
      </section>
    </div>
  );
}
