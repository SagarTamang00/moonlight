import React, { useRef, useState } from 'react'
import News from "../News/News"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import useSocialLinks from '../../hooks/useSocialLinks'
import useSettings from '../../hooks/useSettings'
gsap.registerPlugin(ScrollTrigger)

const SOCIALS = ['IG', 'X', 'YT', 'VIMEO']

// ← THIS was missing — converts any Google Maps URL to embeddable format
const getEmbedUrl = (url) => {
  if (!url) return null;
  if (url.includes('<iframe')) {
    const match = url.match(/src="([^"]+)"/);
    if (match) return match[1];
  }
  if (url.includes('/maps/embed')) return url;
  if (url.includes('google.com/maps/place/')) {
    const placeName = url.split('/place/')[1].split('/')[0];
    return `https://maps.google.com/maps?q=${placeName}&output=embed`;
  }
  return `https://maps.google.com/maps?q=${encodeURIComponent(url)}&output=embed`;
}

export const Footer = () => {
  const footerRef = useRef(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const { links } = useSocialLinks()
  const { settings } = useSettings()

  useGSAP(() => {
    gsap.fromTo('.ft-logo', { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 1.3, ease: 'power4.out',
      scrollTrigger: { trigger: footerRef.current, start: 'top 88%' }
    })
    gsap.fromTo('.ft-fade', { opacity: 0, y: 16 }, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.07,
      scrollTrigger: { trigger: '.ft-fade', start: 'top 92%' }
    })
  }, { scope: footerRef })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden"
      style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Film strip top */}
      <div className="w-full flex overflow-hidden" style={{ height: '2px' }}>
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="shrink-0" style={{
            width: i % 5 === 4 ? '14px' : '5px',
            height: '2px',
            background: i % 5 === 4 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.05)',
          }} />
        ))}
      </div>

      <div className="w-full max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20 flex flex-col gap-12">

        {/* ── Top: Logo + Contact ── */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">

          {/* Logo block */}
          <div className="ft-logo" style={{ opacity: 0 }}>
            <p className="text-[10px] tracking-[0.4em] text-white/50 uppercase mb-3">
              Est. 2025 — {settings?.contact_email ? settings.contact_email : 'Kathmandu Nepal'}
            </p>
            <h2
              className="font-cinematic text-white leading-none"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', letterSpacing: '-0.02em' }}
            >
              MOONLIGHT
            </h2>
            <h2
              className="font-cinematic leading-none"
              style={{
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                letterSpacing: '-0.02em',
                color: 'rgba(255,255,255,0.28)',
              }}
            >
              MOTION PICTURES
            </h2>
          </div>

          {/* Contact + Map block */}
          <div className="ft-logo flex flex-col lg:items-end gap-4" style={{ opacity: 0 }}>

            {settings?.contact_phone && (
              <a href={`tel:${settings.contact_phone}`} className="text-[11px] tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-200">
                <p>Contact:</p>{settings.contact_phone}
              </a>
            )}

            {/* Map */}
            {settings?.google_maps_link && (
              <div className="w-full lg:w-72">
                <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-2">Find Us</p>
                <div
                  className="relative w-full overflow-hidden rounded-lg"
                  style={{ height: '180px', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <iframe
                    src={getEmbedUrl(settings.google_maps_link)}
                    width="100%"
                    height="100%"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />


                  <a href={settings.google_maps_link}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-2 right-2 text-[9px] tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors duration-200 bg-black/60 px-2 py-1 rounded"
                  >
                    Open Map ↗
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ── Divider ── */}
        <div className="ft-fade w-full h-px" style={{ background: 'rgba(255,255,255,0.08)', opacity: 0 }} />

        {/* ── Bottom row ── */}
        <div className="ft-fade flex flex-col sm:flex-row sm:items-center justify-between gap-6" style={{ opacity: 0 }}>

          {/* Copyright */}
          <p className="text-[11px] tracking-[0.2em] text-white/50 uppercase">
            © {new Date().getFullYear()} Moonlight Motion Pictures
          </p>

          {/* News & Blog Button */}
          <a
            href="/news"
            className="group relative overflow-hidden rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 transition-all duration-500 hover:border-white/30 hover:bg-white hover:text-black"
          >
            <span className="relative z-10 flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase text-white group-hover:text-black transition-colors duration-300">
              News & Blog
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </span>

            {/* Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-white/20 via-white/5 to-white/20" />
          </a>
          {/* Socials */}
          <div className="flex items-center gap-5">
            {links && links.length > 0 ? (
              links.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] tracking-[0.2em] text-white/50 hover:text-white uppercase transition-colors duration-200"
                >
                  {s.platform}
                </a>
              ))
            ) : (
              SOCIALS.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-[11px] tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-200"
                >
                  {s}
                </a>
              ))
            )}
          </div >

        </div >
      </div >

      {/* Film strip bottom */}
      < div className="w-full flex overflow-hidden" style={{ height: '2px' }}>
        {
          Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="shrink-0" style={{
              width: i % 5 === 4 ? '14px' : '5px',
              height: '2px',
              background: i % 5 === 4 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.05)',
            }} />
          ))
        }
      </div >
    </footer >
  )
}