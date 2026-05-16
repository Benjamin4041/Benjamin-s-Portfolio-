import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import "./WorkSection.css";
import projectDetails from "../../utiliis/projectDetails";
import { useNavigate } from "react-router-dom";

const DEFAULT_PREVIEW_IMAGE =
  "https://images.pexels.com/photos/34098232/pexels-photo-34098232.jpeg";

const buildProjects = () =>
  Object.entries(projectDetails).map(([projectId, details], index) => {
    const rawImages = Array.isArray(details.imageUrls)
      ? details.imageUrls.filter(Boolean)
      : [];
    const fallback = details.imageUrl || DEFAULT_PREVIEW_IMAGE;
    const previewImages = [...rawImages];

    if (!previewImages.length) {
      previewImages.push(fallback);
    }

    while (previewImages.length < 3) {
      previewImages.push(previewImages[previewImages.length - 1] || fallback);
    }

    return {
      id: projectId,
      name: details.companyName || projectId,
      index: String(index + 1).padStart(2, "0"),
      previewImages: previewImages.slice(0, 3),
    };
  });

const assignVariants = (projects, columns = 2) => {
  const variantOrder = ["variant-1", "variant-2", "variant-3"];
  const columnState = Array.from({ length: columns }, (_, columnIndex) => ({
    nextIndex: columnIndex % variantOrder.length,
    previous: null,
  }));

  return projects.map((project, index) => {
    const columnIndex = index % columns;
    const state = columnState[columnIndex];
    let variantIndex = state.nextIndex;

    if (variantOrder[variantIndex] === state.previous) {
      variantIndex = (variantIndex + 1) % variantOrder.length;
    }

    const variant = variantOrder[variantIndex];
    state.nextIndex = (variantIndex + 1) % variantOrder.length;
    state.previous = variant;

    return { ...project, variant };
  });
};

const chunkProjects = (items, size) => {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

export default function WorksSection() {
  const projects = useMemo(buildProjects, []);
  const projectsWithVariants = useMemo(
    () => assignVariants(projects, 2),
    [projects]
  );
  const projectCount = projectsWithVariants.length;

  const folderRefs = useRef([]);
  const wrapperRefs = useRef([]);
  const previewRefs = useRef([]);

  if (folderRefs.current.length !== projectCount) {
    folderRefs.current = new Array(projectCount).fill(null);
  }
  if (wrapperRefs.current.length !== projectCount) {
    wrapperRefs.current = new Array(projectCount).fill(null);
  }
  if (previewRefs.current.length !== projectCount) {
    previewRefs.current = new Array(projectCount).fill(null).map(() => []);
  }

  useEffect(() => {
    const folderElements = folderRefs.current.filter(Boolean);
    const folderWrappers = wrapperRefs.current.filter(Boolean);

    if (!folderElements.length || !folderWrappers.length) {
      return undefined;
    }

    let isMobile = window.innerWidth < 1000;

    const setInitialPositions = () => {
      gsap.set(folderWrappers, { y: isMobile ? 0 : 25 });
    };

    const listeners = [];

    folderElements.forEach((folder, index) => {
      if (!folder) return;

      const handleMouseEnter = () => {
        if (isMobile) return;

        const previewImages = previewRefs.current[index]?.filter(Boolean) ?? [];

        folderElements.forEach((siblingFolder) => {
          if (siblingFolder !== folder) {
            siblingFolder.classList.add("disabled");
          }
        });

        const targetWrapper = folderWrappers[index];
        if (targetWrapper) {
          gsap.to(targetWrapper, {
            y: 0,
            duration: 0.25,
            ease: "back.out(1.7)",
          });
        }

        previewImages.forEach((img, imgIndex) => {
          let rotation;
          if (imgIndex === 0) {
            rotation = gsap.utils.random(-20, -10);
          } else if (imgIndex === 1) {
            rotation = gsap.utils.random(-10, 10);
          } else {
            rotation = gsap.utils.random(10, 20);
          }

          gsap.to(img, {
            y: "-100%",
            rotation,
            duration: 0.25,
            ease: "back.out(1.7)",
            delay: imgIndex * 0.025,
          });
        });
      };

      const handleMouseLeave = () => {
        if (isMobile) return;

        const previewImages = previewRefs.current[index]?.filter(Boolean) ?? [];

        folderElements.forEach((siblingFolder) => {
          siblingFolder.classList.remove("disabled");
        });

        const targetWrapper = folderWrappers[index];
        if (targetWrapper) {
          gsap.to(targetWrapper, {
            y: 25,
            duration: 0.25,
            ease: "back.out(1.7)",
          });
        }

        previewImages.forEach((img, imgIndex) => {
          gsap.to(img, {
            y: "0%",
            rotation: 0,
            duration: 0.25,
            ease: "back.out(1.7)",
            delay: imgIndex * 0.05,
          });
        });
      };

      folder.addEventListener("mouseenter", handleMouseEnter);
      folder.addEventListener("mouseleave", handleMouseLeave);

      listeners.push({
        folder,
        handleMouseEnter,
        handleMouseLeave,
      });
    });

    const handleResize = () => {
      const currentBreakpoint = window.innerWidth < 1000;
      if (currentBreakpoint === isMobile) {
        return;
      }

      isMobile = currentBreakpoint;
      setInitialPositions();

      folderElements.forEach((folder) => {
        folder.classList.remove("disabled");
      });

      const allPreviewImages = previewRefs.current.flatMap((group) =>
        (group || []).filter(Boolean)
      );
      gsap.set(allPreviewImages, { y: "0%", rotation: 0 });
    };

    window.addEventListener("resize", handleResize);
    setInitialPositions();

    return () => {
      listeners.forEach(({ folder, handleMouseEnter, handleMouseLeave }) => {
        folder.removeEventListener("mouseenter", handleMouseEnter);
        folder.removeEventListener("mouseleave", handleMouseLeave);
        folder.classList.remove("disabled");
      });

      window.removeEventListener("resize", handleResize);
    };
  }, [projectCount]);

  const projectRows = useMemo(
    () => chunkProjects(projectsWithVariants, 2),
    [projectsWithVariants]
  );
  const navigate = useNavigate();
  const Redirect = (loc) => {
    if (loc.includes(" ")) {
      return navigate(loc.split(" ").join(""));
    }
    return navigate(loc);
  };

  return (
    <div className="works-section pt-48 ">
      <div className="folders">
        {projectRows.map((row, rowIndex) => (
          <div className="row" key={`row-${rowIndex}`}>
            {row.map((project, columnIndex) => {
              const globalIndex = rowIndex * 2 + columnIndex;
              return (
                <div
                  key={project.id}
                  className={`folder ${project.variant}`}
                  ref={(el) => {
                    folderRefs.current[globalIndex] = el;
                  }}
                  onClick={() => Redirect("/project/:" + project.name)}
                >
                  <div className="folder-preview">
                    {project.previewImages.map((imgSrc, imgIndex) => (
                      <div
                        key={`${project.id}-preview-${imgIndex}`}
                        className="folder-preview-img"
                        ref={(el) => {
                          if (!previewRefs.current[globalIndex]) {
                            previewRefs.current[globalIndex] = [];
                          }
                          previewRefs.current[globalIndex][imgIndex] = el;
                        }}
                      >
                        <img
                          src={imgSrc || DEFAULT_PREVIEW_IMAGE}
                          alt={`${project.name} preview ${imgIndex + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div
                    className="folder-wrapper"
                    ref={(el) => {
                      wrapperRefs.current[globalIndex] = el;
                    }}
                  >
                    <div className="folder-index">
                      <p>{project.index}</p>
                    </div>
                    <div className="folder-name">
                      <p>{project.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            {row.length === 1 && (
              <div className="folder spacer" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
