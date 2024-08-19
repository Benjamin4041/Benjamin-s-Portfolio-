import React from "react";

export default function Project({ image, name = "Projectname",link ,mode,}) {
  return (
    <a href={link} target="_blank" className="lg:w-[45%] w-full cursor-pointer">
      <div className="flex flex-col ">
        <div className="rounded-full w-full">
          <img src={image} alt="projects" className="object-cover" />
        </div>
        <p className={mode==='light'?"text-black font-extrabold text-2xl":"text-white font-extrabold text-2xl"}>{name}</p>
      </div>
    </a>
  );
}
