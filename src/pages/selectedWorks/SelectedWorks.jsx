import React, { useContext } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import ModeContext from "../../context/mode";
import SliderTestVersion from "../../components/SliderTestVersion";
import Layout from "../../components/layout";

export default function SelectedWorks() {
  const { mode } = useContext(ModeContext);
  return (
    <Layout navStyle={"absolute top-6 w-full z-30"}>
      <div
        className={
          mode === "light" ? " bg-white text-black" : " bg-black text-white"
        }
      >
        <section className="relative min-h-[200vh] overflow-hidden mb-[100vh] pt-16 ">
          <SliderTestVersion />
        </section>
      </div>
    </Layout>
  );
}
