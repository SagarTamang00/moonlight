import { useRef, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useTeamMembers from "../../hooks/useTeamMembers";
import useTeamMemberLinks from "../../hooks/useTeamMemberLinks";
import { BASE_URL } from "../../utils/api";

gsap.registerPlugin(ScrollTrigger);

// ───────────────────────── ICONS ─────────────────────────
const getIcon = (platform) => {
  const p = platform.toLowerCase();

  if (p.includes("instagram") || p.includes("ig"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
      </svg>
    );

  if (p.includes("x") || p.includes("twitter"))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
      </svg>
    );

  return (
    <span className="text-[10px] font-bold tracking-widest">
      {platform.substring(0, 2).toUpperCase()}
    </span>
  );
};

// ───────────────────────── CARD ─────────────────────────
const TeamMemberCard = ({ member, onClick }) => (
  <div
    onClick={() => onClick(member)}
    className="flex-shrink-0 w-[75vw] sm:w-[45vw] lg:w-[28vw] xl:w-[24vw] group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
  >
    {member.image && (
      <img
        src={`${BASE_URL}${member.image}`}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
      />
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
    <div className="absolute bottom-0 p-6 text-white">{member.name}</div>
  </div>
);

// ───────────────────────── MODAL ─────────────────────────
const TeamMemberModal = ({ member, onClose }) => {
  const { links, loading } = useTeamMemberLinks(member.id);

  useEffect(() => {
    const scrollY = window.scrollY;

    // ✅ lock scroll properly
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!member) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* ✅ WIDER + MORE CINEMATIC */}
      <div className="relative w-full max-w-7xl bg-[#0a0a0a] rounded-3xl overflow-hidden flex flex-col md:flex-row max-h-[88vh] shadow-2xl">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-white bg-black/50 px-3 py-1 rounded-full"
        >
          ✕
        </button>

        {/* IMAGE (BIGGER WIDTH) */}
        <div className="w-full md:w-[55%] h-[45vh] md:h-[88vh] relative">
          <img
            src={`${BASE_URL}${member.image}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80" />
        </div>

        {/* CONTENT */}
        <div className="w-full md:w-[45%] p-10 lg:p-14 overflow-y-auto flex flex-col justify-center">
          <h2 className="text-3xl text-white mb-6">{member.name}</h2>

          <p className="text-white/60 mb-10 whitespace-pre-wrap">
            {member.description}
          </p>

          {loading ? (
            <p className="text-white/40 text-xs">Loading...</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {links?.map((l) => (
                <a
                  key={l.id}
                  href={l.url}
                  target="_blank"
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-2"
                >
                  {getIcon(l.platform)}
                  <span className="text-[10px] uppercase text-white">
                    {l.platform}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ───────────────────────── MAIN ─────────────────────────
export const Team = () => {
  const sectionRef = useRef(null);
  const { members, loading } = useTeamMembers();
  const [selectedMember, setSelectedMember] = useState(null);

  const [emblaRef] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    containScroll: "trimSnaps",
  });

  // ✅ FIRST IN → FIRST SHOWN
  const sortedMembers = [...members].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at),
  );

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => {
          gsap.to(".team-title", { opacity: 1, y: 0, duration: 1 });
          gsap.to(".team-carousel", { opacity: 1, y: 0, duration: 1 });
        },
      });
    },
    { scope: sectionRef, dependencies: [members.length, loading] },
  );

  return (
    <section ref={sectionRef} className="relative h-[100dvh] flex items-center">
      <div className="w-full max-w-6xl mx-auto px-6">
        <h2 className="team-title opacity-0 text-5xl text-white mb-10">
          MEET THE CREATORS
        </h2>

        <div className="team-carousel opacity-0">
          {loading ? (
            <p className="text-white/40">Loading...</p>
          ) : (
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex gap-6">
                {sortedMembers.map((m) => (
                  <TeamMemberCard
                    key={m.id}
                    member={m}
                    onClick={setSelectedMember}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedMember && (
        <TeamMemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </section>
  );
};
