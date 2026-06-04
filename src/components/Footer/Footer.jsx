import React, { useRef, useState } from "react";
import News from "../News/News";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useSocialLinks from "../../hooks/useSocialLinks";
import useSettings from "../../hooks/useSettings";

// react-icons
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaVimeo,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = ["IG", "X", "YT", "VIMEO"];

const iconMap = {
  ig: FaInstagram,
  instagram: FaInstagram,
  x: FaTwitter,
  twitter: FaTwitter,
  yt: FaYoutube,
  youtube: FaYoutube,
  vimeo: FaVimeo,
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  github: FaGithub,
};

// Google Maps helper
const getEmbedUrl = (url) => {
  if (!url) return null;

  if (url.includes("<iframe")) {
    const match = url.match(/src="([^"]+)"/);
    if (match) return match[1];
  }

  if (url.includes("/maps/embed")) return url;

  if (url.includes("google.com/maps/place/")) {
    const placeName = url.split("/place/")[1].split("/")[0];
    return `https://maps.google.com/maps?q=${placeName}&output=embed`;
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(url)}&output=embed`;
};

export const Footer = () => {
  const footerRef = useRef(null);

  const { links } = useSocialLinks();
  const { settings } = useSettings();

  useGSAP(
    () => {
      // logo animation
      gsap.fromTo(
        ".ft-logo",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 88%" },
        },
      );

      // fade animation
      gsap.fromTo(
        ".ft-fade",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: ".ft-fade", start: "top 92%" },
        },
      );
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "#080808",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <style>{`
            @keyframes mapPinBounce {
              0%, 100% {
                transform: translate(-50%, -100%) translateY(0);
              }
              50% {
                transform: translate(-50%, -100%) translateY(-12px);
              }
            }
            @keyframes pinShadowScale {
              0%, 100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
              }
              50% {
                transform: translate(-50%, -50%) scale(0.65);
                opacity: 0.35;
              }
            }
            .animate-map-pin {
              animation: mapPinBounce 1.2s ease-in-out infinite;
            }
            .animate-pin-shadow {
              animation: pinShadowScale 1.2s ease-in-out infinite;
            }
          `}</style>

      <div className="w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20 flex flex-col gap-12">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
          {/* LOGO */}
          <div className="ft-logo" style={{ opacity: 0 }}>
            <p className="text-[10px] tracking-[0.4em] text-white uppercase mb-3">
              Est. 2025 — {settings?.contact_email || "Kathmandu Nepal"}
            </p>

            <h2
              className="font-cinematic text-white leading-none"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              MOONLIGHT
            </h2>

            <h2
              className="font-cinematic leading-none"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                letterSpacing: "-0.02em",
                color: "rgba(255,255,255,0.28)",
              }}
            >
              MOTION PICTURES
            </h2>
          </div>

          {/* CONTACT + MAP */}
          <div
            className="ft-logo flex flex-col lg:items-end gap-4"
            style={{ opacity: 0 }}
          >
            {settings?.contact_phone && (
              <a
                href={`tel:${settings.contact_phone}`}
                className="text-[11px] tracking-[0.2em] text-white"
              >
                Contact: {settings.contact_phone}
              </a>
            )}

            {/* MAP */}
            {/* MAP */}
            {settings?.google_maps_link && (
              <div className="w-full lg:w-72">
                <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-2">
                  Find Us
                </p>

                <div
                  className="relative w-full overflow-hidden rounded-xl"
                  style={{
                    height: "200px",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <iframe
                    src={getEmbedUrl(settings.google_maps_link)}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    title="Company Location"
                    className="transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  {/* Ground container (stays in place, holds shadow & ripple) */}
                  <div className="absolute left-1/2 top-1/2 z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2 w-0 h-0">
                    {/* Ripple (grounded) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-10 h-10 rounded-full bg-red-500/20 animate-ping" />
                    </div>

                    {/* Shadow (grounded, but scales/fades in place) */}
                    <div
                      className="pin-shadow absolute left-1/2 top-1/2 animate-pin-shadow"
                      style={{
                        width: "20px",
                        height: "7px",
                        background: "rgba(0,0,0,0.4)",
                        borderRadius: "999px",
                        filter: "blur(4px)",
                      }}
                    />

                    {/* Bouncing Pin (translates up and down relative to center) */}
                    <div className="absolute left-1/2 top-1/2 animate-map-pin">
                      {/* Marker SVG */}
                      <svg
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="drop-shadow-xl"
                      >
                        <defs>
                          <linearGradient
                            id="pinGradient"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="1"
                          >
                            <stop offset="0%" stopColor="#ff5a5a" />
                            <stop offset="100%" stopColor="#dc2626" />
                          </linearGradient>
                        </defs>

                        <path
                          d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
                          fill="url(#pinGradient)"
                        />

                        <circle cx="12" cy="9" r="3.5" fill="white" />

                        <circle cx="12" cy="9" r="1.6" fill="#dc2626" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DIVIDER */}
        <div
          className="ft-fade w-full h-px"
          style={{ background: "rgba(255,255,255,0.08)", opacity: 0 }}
        />

        {/* BOTTOM */}
        <div
          className="ft-fade flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          style={{ opacity: 0 }}
        >
          <p className="text-[11px] tracking-[0.2em] text-white uppercase">
            © {new Date().getFullYear()} Moonlight Motion Pictures
          </p>

          {/* NEWS */}
          <a
            href="/news"
            className="px-6 py-3 border border-white/15 rounded-full text-[11px] tracking-[0.28em] uppercase text-white hover:bg-white hover:text-black transition-all duration-500"
          >
            News & Blog ↗
          </a>

          {/* SOCIALS */}
          <div className="flex items-center gap-5">
            {links && links.length > 0
              ? links.map((s) => {
                  const Icon = iconMap[s.platform?.toLowerCase()];

                  return (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/60 hover:text-white transition"
                    >
                      {Icon ? <Icon size={18} /> : s.platform}
                    </a>
                  );
                })
              : SOCIALS.map((s) => {
                  const Icon = iconMap[s.toLowerCase()];

                  return (
                    <a
                      key={s}
                      href="#"
                      className="text-white/60 hover:text-white transition"
                    >
                      {Icon ? <Icon size={18} /> : s}
                    </a>
                  );
                })}
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        className="w-full border-t border-white/10"
        style={{ background: "#080808" }}
      >
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-4 flex justify-center">
          <a
            href="https://yashastech.com.np"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] tracking-[0.25em] text-white/50 hover:text-white uppercase"
          >
            yashastech.com.np ↗
          </a>
        </div>
      </div>
    </footer>
  );
};
