import React, { useContext, useRef, useState } from "react";
import Navbar from "../components/navbar";
import ModeProvider from "../context/mode";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { mode, setMode } = useContext(ModeProvider);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    if(email===""||name===""||message===""){
      return;
    }
    emailjs
      .sendForm("service_x0dyvcm", "template_3q93usl", form.current, {
        publicKey: "s8KTW-qJ8cs16HySg",
      })
      .then((response) => {
        console.log("SUCCESS! ", response);
        setEmail("");
        setMessage("");
        setName("");
      })
      .catch((error) => {
        console.log("Error sending message", error);
      });
  };
  return (
    <div
      className={
        mode === "light"
          ? " bg-white text-black h-screen lg:overflow-hidden"
          : " bg-black text-white h-screen lg:overflow-hidden"
      }
    >
      <Navbar />
      <div className="flex lg:justify-center lg:items-center h-full lg:px-28 gap-20 lg:flex-row flex-col  ">
        <div className="w-[50%] lg:flex-col flex">
          <a href="https://github.com/Benjamin4041" target="_blank" className="w-[80%]">
            <div className="lg:border-4 h-fit flex items-center justify-between w-[100%] xl:mb-8 cursor-pointer p-7 py-3 ">
              <div className="w-fit p-5 bg-black rounded lg:block hidden">
                <FaGithub size={50} color="white" />
              </div>
              <div className="w-fit p-5 bg-black rounded lg:hidden">
                <FaGithub size={25} color="white" />
              </div>
              <span className='lg:block hidden'>
                <p> GitHub</p>
                <p> Explore my code & projects</p>
              </span>
              <IoIosArrowForward size={25} className="hidden lg:block" />
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/anoruo-benjamin-aa9b36245"
            target="_blank" className="w-[80%]"
          >
            <div className="lg:border-4 h-fit flex items-center justify-between w-[100%] xl:mb-8 cursor-pointer p-7 py-3 ">
              <div className="w-fit p-5 bg-black rounded lg:block hidden" >
                <FaLinkedin size={50} color="white" />
              </div>
              <div className="w-fit p-5 bg-black rounded lg:hidden">
                <FaLinkedin size={25} color="white" />
              </div>
              <span className='lg:block hidden'>
                <p>LinedIn</p>
                <p>Let’s connect professionally</p>
              </span>
              <IoIosArrowForward size={25} className="hidden lg:block" />
            </div>
          </a>
          <a href="https://www.instagram.com/benjamin_fx_2/" target="_blank" className="w-[80%]">
            <div className="lg:border-4 h-fit flex items-center justify-between w-[100%] xl:mb-8 cursor-pointer p-7 py-3 ">
              <div className="w-fit p-5 bg-black rounded  lg:block hidden"> 
                <FaInstagram size={50} color="white" />
              </div>
              <div className="w-fit p-5 bg-black rounded lg:hidden">
                <FaInstagram size={25} color="white" />
              </div>
              <span className='lg:block hidden'>
                <p> Instagram</p>
                <p>My visual journal & life updates</p>
              </span>
              <IoIosArrowForward size={25} className="hidden lg:block" />
            </div>
          </a>
          <a href="https://x.com/AnoruoBenjamin" target="_blank" className="w-[80%]">
            <div className="lg:border-4 h-fit flex items-center justify-between w-[100%] xl:mb-8 cursor-pointer p-7 py-3 ">
              <div className="w-fit p-5 bg-black rounded  lg:block hidden">
                <FaTwitter size={50} color="white" />
              </div>
              <div className="w-fit p-5 bg-black rounded lg:hidden">
                <FaTwitter size={25} color="white" />
              </div>
              <span className='lg:block hidden'>
                <p> Twitter</p>
                <p>Random thoughts & dev tweets</p>
              </span>
              <IoIosArrowForward size={25} className="hidden lg:block" />
            </div>
          </a>
        </div>
        <div className="border-2 rounded xl:w-[50%]  xl:p-10">
          <form action="" ref={form}>
            <p className="font-bold text-2xl">Send Me a Message</p>
            <div className="xl:mb-5">
              <label htmlFor="">Name</label>
              <br />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className={
                  mode !== "light"
                    ? " text-black w-full bg-white rounded h-10 mt-5  xl:mt-5 pl-4"
                    : "w-full xl:mt-5 bg-gray-900 text-white rounded h-10 pl-4"
                }
                name="from_name"
              />
            </div>
            <div className="xl:mb-5">
              <label htmlFor="">Email</label>
              <br />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className={
                  mode !== "light"
                    ? " text-black w-full bg-white rounded h-10 mt-5  xl:mt-5 pl-4"
                    : "w-full xl:mt-5 bg-gray-900 text-white rounded h-10 pl-4"
                }
                name="email"
              />
            </div>
            <div>
              <label htmlFor="">Message</label>
              <br />
              {/* <a type="text"  /> */}
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                className={
                  mode !== "light"
                    ? "w-full bg-white rounded mt-5 text-black  xl:mt-5 pl-4 h-50"
                    : "w-full xl:mt-5 bg-gray-900 text-white rounded h-50 p-4"
                }
                rows={3}
                
              ></textarea>
            </div>
            <button className="w-fit rounded mt-5 flex justify-center items-center bg-white text-black font-medium text-xl p-3" onClick={sendEmail}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
