import React, { useContext } from "react";
import ModeProvider from "../context/mode";

export default function Footer() {
  const { mode } = useContext(ModeProvider);
  return (
    <footer className="py-32">
      <h1
        className={
          "not-italic font-normal text-center lg:text-9xl lg:mb-9 text-5xl mb-4"
        }
      >
        Let's Talk
      </h1>
      <button
        className={
          mode === "light"
            ? "flex justify-center items-center lg:p-8 m-auto bg-black rounded-full text-white gap-4 p-4 "
            : "flex justify-center items-center lg:p-8 m-auto bg-white rounded-full text-black gap-4 p-4 "
        }
      >
        Contact Me
        <span
          className={
            mode === "light"
              ? "stroke-white fill-white"
              : "stroke-black fill-black"
          }
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_535_429)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.2799 5.9747C12.8561 5.99218 12.3545 6.00286 11.8078 5.99513C10.2234 5.97287 8.20108 5.79579 6.60833 5.13993L6.9891 4.21526C8.40165 4.79688 10.2684 4.97335 11.8218 4.99529C12.5909 5.00612 13.2685 4.97903 13.7535 4.94922C13.9958 4.93429 14.1895 4.91878 14.3218 4.90704C14.388 4.9012 14.4388 4.89629 14.4727 4.89285L14.5105 4.88897L14.5195 4.88804L14.5215 4.88778L15.1429 4.81876L15.0738 5.43986L15.0736 5.44215L15.0727 5.45113L15.0688 5.48896C15.0653 5.52286 15.0604 5.57366 15.0546 5.63981C15.0429 5.77218 15.0273 5.96583 15.0124 6.20815C14.9826 6.69311 14.9555 7.37073 14.9663 8.13985C14.9883 9.69325 15.1648 11.56 15.7464 12.9725L14.8217 13.3533C14.1659 11.7606 13.9888 9.73826 13.9665 8.15387C13.9588 7.6072 13.9695 7.10555 13.9869 6.68188L5.031 15.6378L4.3239 14.9307L13.2799 5.9747Z"
                // fill="white"
                // stroke="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_535_429">
                <rect
                  width="13"
                  height="15"
                  fill="white"
                  transform="translate(9.29289 19.8997) rotate(-135)"
                />
              </clipPath>
            </defs>
          </svg>
        </span>
      </button>
    </footer>
  );
}
