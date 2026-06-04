import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useProjects from "../../hooks/useProjects";
import useProjectMedia from "../../hooks/useProjectMedia";
import { BASE_URL } from "../../utils/api";

gsap.registerPlugin(ScrollTrigger);

const MediaItemCard = ({ item, project, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const imageSrc = item.image_path ? `${BASE_URL}/${item.image_path}` : "";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`shrink-0 snap-center rounded-2xl border border-white/10 transition-all duration-500 p-5 sm:p-6 media-row opacity-0 translate-y-8 flex flex-col gap-4
        ${hovered ? "bg-white/[0.04]" : "bg-white/[0.02]"}
        ${expanded ? "w-[480px] sm:w-[560px] lg:w-[640px]" : "w-[280px] sm:w-[320px] lg:w-[360px]"}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-white/30 font-light tracking-widest shrink-0">
          0{index + 1}
        </span>
        <h3 className="text-base sm:text-lg font-cinematic text-white tracking-widest uppercase truncate">
          {project.title}
        </h3>
        <div
          className={`h-[1px] flex-1 transition-colors duration-300 ${hovered ? "bg-white/30" : "bg-white/10"}`}
        />
      </div>

      {/* Image */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className={`relative w-full overflow-hidden rounded-xl text-left transition-all duration-500
          ${
            expanded
              ? "aspect-video ring-2 ring-white/40"
              : `aspect-[4/5] ${hovered ? "ring-white/30" : "ring-white/10"} ring-1`
          }`}
        aria-label={expanded ? "Collapse image" : "Expand image"}
      >
        <img
          src={imageSrc}
          alt={item.title}
          className={`absolute inset-0 w-full h-full transition-all duration-700
  ${
    expanded
      ? "object-contain bg-black scale-100"
      : hovered
        ? "object-cover scale-105"
        : "object-cover scale-100"
  }`}
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-500
            ${
              expanded
                ? "bg-black/10 opacity-100"
                : hovered
                  ? "bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100"
                  : "bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60"
            }`}
        />

        {/* Title — hidden when expanded */}
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-[10px] font-semibold tracking-widest text-white/90 uppercase truncate">
              {item.title}
            </p>
          </div>
        )}

        {/* Close icon — shown when expanded */}
        {expanded && (
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white/70">
            <svg
              className="w-3 h-3"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="1" y1="1" x2="11" y2="11" />
              <line x1="11" y1="1" x2="1" y2="11" />
            </svg>
          </div>
        )}
      </button>

      {/* Caption shown when expanded */}
      {expanded && (
        <p className="text-[10px] font-semibold tracking-widest text-white/50 uppercase truncate">
          {item.title}
        </p>
      )}
    </div>
  );
};

const ProjectMediaCards = ({ project, startIndex }) => {
  const { media, loading } = useProjectMedia(project.id);
  if (loading || !media || media.length === 0) return null;
  return (
    <>
      {media.map((item, i) => (
        <MediaItemCard
          key={item.id}
          item={item}
          project={project}
          index={startIndex + i}
        />
      ))}
    </>
  );
};

export const MediaGallery = () => {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const firstHalfRef = useRef(null);
  const isHovered = useRef(false);
  const { projects } = useProjects();

  const allProjects = projects || [];

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.to(".media-headline", {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out",
          });
          gsap.to(".media-row", {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2,
          });
        },
      });
    },
    { scope: sectionRef, dependencies: [allProjects] },
  );

  const exactScrollRef = useRef(0);
  const loopWidthRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    const firstHalf = firstHalfRef.current;
    let animationId;

    if (!container || !firstHalf || allProjects.length === 0) return;

    const measureWidth = () => {
      const gap = parseFloat(window.getComputedStyle(container).gap) || 0;
      loopWidthRef.current = firstHalf.scrollWidth + gap;
    };

    // Measure initially
    measureWidth();

    // Use ResizeObserver to detect when the size of the first half container changes
    // (e.g. when individual project media finishes loading and rendering)
    const resizeObserver = new ResizeObserver(() => {
      measureWidth();
    });
    resizeObserver.observe(firstHalf);

    const scroll = () => {
      if (!isHovered.current) {
        exactScrollRef.current += 0.8;
        if (loopWidthRef.current > 0) {
          if (exactScrollRef.current >= loopWidthRef.current) {
            exactScrollRef.current = exactScrollRef.current % loopWidthRef.current;
          } else if (exactScrollRef.current < 0) {
            exactScrollRef.current = (exactScrollRef.current % loopWidthRef.current) + loopWidthRef.current;
          }
        }
        container.scrollLeft = exactScrollRef.current;
      } else {
        exactScrollRef.current = container.scrollLeft;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [allProjects.length]);

  let cardIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-40 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-10 w-full mb-12 px-6 sm:px-10 lg:px-16 max-w-screen-2xl mx-auto">
        <div className="media-headline opacity-0 translate-y-12 flex flex-col gap-4">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-cinematic text-white leading-none">
            Behind
            <br />
            <span className="text-white/20">The Scenes</span>
          </h2>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[100vw] overflow-hidden">
        <div
          ref={scrollRef}
          onMouseEnter={() => (isHovered.current = true)}
          onMouseLeave={() => (isHovered.current = false)}
          onTouchStart={() => (isHovered.current = true)}
          onTouchEnd={() => (isHovered.current = false)}
          className="flex gap-4 sm:gap-6 overflow-x-auto px-6 sm:px-10 lg:px-16 pb-16 pt-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
        >
          <div ref={firstHalfRef} className="flex gap-4 sm:gap-6 shrink-0">
            {allProjects.map((project, idx) => {
              const ci = cardIndex;
              cardIndex++;
              return (
                <ProjectMediaCards
                  key={`first-${project.id}-${idx}`}
                  project={project}
                  startIndex={ci}
                />
              );
            })}
          </div>

          <div className="flex gap-4 sm:gap-6 shrink-0">
            {allProjects.map((project, idx) => (
              <ProjectMediaCards
                key={`second-${project.id}-${idx}`}
                project={project}
                startIndex={0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
