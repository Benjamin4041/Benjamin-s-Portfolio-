import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import styles from "./globals.module.css";
import { videos } from "./videos";
import { useGSAP } from "@gsap/react";

// Card subcomponent
const Card = ({ video }) => (
  <div className={styles.card}>
    <div className={styles["card-info"]}>
      <div className={styles["card-item"]}>
        <p>{video.date}</p>
      </div>
      <div className={styles["card-item"]}>
        <p>{video.title}</p>
      </div>
      <div className={styles["card-item"]}>
        <p>{video.category}</p>
      </div>
    </div>
    <div className={styles["video-player"]}>
      <video
        src={`${video.path}`}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        title={video.title}
        playsInline
        autoPlay
        loop
        muted
      />
      <div
        className="bg-white text-black rounded-full p-5 w-fit absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] cursor-pointer"
        onClick={() => alert("hmm")}
      >
        <p>click</p>
      </div>
    </div>
  </div>
);

const Slider = () => {
  const sliderRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  useEffect(() => {
    if (sliderRef.current) {
      initializeCards();
    }
  }, [sliderRef]);

  const initializeCards = () => {
    const cards = Array.from(
      sliderRef.current.querySelectorAll(`.${styles.card}`)
    );
    gsap.to(cards, {
      y: (i) => 0 + 20 * i + "%",
      z: (i) => 15 * i,
      duration: 1,
      ease: "power3.out",
      stagger: -0.1,
    });
  };

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const slider = sliderRef.current;
    const cards = Array.from(slider.querySelectorAll(`.${styles.card}`));
    const lastCard = cards.pop();

    gsap.to(lastCard, {
      y: "+=150%",
      duration: 0.75,
      ease: "power3.inOut",
      onStart: () => {
        setTimeout(() => {
          slider.prepend(lastCard);
          initializeCards();
          setTimeout(() => {
            setIsAnimating(false);
          }, 1000);
        }, 300);
      },
    });
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.slider} ref={sliderRef}>
        {videos.map((video) => (
          <Card video={video} key={video.id} />
        ))}
      </div>
    </div>
  );
};

export default Slider;
