import React, { useRef } from "react";
import Project from "./Project";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export default function Projects() {
  const container = useRef(null);
  const cardsContainer = useRef(null);
  const images = useRef(null);
  const projectSection = useRef(null);
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cards = cardsContainer.current.children;
      const images = Array.from(cards).map((card) => card.querySelector("img"));
      const totalCards = cardsContainer.current.children.length;

      gsap.set(cards[0], { y: "0%", scale: 1, rotation: 0 });
      gsap.set(images[0], { scale: 1 });

      for (let i = 1; i < totalCards; i++) {
        gsap.set(cards[i], { y: "100%", scale: 1, rotation: 0 });
        gsap.set(images[i], { scale: 1 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: projectSection.current,
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cards[i];
        const currentImage = images[i];
        const nextCard = cards[i + 1];
        const position = i;

        scrollTimeline.to(
          currentCard,
          {
            scale: 0.5,
            rotation: 10,
            duration: 1,
            ease: "none",
          },
          position
        );

        scrollTimeline.to(
          currentImage,
          {
            scale: 1.5,
            duration: 1,
            ease: "none",
          },
          position
        );

        scrollTimeline.to(
          nextCard,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position
        );
      }

      return () => {
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  return (
    <div
      className="flex justify-center items-center h-screen sticky-cards"
      ref={projectSection}
    >
      <div
        className="relative lg:w-[50%] lg:h-[50%] rounded-[0.5rem] w-full h-[31%] overflow-hidden "
        ref={cardsContainer}
      >
        <Project
          imageSrc={
            "https://res.cloudinary.com/ba-foods/image/upload/v1750273699/gjrduondyy4bnohl1v2c.png"
          }
          projectName={"Bridge"}
          imageRef={images}
        />
        <Project
          imageSrc={
            "https://res.cloudinary.com/ba-foods/image/upload/v1753693942/screenshot-20250728100552_cueeuo.png"
          }
          projectName={"Raven Bank"}
          imageRef={images}
          videoSrc={'/assets/videos/Raven 3d Patterns intro.mp4'}
        />
        <Project
          imageSrc={
            "https://res.cloudinary.com/ba-foods/image/upload/v1753694123/screenshot-20250728100526_dk1e6w.png"
          }
          projectName={"Roqqu"}
          imageRef={images}
          videoSrc={'/assets/videos/last scene.mp4'}
        />
        <Project
          imageSrc={
            "https://res.cloudinary.com/ba-foods/image/upload/v1708872646/Screenshot_2024-02-24_at_5.31.23_pm_swr1uh.png"
          }
          projectName={"SpencerZill"}
          imageRef={images}
           videoSrc={'/assets/videos/SpencerZill.mp4'}
        />
      </div>
    </div>
  );
}
