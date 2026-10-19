import { useEffect, useId, useRef, useState } from "react";
import './AnimatedCopy.css'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// With reduced motion the text is never split or hidden, so it simply shows.
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const AnimatedCopy = ({
  children,
  className = "",
  delay = 0,
  duration = 1,
  ease = "power4.out",
  stagger = 0.05,
  lineSelector = "",
  animateOnScroll = true,
  direction = "bottom",
  tag = "p",
}) => {
  const copyRef = useRef(null);
  // useId is unique per instance; random ids could collide and hide another block's text
  const copyId = `copy-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [isInitialized, setIsInitialized] = useState(false);
  const textSplitRef = useRef(null);

  useEffect(() => {
    if (!copyId || !copyRef.current || prefersReducedMotion()) return;

    const lineClass = `line-${copyId}`;

    const text = new SplitType(copyRef.current, {
      types: "lines",
      lineClass: lineClass,
    });

    textSplitRef.current = text;

    const selector = lineSelector || `.${lineClass}`;
    const lines = document.querySelectorAll(selector);

    lines.forEach((line) => {
      const content = line.innerHTML;
      line.innerHTML = `<span class="line-inner-${copyId}">${content}</span>`;
    });

    const initialY = direction === "top" ? "-100%" : "100%";

    gsap.set(`.line-inner-${copyId}`, {
      y: initialY,
      display: "block",
    });

    setIsInitialized(true);

    return () => {
      if (textSplitRef.current) textSplitRef.current.revert();
    };
  }, [copyId, lineSelector, direction]);

  useGSAP(
    () => {
      if (!isInitialized || !copyRef.current) return;

      const tl = gsap.timeline({
        defaults: {
          ease,
          duration,
        },
        ...(animateOnScroll
          ? {
              scrollTrigger: {
                trigger: copyRef.current,
                // Start as soon as the text enters the viewport, so it isn't
                // left hidden or half-revealed on screen.
                start: "top bottom",
                toggleActions: "play none none none",
              },
            }
          : {}),
      });

      tl.to(`.line-inner-${copyId}`, {
        y: "0%",
        stagger,
        delay,
      });

      return () => {
        if (animateOnScroll) {
          ScrollTrigger.getAll()
            .filter((st) => st.vars.trigger === copyRef.current)
            .forEach((st) => st.kill());
        }
      };
    },
    {
      scope: copyRef,
      dependencies: [
        isInitialized,
        animateOnScroll,
        delay,
        duration,
        ease,
        stagger,
        direction,
      ],
    }
  );

  const Tag = tag;

  return (
    <Tag
      ref={copyRef}
      className={`animated-copy ${className} font-Gestura`}
      data-copy-id={copyId}
    >
      {children}
    </Tag>
  );
};

export default AnimatedCopy;
