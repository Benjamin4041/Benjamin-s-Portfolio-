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
          mode === "light" ? " bg-white text-black mb-[100vh]" : " bg-black text-white mb-[100vh]"
        }
      >
        <section className="relative lg:min-h-[200vh]  overflow-hidden  pt-16 ">
          <SliderTestVersion />
        </section>
      </div>
    </Layout>
  );
}
