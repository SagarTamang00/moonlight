import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import useProjects from "../../hooks/useProjects";
import useProjectLinks from "../../hooks/useProjectLinks";
import { BackToTop } from "../BackToTop/BackToTop";

import { BASE_URL } from "../../utils/api";

gsap.registerPlugin(ScrollTrigger);

const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`
    : url;
};

const getYoutubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const ExpandedProjectContent = ({
  project,
  activeMediaId,
  setActiveMediaId,
  isPlaying,
  setIsPlaying,
}) => {
  const { links } = useProjectLinks(project.id);
  const youtubeLinks = links?.filter((link) => getYoutubeId(link.url)) || [];
  const activeVideoData = youtubeLinks.find((l) => l.id === activeMediaId);

  return (
    <div className="flex flex-col gap-10">
      {/* Video label */}
      {youtubeLinks.length > 0 && (
        <>
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/70">
            — AVAILABLE FOOTAGE
          </p>

          {/* Video grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {youtubeLinks.map((video) => {
              const isActive = activeMediaId === video.id;
              const ytId = getYoutubeId(video.url);
              const thumbUrl = ytId
                ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`
                : "";
              return (
                <div key={video.id} className="flex flex-col gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMediaId(isActive ? null : video.id);
                      setIsPlaying(false);
                    }}
                    className={`group/v relative aspect-[16/9] w-full overflow-hidden text-left transition-all duration-300 ${isActive ? "ring-1 ring-white/60 ring-offset-2 ring-offset-black" : "ring-1 ring-white/10 hover:ring-white/30"}`}
                  >
                    <img
                      src={thumbUrl}
                      alt={video.type}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                        isActive
                          ? "scale-105 brightness-110 saturate-110"
                          : "group-hover/v:scale-105 group-hover/v:brightness-110 group-hover/v:saturate-110"
                      }`}
                    />
                    <div
                      className={`absolute inset-0 transition-all duration-300 ${isActive ? "bg-black/20" : "bg-black/60 group-hover/v:bg-black/35"}`}
                    />
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover/v:opacity-100"}`}
                    >
                      <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                        {isActive ? (
                          <span className="w-3 h-3 flex gap-[3px] items-center">
                            <span className="block w-[3px] h-3 bg-white rounded-sm" />
                            <span className="block w-[3px] h-3 bg-white rounded-sm" />
                          </span>
                        ) : (
                          <svg
                            className="w-3 h-3 text-white ml-0.5"
                            viewBox="0 0 12 12"
                            fill="currentColor"
                          >
                            <path d="M2 1.5l9 4.5-9 4.5V1.5z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                      <p className="text-[10px] text-white/80 leading-tight truncate uppercase">
                        {video.type || "Video"}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Active video player */}
          {activeVideoData &&
            (() => {
              const ytId = getYoutubeId(activeVideoData.url);
              const thumbUrl = ytId
                ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`
                : "";
              return (
                <div className="relative w-full aspect-video bg-black/60 flex items-center justify-center border border-white overflow-hidden mt-6">
                  {isPlaying ? (
                    <div className="relative w-[90%] md:w-[85%] lg:w-[80%] aspect-video z-10 bg-black rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.6)] border border-white">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={getYouTubeEmbedUrl(activeVideoData.url)}
                        title={activeVideoData.type}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <>
                      {/* Background Thumbnail */}
                      {thumbUrl && (
                        <>
                          <img
                            src={thumbUrl}
                            alt={activeVideoData.type}
                            className="absolute inset-0 w-full h-full object-cover opacity-60"
                          />
                          <div className="absolute inset-0 bg-black/40" />
                        </>
                      )}

                      <div className="relative z-10 text-center">
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsPlaying(true);
                          }}
                          className="w-16 h-16 rounded-full border border-white bg-black/50 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <svg
                            className="w-6 h-6 text-white ml-1"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" />
                          </svg>
                        </div>
                        <p className="text-white text-sm tracking-widest uppercase mb-6 font-semibold drop-shadow-md">
                          {activeVideoData.type || "Video"}
                        </p>
                        <a
                          href={activeVideoData.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block px-6 py-2.5 border border-white/40 bg-black/50 hover:bg-white/20 backdrop-blur-sm text-white text-[10px] tracking-widest uppercase transition-colors"
                        >
                          Watch on YouTube
                        </a>
                      </div>
                    </>
                  )}

                  {/* Close */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMediaId(null);
                      setIsPlaying(false);
                    }}
                    className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full border border-white bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors"
                  >
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <line x1="1" y1="1" x2="11" y2="11" />
                      <line x1="11" y1="1" x2="1" y2="11" />
                    </svg>
                  </button>
                </div>
              );
            })()}
        </>
      )}

      {/* External Links (Non-YouTube) */}
      {links && links.length > 0 && (
        <div className="border-t border-white/10 pt-6 mt-6">
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/70 mb-4">
            — EXTERNAL LINKS
          </p>
          <div className="flex flex-wrap gap-3">
            {links.map((link) => {
              const isYoutube =
                link.url &&
                (link.url.includes("youtube.com") ||
                  link.url.includes("youtu.be"));
              const labelText = link.type || (isYoutube ? "YouTube" : "Link");
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[10px] uppercase tracking-widest px-4 py-2 border border-white rounded-full hover:bg-white/10 hover:text-white text-white/70 transition-colors"
                >
                  {isYoutube && (
                    <svg
                      className="w-3.5 h-3.5 text-white/80"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.134 0 12 0 12s0 3.866.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.866 24 12 24 12s0-3.866-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )}
                  {labelText} ↗
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const CompletedProjects = () => {
  const sectionRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { projects } = useProjects();
  const completedProjects =
    projects?.filter((p) => p.status === "completed") || [];

  useEffect(() => {
    setIsPlaying(false);
  }, [activeVideo]);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cp-headline",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );

      gsap.utils.toArray(".cp-project-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: row, start: "top 80%" },
          },
        );
      });
    },
    { scope: sectionRef, dependencies: [completedProjects] },
  );

  const toggleExpand = (id) => {
    setExpandedProject((prev) => (prev === id ? null : id));
    setActiveVideo(null);
  };

  return (
    <section
      ref={sectionRef}
      id="completed-projects-section"
      className="relative w-full py-24 lg:py-40 overflow-hidden"
    >
      {/* Faint grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-10 w-full max-w-[95vw] xl:max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section header */}
        <div className="cp-headline mb-20 lg:mb-32 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div>
            <h2
              className="text-5xl sm:text-6xl lg:text-8xl font-cinematic text-white leading-none"
              style={{ textShadow: "0 0 60px rgba(255,255,255,0.08)" }}
            >
              COMPLETED
              <br />
              <span className="text-white/20">WORKS</span>
            </h2>
          </div>
          <div className="flex justify-end">
            <Link
              to="/all-projects"
              className="group relative px-6 py-3 bg-white/5 hover:bg-white/10 border border-white rounded-full text-white text-xs tracking-[0.2em] uppercase transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View All Projects
                <span className="text-base group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </span>
              <div className="absolute inset-0 w-full h-full bg-white/10 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            </Link>
          </div>
        </div>

        {/* Project rows */}
        <div className="flex flex-col divide-y divide-white">
          {completedProjects.slice(0, 4).map((project, index) => {
            const isExpanded = expandedProject === project.id;

            // Format data for the component
            const pCoverImage = project.poster
              ? `${BASE_URL}${project.poster}`
              : "";
            const pReleaseYear = project.release_year || "";
            const pGenre = project.category_name || "";
            const pRuntime = project.duration || "";
            const pSeasonsCount = project.seasons || 0;
            const pEpisodesCount = project.episodes || 0;
            const pIndex = String(index + 1).padStart(2, "0");

            return (
              <div key={project.id} className="cp-project-row opacity-0">
                {/* ── Top bar: always visible ─────────────────────── */}
                <div
                  className="group flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 py-10 lg:py-14 cursor-pointer select-none"
                  onClick={() => toggleExpand(project.id)}
                >
                  {/* Index */}
                  <span className="text-xs text-white/20 w-8 shrink-0 hidden lg:block">
                    {pIndex}
                  </span>

                  {/* Thumbnail strip */}
                  <div className="relative w-full lg:w-64 xl:w-80 aspect-[16/9] shrink-0 overflow-hidden bg-black/20 rounded-2xl border border-white/10 group-hover:border-white/30 transition-all duration-500">
                    {/* Blurred background to fill empty space without black bars */}
                    <img
                      src={pCoverImage}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 transition-all duration-700 scale-110 group-hover:scale-110"
                    />
                    {/* Actual uncut poster */}
                    <img
                      src={pCoverImage}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-contain transition-all duration-700 scale-95 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-[10px] text-white/70 tracking-widest font-semibold drop-shadow-md z-10 uppercase">
                      {pSeasonsCount > 0
                        ? `${pSeasonsCount} Seasons`
                        : pEpisodesCount > 0
                          ? `${pEpisodesCount} Episodes`
                          : ""}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      {pReleaseYear && (
                        <span className="text-[10px] text-white/80 tracking-[0.25em] uppercase">
                          {pReleaseYear}
                        </span>
                      )}
                      {pGenre && (
                        <>
                          {pReleaseYear && (
                            <span className="w-px h-3 bg-white/40" />
                          )}
                          <span className="text-[10px] text-white/80 tracking-[0.2em] uppercase">
                            {pGenre}
                          </span>
                        </>
                      )}
                      {pRuntime && (
                        <>
                          <span className="w-px h-3 bg-white/40" />
                          <span className="text-[10px] text-white/80 tracking-[0.2em] uppercase">
                            {pRuntime}
                          </span>
                        </>
                      )}
                      {pSeasonsCount > 0 && (
                        <>
                          <span className="w-px h-3 bg-white/40" />
                          <span className="text-[10px] text-white/80 tracking-[0.2em] uppercase">
                            {pSeasonsCount}{" "}
                            {pSeasonsCount > 1 ? "Seasons" : "Season"}
                          </span>
                        </>
                      )}
                      {pEpisodesCount > 0 && (
                        <>
                          <span className="w-px h-3 bg-white/40" />
                          <span className="text-[10px] text-white/80 tracking-[0.2em] uppercase">
                            {pEpisodesCount}{" "}
                            {pEpisodesCount > 1 ? "Episodes" : "Episode"}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-cinematic text-white leading-none mb-4 group-hover:text-white/90 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Expand toggle */}
                  <div className="hidden lg:flex items-center gap-3 shrink-0">
                    <span className="text-xs text-white/80 tracking-widest uppercase">
                      {isExpanded ? "Close" : "View All"}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border border-white flex items-center justify-center transition-all duration-500 ${isExpanded ? "rotate-45 bg-white/10" : "group-hover:border-white/50"}`}
                    >
                      <svg
                        className="w-3 h-3 text-white/60"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <line x1="6" y1="1" x2="6" y2="11" />
                        <line x1="1" y1="6" x2="11" y2="6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* ── Expanded panel: video gallery + description ── */}
                <div
                  className={`overflow-hidden transition-all duration-700 ease-in-out`}
                  style={{ maxHeight: isExpanded ? "3000px" : "0px" }}
                >
                  <div className="pb-12 lg:pb-16 flex flex-col gap-10">
                    {/* Description */}
                    <p className="text-base lg:text-lg text-white/90 font-light leading-relaxed max-w-3xl border-l border-white/20 pl-6 mb-10">
                      {project.description}
                    </p>

                    {/* Live Media Gallery component */}
                    {isExpanded && (
                      <ExpandedProjectContent
                        project={project}
                        activeMediaId={activeVideo}
                        setActiveMediaId={setActiveVideo}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <BackToTop />
    </section>
  );
};
