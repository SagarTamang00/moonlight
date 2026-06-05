import React, { useRef, useState } from "react";
import News from "../News/News";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useSocialLinks from "../../hooks/useSocialLinks";
import useSettings from "../../hooks/useSettings";
import { Earth3D } from "./Earth3D";

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

export const Footer = () => {
  const footerRef = useRef(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
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

  const { links } = useSocialLinks();
  const { settings } = useSettings();

  useGSAP(
    () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "#080808",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20 flex flex-col gap-12">
        {/* ── Top: Logo + Contact ── */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
          {/* Logo block */}
          <div className="ft-logo" style={{ opacity: 0 }}>
            <p
              className="
                    text-[10px]
                    tracking-[0.4em]
                    text-white
                    uppercase
                    mb-3
                  "
              style={{
                textShadow: `
                      0 0 4px rgba(255,255,255,0.55),
                      0 0 8px rgba(255,255,255,0.4),
                      0 0 14px rgba(255,255,255,0.25)
                    `,
              }}
            >
              Est. 2025 —{" "}
              {settings?.contact_email
                ? settings.contact_email
                : "Kathmandu Nepal"}
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

          {/* Contact + Map block */}
          <div
            className="ft-logo flex flex-col lg:items-end gap-4"
            style={{ opacity: 0 }}
          >
            {settings?.contact_phone && (
              <a
                href={`tel:${settings.contact_phone}`}
                className="
                    text-[11px]
                    tracking-[0.2em]
                    text-white
                    transition-all
                    duration-300
                  "
                style={{
                  textShadow: `
                      0 0 4px rgba(255,255,255,0.6),
                      0 0 8px rgba(255,255,255,0.5),
                      0 0 14px rgba(255,255,255,0.35)
                    `,
                }}
              >
                <p>Contact:</p>
                {settings.contact_phone}
              </a>
            )}
            {/* Map */}
            <div className="w-full lg:w-96">
              <p
                className="
      text-[15px]
      tracking-[0.2em]
      text-white
      transition-all
      duration-300
    "
                style={{
                  textShadow: `
        0 0 4px rgba(255,255,255,0.6),
        0 0 8px rgba(255,255,255,0.5),
        0 0 14px rgba(255,255,255,0.35)
      `,
                }}
              >
                LOCATION:
              </p>

              <div className="relative w-full h-[150px]">
                <Earth3D locationText={settings?.google_maps_link} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          className="ft-fade w-full h-px"
          style={{ background: "rgba(255,255,255,0.08)", opacity: 0 }}
        />

        {/* ── Bottom row ── */}
        <div
          className="ft-fade flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          style={{ opacity: 0 }}
        >
          {/* Copyright */}
          <p
            className="
                    text-[11px]
                    tracking-[0.2em]
                    text-white
                    uppercase
                  "
            style={{
              textShadow: `
                      0 0 4px rgba(255,255,255,0.5),
                      0 0 8px rgba(255,255,255,0.35),
                      0 0 14px rgba(255,255,255,0.2)
                    `,
            }}
          >
            © {new Date().getFullYear()} Moonlight Motion Pictures
          </p>

          {/* News & Blog Button */}
          <a
            href="/news"
            className="group relative overflow-hidden rounded-full border border-white/15 bg-white/[0.03] px-6 py-3
                  shadow-[rgba(0,0,0,0.35)_0px_20px_40px,rgba(0,0,0,0.25)_0px_15px_15px,0_0_60px_rgba(255,255,255,0.22),0_0_120px_rgba(255,255,255,0.10)]
                  hover:shadow-[rgba(0,0,0,0.4)_0px_24px_48px,rgba(0,0,0,0.3)_0px_18px_18px,0_0_90px_rgba(255,255,255,0.35),0_0_160px_rgba(255,255,255,0.18)]
                  transition-all duration-500 hover:border-white/30 hover:bg-white hover:text-black"
          >
            <span className="relative z-10 flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase text-white group-hover:text-black transition-colors duration-300">
              News & Blog
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </span>
          </a>
          {/* Socials */}
          <div className="flex items-center gap-6">
            {links && links.length > 0
              ? links.map((s) => {
                  const Icon = iconMap[s.platform?.toLowerCase()];

                  return (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.platform}
                      className="
              text-white/60
              hover:text-white
              transition-all
              duration-300
              hover:scale-110
            "
                    >
                      {Icon ? <Icon size={32} /> : s.platform}
                    </a>
                  );
                })
              : SOCIALS.map((s) => {
                  const Icon = iconMap[s.toLowerCase()];

                  return (
                    <a
                      key={s}
                      href="#"
                      className="
              text-white/60
              hover:text-white
              transition-all
              duration-300
              hover:scale-110
            "
                    >
                      {Icon ? <Icon size={32} /> : s}
                    </a>
                  );
                })}
          </div>
        </div>
      </div>
      {/* Bottom Copyright Bar */}
      <div
        className="w-full border-t border-white/10"
        style={{ background: "#080808" }}
      >
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-4 flex items-center justify-center">
          <a
            href="https://yashastech.com.np"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] tracking-[0.25em] text-white/50 hover:text-white uppercase transition-colors duration-200"
          >
            yashastech.com.np ↗
          </a>
        </div>
      </div>
    </footer>
  );
};
