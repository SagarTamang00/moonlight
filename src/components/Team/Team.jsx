import React, { useRef, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useTeamMembers from "../../hooks/useTeamMembers";
import useTeamMemberLinks from "../../hooks/useTeamMemberLinks";
import { BASE_URL } from "../../utils/api";

gsap.registerPlugin(ScrollTrigger);

const getIcon = (platform) => {
  const p = platform.toLowerCase();
  if (p.includes("instagram") || p.includes("ig"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  if (p.includes("x") || p.includes("twitter"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  if (p.includes("linkedin"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  if (p.includes("youtube") || p.includes("yt"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  if (p.includes("github") || p.includes("git"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    );

  return (
    <span className="font-bold text-[10px] tracking-widest">
      {platform.substring(0, 2).toUpperCase()}
    </span>
  );
};

const TeamMemberCard = ({ member, onClick }) => {
  return (
    <div
      onClick={() => onClick(member)}
      className="flex-shrink-0 w-[75vw] sm:w-[45vw] lg:w-[28vw] xl:w-[24vw] group relative overflow-hidden rounded-2xl bg-moon-grey/30 border border-white/10 aspect-[3/4] cursor-pointer"
    >
      {member.image && (
        <img
          src={`${BASE_URL}${member.image}`}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100 pointer-events-none"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-80"></div>

      {/* Category Badge Top Right */}
      {member.category_name && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10 pointer-events-none">
          <span className="text-[9px] tracking-widest text-white uppercase font-bold">
            {member.category_name}
          </span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 p-6 lg:p-8 w-full text-left">
        <h3 className="text-2xl lg:text-3xl font-cinematic text-white transition-transform duration-300 pointer-events-none">
          {member.name}
        </h3>

        {/* Helper text on hover */}
        <div className="overflow-hidden mt-1 h-0 group-hover:h-5 transition-all duration-300">
          <p className="text-[9px] tracking-widest text-moon-silver uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            View Details →
          </p>
        </div>
      </div>
    </div>
  );
};

const TeamMemberModal = ({ member, onClose }) => {
  const { links, loading } = useTeamMemberLinks(member.id);

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Lock scroll

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "unset"; // Unlock scroll
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!member) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-6xl h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
        {" "}
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        {/* Image Section */}
        <div className="w-full md:w-3/5 h-[40vh] md:h-auto relative shrink-0">
          {member.image ? (
            <img
              src={`${BASE_URL}${member.image}`}
              alt={member.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0a0a0a]" />
        </div>
        {/* Content Section */}
        <div className="flex-1 p-8 sm:p-10 lg:p-14 overflow-y-auto flex flex-col justify-center">
          <div className="w-12 h-px bg-white/20 mb-8" />

          <p className="text-sm sm:text-base text-white/60 leading-relaxed font-light whitespace-pre-wrap mb-10">
            {member.description}
          </p>

          {/* Social Links */}
          {loading ? (
            <div className="flex gap-2 items-center text-[10px] text-white/40 tracking-widest uppercase">
              Loading links...
            </div>
          ) : links && links.length > 0 ? (
            <div className="mt-auto pt-6 border-t border-white/10">
              <p className="text-[10px] tracking-widest text-white/40 uppercase mb-4">
                Connect
              </p>
              <div className="flex flex-wrap gap-4">
                {links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-colors duration-200 group"
                  >
                    <span className="opacity-70 group-hover:opacity-100">
                      {getIcon(link.platform)}
                    </span>
                    <span className="text-[10px] tracking-widest uppercase opacity-70 group-hover:opacity-100">
                      {link.platform}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const Team = () => {
  const sectionRef = useRef(null);
  const { members, loading } = useTeamMembers();
  const [selectedMember, setSelectedMember] = useState(null);

  const [emblaRef] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    containScroll: "trimSnaps",
  });

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => {
          gsap.to(".team-title", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          });

          gsap.to(".team-carousel", {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: sectionRef, dependencies: [members.length, loading] },
  );

  return (
    <section
      ref={sectionRef}
      id="team-section"
      className="relative h-[100dvh] lg:h-screen w-full flex items-center justify-center"
    >
      <div className="relative z-10 w-full max-w-[95vw] lg:max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cinematic mb-10 lg:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-white opacity-0 team-title translate-y-8">
          MEET THE CREATORS
        </h2>

        <div className="w-full overflow-hidden opacity-0 team-carousel translate-y-8">
          {loading ? (
            <div className="flex h-40 w-full items-center justify-center">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full bg-white animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          ) : members.length === 0 ? (
            <div className="w-full text-center py-20 text-moon-silver">
              <p className="text-sm tracking-widest uppercase">
                No team members found.
              </p>
            </div>
          ) : (
            <div ref={emblaRef} className="w-full overflow-hidden">
              <div className="flex gap-6 sm:gap-8 lg:gap-10 cursor-grab active:cursor-grabbing touch-pan-y py-4">
                {[...members].reverse().map((member) => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    onClick={setSelectedMember}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedMember && (
        <TeamMemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </section>
  );
};
