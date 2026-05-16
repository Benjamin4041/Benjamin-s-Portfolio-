import React from "react";
import { useNavigate } from "react-router-dom";

export default function Folder({ image, index, name, folder, location }) {
  const navigate = useNavigate();
  const Redirect = (loc) => {
    return navigate(loc);
  };
  return (
    <div
      key={folder.id}
      className={`group relative flex flex-1 flex-col ${
        folder.flexClass ?? ""
      } -mb-2 h-[200px] cursor-pointer lg:mb-0`}
      onClick={() => Redirect(location)}
    >
      <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-[25rem] lg:block">
        {previewImagePositions.map((positionClass, idx) => (
          <div
            key={`${folder.id}-preview-${idx}`}
            className={`absolute top-1/2 h-48 w-32 ${positionClass}`}
          >
            <img
              src={previewImageSrc}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div
        className="relative flex h-full w-full overflow-hidden"
        style={{ willChange: "transform" }}
      >
        <div
          className={`relative w-[40%]  p-3 transition-colors duration-200 ${backgroundClass}`}
        >
          <span
            className={`absolute left-[99%]  top-0 h-[101%] aspect-square ${backgroundClass}`}
            style={{
              clipPath: "polygon(0 0, 25% 0, 100% 100%, 0% 100%)",
            }}
          />
          <p
            className={`font-mono text-xs font-medium uppercase tracking-[0.4em] ${textClass}`}
          >
            {folder.index}
          </p>
        </div>

        <div
          className={`flex flex-1 items-start px-1 pl-8 transition-colors duration-200 ${backgroundClass}`}
        >
          <p
            className={`text-[2.75rem] font-light uppercase leading-none ${textClass}`}
          >
            {folder.label}
          </p>
        </div>
      </div>
    </div>
  );
}
