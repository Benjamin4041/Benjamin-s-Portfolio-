import React, { useContext, useRef, useState } from "react";
import Navbar from "../components/navbar";
import ModeProvider from "../context/mode";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import emailjs from "@emailjs/browser";
import Footer from "../components/footer";
import ScrollToTop from "../hooks/scrolltotop";
import AnimatedCopy from "../components/AnimatedCopy/AnimatedCopy";
import Seo, { SITE_NAME } from "../components/Seo";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { mode, setMode } = useContext(ModeProvider);

  // "idle" | "sending" | "success" | "error" | "invalid"
  const [status, setStatus] = useState("idle");

  const form = useRef();

  // Always handled in JS via EmailJS; the form never submits natively, so
  // the message can't end up in the URL.
  const sendEmail = (e) => {
    e.preventDefault();
    if (status === "sending") return;
    if (email.trim() === "" || name.trim() === "" || message.trim() === "") {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    emailjs
      .sendForm("service_x0dyvcm", "template_3q93usl", form.current, {
        publicKey: "s8KTW-qJ8cs16HySg",
      })
      .then(() => {
        setStatus("success");
        setEmail("");
        setMessage("");
        setName("");
      })
      .catch((error) => {
        console.error("Error sending message", error);
        setStatus("error");
      });
  };

  const statusMessage = {
    sending: "Sending…",
    success: "Thanks! Your message has been sent.",
    error: "Sorry, something went wrong. Please try again or email anoruokachi2@gmail.com.",
    invalid: "Please fill in your name, email and message.",
  }[status];
  return (
    <div
      className={
        mode === "light"
          ? " bg-white text-black h-fit "
          : " bg-black text-white h-fit "
      }
    >
      <Seo
        title={`Contact | ${SITE_NAME}`}
        description="Get in touch with Benjamin Anoruo, fullstack React developer."
      />
      <ScrollToTop />
      <Navbar />
      <div className="flex lg:justify-center lg:items-center relative h-[90vh] px-4 lg:px-28 lg:gap-20 lg:flex-row flex-col lg:pt-5 mt-24 mb-[100vh] ">
        <div className="lg:w-[50%] w-full lg:flex-col flex lg:gap-2 lg:justify-start lg:items-start justify-between items-center gap-4 lg:h-[80%]">
          <a
            href="https://github.com/Benjamin4041"
            target="_blank"
            className="lg:w-[80%] lg:shrink-0"
          >
            <div className="lg:border-4 h-fit flex items-center justify-between w-[100%] xl:mb-8 cursor-pointer lg:px-7 2xl:py-7 lg:py-1  py-3 ">
              <div className="w-fit p-5 bg-black rounded lg:block hidden">
                <FaGithub size={50} color="white" />
              </div>
              <div className="w-fit p-5 bg-black rounded lg:hidden">
                <FaGithub size={25} color="white" />
              </div>
              <span className="lg:block hidden">
                <AnimatedCopy> GitHub</AnimatedCopy>
                <AnimatedCopy> Explore my code & projects</AnimatedCopy>
              </span>
              <IoIosArrowForward size={25} className="hidden lg:block" />
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/anoruo-benjamin-aa9b36245"
            target="_blank"
            className="lg:w-[80%] lg:shrink-0"
          >
            <div className="lg:border-4 h-fit flex items-center justify-between w-[100%] xl:mb-8 cursor-pointer lg:px-7 2xl:py-7 lg:py-1  py-3 ">
              <div className="w-fit p-5 bg-black rounded lg:block hidden">
                <FaLinkedin size={50} color="white" />
              </div>
              <div className="w-fit p-5 bg-black rounded lg:hidden">
                <FaLinkedin size={25} color="white" />
              </div>
              <span className="lg:block hidden">
                <AnimatedCopy>LinkedIn</AnimatedCopy>
                <AnimatedCopy>Let’s connect professionally</AnimatedCopy>
              </span>
              <IoIosArrowForward size={25} className="hidden lg:block" />
            </div>
          </a>
          <a
            href="https://www.instagram.com/benjamin_fx_2/"
            target="_blank"
            className="lg:w-[80%] lg:shrink-0"
          >
            <div className="lg:border-4 h-fit flex items-center justify-between w-[100%] xl:mb-8 cursor-pointer lg:px-7 2xl:py-7 lg:py-1  py-3 ">
              <div className="w-fit p-5 bg-black rounded  lg:block hidden">
                <FaInstagram size={50} color="white" />
              </div>
              <div className="w-fit p-5 bg-black rounded lg:hidden">
                <FaInstagram size={25} color="white" />
              </div>
              <span className="lg:block hidden">
                <AnimatedCopy> Instagram</AnimatedCopy>
                <AnimatedCopy>My visual journal & life updates</AnimatedCopy>
              </span>
              <IoIosArrowForward size={25} className="hidden lg:block" />
            </div>
          </a>
          <a
            href="https://x.com/AnoruoBenjamin"
            target="_blank"
            className="lg:w-[80%] lg:shrink-0"
          >
            <div className="lg:border-4 h-fit flex items-center justify-between w-[100%]  cursor-pointer lg:px-7 2xl:py-7 lg:py-1  py-3 ">
              <div className="w-fit p-5 bg-black rounded  lg:block hidden">
                <FaTwitter size={50} color="white" />
              </div>
              <div className="w-fit p-5 bg-black rounded lg:hidden">
                <FaTwitter size={25} color="white" />
              </div>
              <span className="lg:block hidden">
                <AnimatedCopy> Twitter</AnimatedCopy>
                <AnimatedCopy>Random thoughts & dev tweets</AnimatedCopy>
              </span>
              <IoIosArrowForward size={25} className="hidden lg:block" />
            </div>
          </a>
        </div>
        <div className="border-2 rounded lg:w-[50%] w-[90%] m-auto p-4 xl:p-10">
          <form ref={form} onSubmit={sendEmail} noValidate>
            <AnimatedCopy className="font-bold text-2xl">
              Send Me a Message
            </AnimatedCopy>
            <div className="xl:mb-5">
              <label htmlFor="contact-name">Name</label>
              <br />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="contact-name"
                autoComplete="name"
                className={
                  mode !== "light"
                    ? " text-black w-full bg-white rounded h-10 mt-5  xl:mt-5 pl-4"
                    : "w-full xl:mt-5 bg-gray-900 text-white rounded h-10 pl-4"
                }
                name="from_name"
              />
            </div>
            <div className="xl:mb-5">
              <label htmlFor="contact-email">Email</label>
              <br />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="contact-email"
                autoComplete="email"
                className={
                  mode !== "light"
                    ? " text-black w-full bg-white rounded h-10 mt-5  xl:mt-5 pl-4"
                    : "w-full xl:mt-5 bg-gray-900 text-white rounded h-10 pl-4"
                }
                name="email"
              />
            </div>
            <div>
              <label htmlFor="contact-message">Message</label>
              <br />

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                id="contact-message"
                className={
                  mode !== "light"
                    ? "w-full bg-white rounded mt-5 text-black  xl:mt-5 pl-4 h-50"
                    : "w-full xl:mt-5 bg-gray-900 text-white rounded h-50 p-4"
                }
                rows={3}
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-fit rounded mt-5 flex justify-center items-center bg-white text-black font-medium text-xl p-3 hover:border-2 border-black disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send"}
            </button>
            <p
              role="status"
              aria-live="polite"
              className={
                status === "success"
                  ? "mt-3 text-green-500"
                  : status === "error" || status === "invalid"
                  ? "mt-3 text-red-500"
                  : "mt-3"
              }
            >
              {statusMessage}
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
