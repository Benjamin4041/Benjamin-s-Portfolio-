import { useNavigate } from "react-router-dom";
import AnimatedCopy from "../AnimatedCopy/AnimatedCopy";

export default function Project({
  projectName = "Rouqqu",
  imageSrc = "https://res.cloudinary.com/ba-foods/image/upload/v1753694123/screenshot-20250728100526_dk1e6w.png",
  imageRef,
  cardRef,
  videoSrc,
}) {
  const Navigate = useNavigate();
  const redirect = (location) => {
    Navigate(`/project/:${location.split(" ").join("")}`);
  };

  return (
    <div
      className="group absolute w-fit h-fit lg:h-full rounded-[2em] overflow-hidden lg:object-fill cursor-pointer "
      ref={cardRef}
      onClick={() => redirect(projectName)}
    >
      <div className="absolute top-[1em] left-[1em] p-[0.5em] rounded-[0.5em] bg-black text-white z-[1]">
        <AnimatedCopy className="uppercase text-[12px] font-semibold ">
          {projectName}
        </AnimatedCopy>
      </div>
      <img
        src={imageSrc}
        alt=""
        className="w-full h-full lg:object-cover object-contain group-hover:hidden"
        ref={imageRef}
      />
      <video
        src={videoSrc}
        autoPlay={true}
        muted={true}
        loop
        playsInline
        className="w-full h-full lg:object-cover object-contain hidden group-hover:inline-block"
      ></video>
    </div>
  );
}
