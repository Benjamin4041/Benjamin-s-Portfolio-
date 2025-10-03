import React, { useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./globals.module.css";
import { useGSAP } from "@gsap/react";
import { videos } from './videos';
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// Card subcomponent
const Card = ({ video,onClick }) => (
  <div className={styles.card} onClick={onClick}>
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
 
    </div>
  </div>
);

const SliderTestVersion = forwardRef(({ interactive = false }, ref) => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const animationInFlightRef = useRef(false);
  const displayIndexRef = useRef(0);
  const desiredIndexRef = useRef(0);
  const totalCardsRef = useRef(0);
  const navigate =useNavigate()
  
  const normalizeIndex = (value) => {
    const total = totalCardsRef.current;
    if (total <= 0) return 0;
    const result = value % total;
    return result < 0 ? result + total : result;
  };

  const setStackPositions = () => {
    const slider = sliderRef.current;
    if (!slider) return [];
    const cards = Array.from(slider.querySelectorAll(`.${styles.card}`));
    gsap.set(cards, {
      y: (i) => `${i * 20}%`,
      z: (i) => 12 * i,
    });
    totalCardsRef.current = cards.length;
    displayIndexRef.current = 0;
    desiredIndexRef.current = 0;
    return cards;
  };

  const realignStack = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cards = Array.from(slider.querySelectorAll(`.${styles.card}`));
    cards.forEach((card, index) => {
      gsap.set(card, { y: `${index * 20}%`, z: 15 * index });
    });
  };

  const rotateForward = () => {
    const slider = sliderRef.current;
    if (!slider) return null;

    const cards = Array.from(slider.querySelectorAll(`.${styles.card}`));
    if (cards.length <= 1) return null;

    const lastCard = cards[cards.length - 1];
    const others = cards.slice(0, -1);

    const tl = gsap.timeline({
      defaults: { duration: 0.75, ease: "power3.inOut" },
    });

    tl.to(
      lastCard,
      {
        y: "+=150%",
      },
      0
    );

    tl.to(
      others,
      {
        y: (i) => `${(i + 1) * 20}%`,
        z: (i) => 15 * (i + 1),
      },
      0
    );

    tl.add(() => {
      slider.prepend(lastCard);
      realignStack();
    });

    return tl;
  };

  const rotateBackward = () => {
    const slider = sliderRef.current;
    if (!slider) return null;

    const cards = Array.from(slider.querySelectorAll(`.${styles.card}`));
    if (cards.length <= 1) return null;

    const firstCard = cards[0];
    const others = cards.slice(1);

    const tl = gsap.timeline({
      defaults: { duration: 0.75, ease: "power3.inOut" },
    });

    tl.to(
      firstCard,
      {
        y: "-=150%",
      },
      0
    );

    tl.to(
      others,
      {
        y: (i) => `${i * 20}%`,
        z: (i) => 15 * i,
      },
      0
    );

    tl.add(() => {
      slider.append(firstCard);
      realignStack();
    });

    return tl;
  };

  const playNextStep = () => {
    if (animationInFlightRef.current) return;

    const total = totalCardsRef.current;
    if (total <= 1) return;

    const displayed = displayIndexRef.current;
    const desired = desiredIndexRef.current;

    if (desired === displayed) return;

    const goingDown = desired > displayed;
    const animation = goingDown ? rotateBackward() : rotateForward();

    if (!animation) {
      displayIndexRef.current = normalizeIndex(
        displayIndexRef.current + (goingDown ? 1 : -1)
      );
      playNextStep();
      return;
    }

    animationInFlightRef.current = true;

    animation.eventCallback("onComplete", () => {
      animationInFlightRef.current = false;
      displayIndexRef.current = normalizeIndex(
        displayIndexRef.current + (goingDown ? 1 : -1)
      );
      playNextStep();
    });
  };

  const handleClick = (location) => {
    if(location.includes(' ')){
      location = location.split(' ').join('')
       navigate(`/project/:${location}`)
    }
    navigate(`/project/:${location}`)
  };

  useImperativeHandle(ref, () => ({
    getCards: () => {
      const root = sliderRef.current;
      if (!root) return [];
      return Array.from(root.querySelectorAll(`.${styles.card}`));
    },
    getRoot: () => sliderRef.current,
  }));

  useGSAP(
    () => {
      const cards = setStackPositions();
      if (!cards.length) return;

      if (interactive) return;

      const triggerElement = containerRef.current;
      if (!triggerElement) return;

      const totalCards = cards.length;
      const endValue = () => {
        if (totalCards <= 1) return "+=1";
        const viewportHeight =
          triggerElement.clientHeight || window.innerHeight;
        return `+=${Math.max((totalCards - 1) * viewportHeight, 1)}`;
      };

      const scrollTrigger = ScrollTrigger.create({
        trigger: triggerElement,
        start: "top top",
        end: endValue,
        pin: true,
        pinSpacing: true,
        snap:
          totalCards > 1
            ? {
                snapTo: (value) => {
                  const steps = totalCards - 1;
                  return Math.round(value * steps) / steps;
                },
                duration: 0.4,
                ease: "power1.inOut",
              }
            : false,
        onUpdate: (self) => {
          if (totalCards <= 1) return;

          const targetIndex = Math.round(self.progress * (totalCards - 1));
          desiredIndexRef.current = targetIndex;
          playNextStep();
        },
      });

      scrollTriggerRef.current = scrollTrigger;

      return () => {
        scrollTrigger.kill();
        scrollTriggerRef.current = null;
      };
    },
    { scope: containerRef }
  );

  return (
    <div className={styles.container + ' mb-10'} ref={containerRef}>
      <div className={styles.slider} ref={sliderRef}>
        {videos.map((video, index) => (
          <Card video={video} key={video.id ?? `${video.title}-${index}`} onClick={()=>handleClick(video.title)}/>
        ))}
      </div>
    </div>
  );
});

export default SliderTestVersion;
