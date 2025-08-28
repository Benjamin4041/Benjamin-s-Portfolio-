import React, { useContext, useRef } from "react";
import Slider from "../../components/Slider";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import ModeProvider from "../../context/mode";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SelectedWorks() {
  const { mode } = useContext(ModeProvider);
  const mainSection = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: mainSection.current,
      start: "300 top",
      end: "+=800",
      pin: true,
    });

  }, []);
  return (
    <div
      className={
        mode === "light" ? " bg-white text-black" : " bg-black text-white"
      }
    >
      <section
        className="h-[150vh] overflow-hidden mb-[100vh]"
        ref={mainSection}
      >
        <Navbar style={"z-30 -translate-y-[2em]"} />
   
          {" "}
          <Slider />

      </section>
      <Footer mode={mode} />
    </div>
  );
}
