import React, { useContext } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import ModeProvider from "../../context/mode";
import SliderTestVersion from "../../components/SliderTestVersion";

export default function SelectedWorks() {
  const { mode } = useContext(ModeProvider);
  return (
    <div
      className={
        mode === "light" ? " bg-white text-black" : " bg-black text-white"
      }
    >
      <section className="relative min-h-screen overflow-hidden mb-[100vh]">
        <Navbar style={"z-30 -translate-y-[2em]"} />
        <SliderTestVersion />
      </section>
      <Footer mode={mode} />
    </div>
  );
}
