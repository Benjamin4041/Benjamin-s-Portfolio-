import React, { useContext } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import ModeProvider from "../../context/mode";
import SliderTestVersion from "../../components/SliderTestVersion";
import Seo, { SITE_NAME } from "../../components/Seo";

export default function SelectedWorks() {
  const { mode } = useContext(ModeProvider);
  return (
    <div
      className={
        mode === "light" ? " bg-white text-black" : " bg-black text-white"
      }
    >
      <Seo
        title={`Works | ${SITE_NAME}`}
        description="Selected projects by Benjamin Anoruo: Raven Bank, Roqqu, SpencerZill and Bridge."
      />
      <section className="relative min-h-[200vh] overflow-hidden mb-[100vh] ">
        <Navbar style={"z-30 -translate-y-[2em]"} />
        <SliderTestVersion />
      </section>
      <Footer mode={mode} />
    </div>
  );
}
